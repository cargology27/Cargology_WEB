import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 24) {
  console.error("Set JWT_SECRET (at least 24 characters) in backend/.env before starting.");
  process.exit(1);
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "data.json");
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map(s=>s.trim()) }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 60 }));

const initial = {
  users: [], loads: [
    {id:"CG-2084",cargo:"Packaged food",from:"Muzaffarpur, Bihar",to:"Patna, Bihar",weight:"8 tonnes",vehicle:"14 ft truck",rate:12500,date:"2026-10-25",distance:"75 km",shipper:"NorthStar Foods",status:"Open",quotes:0},
    {id:"CG-2085",cargo:"Textile rolls",from:"Delhi, Delhi",to:"Jaipur, Rajasthan",weight:"12 tonnes",vehicle:"17 ft truck",rate:22000,date:"2026-10-26",distance:"281 km",shipper:"Aarav Textiles",status:"Open",quotes:0},
    {id:"CG-2086",cargo:"Industrial supplies",from:"Hajipur, Bihar",to:"Kolkata, West Bengal",weight:"16 tonnes",vehicle:"Container truck",rate:38000,date:"2026-10-27",distance:"560 km",shipper:"Eastern Components",status:"Open",quotes:0}
  ], vehicles: [], quotes: [], shipments: [], notifications: []
};
let db;
try { db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, "utf8")) : structuredClone(initial); }
catch { console.error("data.json is invalid. Fix or remove it to reinitialize."); process.exit(1); }
function save(){ fs.writeFileSync(dbPath, JSON.stringify(db, null, 2)); }
function fail(res,status,message){ return res.status(status).json({error:message}); }
function tokenFor(user){ return jwt.sign({sub:user.id, role:user.role}, JWT_SECRET, {expiresIn:"7d"}); }
function safeUser(u){ const {passwordHash,...rest}=u; return rest; }
function auth(req,res,next){
  const token=(req.headers.authorization||"").replace(/^Bearer\s+/i,"");
  if(!token) return fail(res,401,"Sign in required.");
  try { const payload=jwt.verify(token,JWT_SECRET); const user=db.users.find(u=>u.id===payload.sub);
    if(!user) return fail(res,401,"Account not found."); req.user=user; next();
  } catch { return fail(res,401,"Session expired or invalid. Sign in again."); }
}
function role(...roles){ return (req,res,next)=>roles.includes(req.user.role)?next():fail(res,403,"Your account role cannot perform this action."); }
function required(fields){ return (req,res,next)=>{ for(const f of fields) if(req.body[f]===undefined || String(req.body[f]).trim()==="") return fail(res,400,`${f} is required.`); next(); }; }
function nextId(prefix, collection){ return `${prefix}-${String(collection.length+1).padStart(4,"0")}`; }

app.get("/api/health",(req,res)=>res.json({status:"ok",service:"Cargology API",timestamp:new Date().toISOString()}));
app.post("/api/auth/register", required(["name","email","password","role"]), async (req,res)=>{
  const {name,email,password,role:accountRole,company="",phone="",region="Bihar, India"}=req.body;
  if(!["shipper","transporter"].includes(accountRole)) return fail(res,400,"role must be shipper or transporter.");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(res,400,"Enter a valid email.");
  if(String(password).length<8) return fail(res,400,"Password must be at least 8 characters.");
  if(db.users.some(u=>u.email.toLowerCase()===email.toLowerCase())) return fail(res,409,"Email is already registered.");
  const user={id:randomUUID(),name:String(name).trim(),email:email.toLowerCase(),passwordHash:await bcrypt.hash(password,12),role:accountRole,company:String(company),phone:String(phone),region:String(region),verificationStatus:"Pending",createdAt:new Date().toISOString()};
  db.users.push(user); save(); res.status(201).json({token:tokenFor(user),user:safeUser(user)});
});
app.post("/api/auth/login", required(["email","password"]), async (req,res)=>{
  const user=db.users.find(u=>u.email.toLowerCase()===String(req.body.email).toLowerCase());
  if(!user || !(await bcrypt.compare(String(req.body.password),user.passwordHash))) return fail(res,401,"Email or password is incorrect.");
  res.json({token:tokenFor(user),user:safeUser(user)});
});
app.get("/api/auth/me",auth,(req,res)=>res.json({user:safeUser(req.user)}));
app.patch("/api/profile",auth,(req,res)=>{
  const allowed=["name","company","phone","region"];
  for(const key of allowed) if(req.body[key]!==undefined) req.user[key]=String(req.body[key]).trim();
  req.user.updatedAt=new Date().toISOString(); save(); res.json({user:safeUser(req.user)});
});

app.get("/api/dashboard",auth,(req,res)=>{
 const mine=db.loads.filter(l=>req.user.role==="transporter" ? l.status==="Open" : l.ownerId===req.user.id);
 const myQuotes=db.quotes.filter(q=>q.transporterId===req.user.id);
 const shipments=db.shipments.filter(s=>req.user.role==="shipper"?s.ownerId===req.user.id:s.transporterId===req.user.id);
 res.json({openLoads:db.loads.filter(l=>l.status==="Open").length,myLoads:mine.length,myQuotes:myQuotes.length,activeShipments:shipments.filter(s=>s.status!=="Delivered").length,shipments});
});
app.get("/api/loads",(req,res)=>{
 const {status,from,to,search}=req.query; let rows=[...db.loads];
 if(status) rows=rows.filter(l=>l.status.toLowerCase()===String(status).toLowerCase());
 if(from) rows=rows.filter(l=>l.from.toLowerCase().includes(String(from).toLowerCase()));
 if(to) rows=rows.filter(l=>l.to.toLowerCase().includes(String(to).toLowerCase()));
 if(search) rows=rows.filter(l=>[l.cargo,l.from,l.to,l.vehicle,l.shipper].some(v=>String(v||"").toLowerCase().includes(String(search).toLowerCase())));
 res.json({loads:rows.sort((a,b)=>b.createdAt?.localeCompare(a.createdAt||"")||0)});
});
app.post("/api/loads",auth,role("shipper"),required(["cargo","from","to","weight","vehicle","rate","date"]), (req,res)=>{
 const rate=Number(req.body.rate); if(!Number.isFinite(rate)||rate<=0) return fail(res,400,"rate must be a positive number.");
 const load={id:nextId("CG",db.loads),cargo:String(req.body.cargo).trim(),from:String(req.body.from).trim(),to:String(req.body.to).trim(),weight:String(req.body.weight),vehicle:String(req.body.vehicle),rate,date:String(req.body.date),distance:String(req.body.distance||"Not calculated"),shipper:req.user.company||req.user.name,ownerId:req.user.id,status:"Open",quotes:0,createdAt:new Date().toISOString()};
 db.loads.push(load); save(); res.status(201).json({load});
});
app.get("/api/loads/:id",(req,res)=>{const load=db.loads.find(l=>l.id===req.params.id); return load?res.json({load}):fail(res,404,"Load not found.");});
app.patch("/api/loads/:id",auth,(req,res)=>{
 const l=db.loads.find(x=>x.id===req.params.id); if(!l)return fail(res,404,"Load not found.");
 if(l.ownerId!==req.user.id && req.user.role!=="admin") return fail(res,403,"Only the load owner can update it.");
 for(const k of ["cargo","from","to","weight","vehicle","rate","date","distance","status"]) if(req.body[k]!==undefined) l[k]=req.body[k];
 l.updatedAt=new Date().toISOString();save();res.json({load:l});
});
app.delete("/api/loads/:id",auth,(req,res)=>{
 const i=db.loads.findIndex(l=>l.id===req.params.id); if(i<0)return fail(res,404,"Load not found.");
 if(db.loads[i].ownerId!==req.user.id)return fail(res,403,"Only the load owner can delete it.");
 if(db.quotes.some(q=>q.loadId===req.params.id))return fail(res,409,"Cannot delete a load with quotes; close it instead.");
 db.loads.splice(i,1);save();res.json({message:"Load deleted."});
});
app.get("/api/vehicles",(req,res)=>{let rows=db.vehicles;if(req.query.search)rows=rows.filter(v=>[v.name,v.type,v.capacity,v.location,v.owner].some(x=>String(x).toLowerCase().includes(String(req.query.search).toLowerCase())));res.json({vehicles:rows});});
app.post("/api/vehicles",auth,role("transporter"),required(["name","type","capacity","location"]), (req,res)=>{
 const v={id:randomUUID(),ownerId:req.user.id,owner:req.user.company||req.user.name,name:String(req.body.name),type:String(req.body.type),capacity:String(req.body.capacity),location:String(req.body.location),registration:String(req.body.registration||""),verified:false,createdAt:new Date().toISOString()};
 db.vehicles.push(v);save();res.status(201).json({vehicle:v});
});
app.get("/api/quotes",auth,(req,res)=>{let rows=[...db.quotes];if(req.query.loadId)rows=rows.filter(q=>q.loadId===req.query.loadId);if(req.user)rows=rows.filter(q=>q.transporterId===req.user.id||db.loads.find(l=>l.id===q.loadId)?.ownerId===req.user.id);res.json({quotes:rows});});
app.post("/api/loads/:id/quotes",auth,role("transporter"),required(["price","vehicle","eta"]), (req,res)=>{
 const load=db.loads.find(l=>l.id===req.params.id);if(!load)return fail(res,404,"Load not found.");if(load.status!=="Open")return fail(res,409,"This load is no longer open.");
 const price=Number(req.body.price);if(!Number.isFinite(price)||price<=0)return fail(res,400,"price must be a positive number.");
 if(db.quotes.some(q=>q.loadId===load.id&&q.transporterId===req.user.id))return fail(res,409,"You have already quoted this load.");
 const q={id:nextId("QT",db.quotes),loadId:load.id,transporterId:req.user.id,transporter:req.user.company||req.user.name,vehicle:String(req.body.vehicle),price,eta:String(req.body.eta),note:String(req.body.note||""),status:"Pending",verified:req.user.verificationStatus==="Verified",createdAt:new Date().toISOString()};
 db.quotes.push(q);load.quotes=(load.quotes||0)+1;save();res.status(201).json({quote:q});
});
app.patch("/api/quotes/:id",(req,res,next)=>{auth(req,res,()=>{const q=db.quotes.find(x=>x.id===req.params.id);if(!q)return fail(res,404,"Quote not found.");const load=db.loads.find(l=>l.id===q.loadId);if(load?.ownerId!==req.user.id)return fail(res,403,"Only the shipper who posted this load can review quotes.");next();});},(req,res)=>{
 const q=db.quotes.find(x=>x.id===req.params.id);if(!["Accepted","Rejected","Pending"].includes(req.body.status))return fail(res,400,"status must be Accepted, Rejected, or Pending.");
 if(req.body.status==="Accepted"){
   const l=db.loads.find(x=>x.id===q.loadId);if(l.status!=="Open")return fail(res,409,"Load already booked.");
   l.status="Booked"; for(const other of db.quotes.filter(x=>x.loadId===l.id))if(other.id!==q.id)other.status="Rejected";
   q.status="Accepted";
   const shipment={id:nextId("SH",db.shipments),loadId:l.id,ownerId:l.ownerId,transporterId:q.transporterId,cargo:l.cargo,from:l.from,to:l.to,route:`${l.from.split(",")[0]} → ${l.to.split(",")[0]}`,transporter:q.transporter,progress:10,status:"Booking confirmed",eta:q.eta,createdAt:new Date().toISOString(),milestones:[{name:"Booking confirmed",at:new Date().toISOString()}]};
   db.shipments.push(shipment);
 }else q.status=req.body.status;
 save();res.json({quote:q,shipment:db.shipments.find(s=>s.loadId===q.loadId)});
});
app.get("/api/shipments",auth,(req,res)=>{const rows=db.shipments.filter(s=>req.user.role==="admin"||s.ownerId===req.user.id||s.transporterId===req.user.id);res.json({shipments:rows});});
app.get("/api/shipments/:id",auth,(req,res)=>{const s=db.shipments.find(x=>x.id===req.params.id&&(req.user.role==="admin"||x.ownerId===req.user.id||x.transporterId===req.user.id));return s?res.json({shipment:s}):fail(res,404,"Shipment not found.");});
app.patch("/api/shipments/:id/status",auth,required(["status"]),(req,res)=>{
 const s=db.shipments.find(x=>x.id===req.params.id);if(!s)return fail(res,404,"Shipment not found.");
 if(req.user.id!==s.transporterId&&req.user.id!==s.ownerId&&req.user.role!=="admin")return fail(res,403,"Not authorized.");
 const allowed=["Booking confirmed","Vehicle assigned","Cargo picked up","In transit","Delivered","Delayed"];
 if(!allowed.includes(req.body.status))return fail(res,400,"Unsupported shipment status.");
 const progress={"Booking confirmed":10,"Vehicle assigned":25,"Cargo picked up":45,"In transit":70,"Delayed":70,"Delivered":100};
 s.status=req.body.status;s.progress=progress[s.status];s.updatedAt=new Date().toISOString();s.milestones.push({name:s.status,at:s.updatedAt,note:String(req.body.note||"")});save();res.json({shipment:s});
});
app.get("/api/notifications",auth,(req,res)=>res.json({notifications:db.notifications.filter(n=>n.userId===req.user.id)}));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:"Unexpected server error."});});
app.use((req,res)=>fail(res,404,"API route not found."));
app.listen(PORT,()=>console.log(`Cargology API running at http://localhost:${PORT}`));
