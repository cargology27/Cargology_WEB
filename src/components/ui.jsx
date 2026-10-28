import { Link } from "react-router-dom";
import { ArrowRight, Check, Circle } from "lucide-react";

export function Brand({ compact = false }) {
  return <Link to="/" className="flex items-center gap-2.5">
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-950/30">
      <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v11H3z"/><path d="M14 11h4l3 3v4h-7z"/><circle cx="7.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/></svg>
    </span>
    {!compact && <span className="text-lg font-black tracking-[.12em] text-white">CARGO<span className="text-orange-400">LOGY</span><span className="mt-0.5 block text-[9px] font-medium tracking-[.24em] text-slate-500">MOVE CARGO SMARTER</span></span>}
  </Link>;
}
export function Button({ children, to, onClick, variant = "primary", className = "", type = "button" }) {
  const styles = variant === "primary" ? "bg-orange-500 text-white hover:bg-orange-400" : variant === "outline" ? "border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-orange-500/60 hover:text-white" : variant === "ghost" ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "bg-slate-800 text-slate-100 hover:bg-slate-700";
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:opacity-50 ${styles} ${className}`;
  return to ? <Link to={to} className={cls}>{children}</Link> : <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
export function Eyebrow({ children }) { return <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.19em] text-orange-400"><span className="h-px w-6 bg-orange-500"/>{children}</div>; }
export function PageTitle({ eyebrow, title, description, action }) {
  return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>}</div>{action}</div>;
}
export function Status({ children }) {
  const good = ["Delivered", "Verified", "Open", "Completed", "Accepted"].includes(children);
  const moving = ["In transit", "Picked up", "Negotiating"].includes(children);
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${good ? "bg-emerald-500/10 text-emerald-400" : moving ? "bg-orange-500/10 text-orange-300" : "bg-slate-700/70 text-slate-300"}`}><Circle size={6} fill="currentColor"/>{children}</span>;
}
export function Stat({ label, value, delta, icon: Icon, accent = false }) {
  return <div className="rounded-2xl border border-slate-800 bg-[#0c1929] p-5"><div className="flex items-start justify-between"><span className="text-xs font-medium text-slate-500">{label}</span><span className={`rounded-xl p-2.5 ${accent ? "bg-orange-500/10 text-orange-400" : "bg-slate-800 text-slate-300"}`}><Icon size={18}/></span></div><div className="mt-4 flex items-end justify-between gap-2"><div className="text-2xl font-black text-white">{value}</div>{delta && <div className="text-[11px] font-semibold text-emerald-400">{delta}</div>}</div></div>;
}
export function Panel({ title, subtitle, action, children, className = "" }) {
  return <section className={`rounded-2xl border border-slate-800 bg-[#0c1929] ${className}`}><div className="flex items-center justify-between gap-3 border-b border-slate-800/80 px-5 py-4"><div><h2 className="text-sm font-bold text-white">{title}</h2>{subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}</div>{action}</div><div className="p-5">{children}</div></section>;
}
export function Empty({ title, text }) {
  return <div className="rounded-2xl border border-dashed border-slate-700 bg-[#0c1929]/60 px-5 py-14 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-800 text-slate-400"><Circle size={20}/></div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm text-slate-500">{text}</p></div>;
}
export function LoadCard({ load, onQuote }) {
  return <article className="rounded-2xl border border-slate-800 bg-[#0c1929] p-5 transition hover:border-slate-700">
    <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/10 text-orange-400"><span className="text-lg">↗</span></div><div><div className="font-bold text-white">{load.cargo}</div><div className="mt-1 text-[11px] text-slate-500">{load.id} · {load.shipper}</div></div></div><Status>{load.status}</Status></div>
    <div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2"><div><div className="text-[10px] uppercase tracking-wider text-slate-500">Pickup</div><div className="mt-1 text-sm font-semibold">{load.from}</div></div><ArrowRight size={17} className="text-orange-400"/><div className="text-right"><div className="text-[10px] uppercase tracking-wider text-slate-500">Delivery</div><div className="mt-1 text-sm font-semibold">{load.to}</div></div></div>
    <div className="grid grid-cols-3 gap-2 border-y border-slate-800 py-4"><div><div className="text-[10px] text-slate-500">Weight</div><div className="mt-1 text-xs font-semibold">{load.weight}</div></div><div><div className="text-[10px] text-slate-500">Vehicle</div><div className="mt-1 text-xs font-semibold">{load.vehicle}</div></div><div><div className="text-[10px] text-slate-500">Pickup date</div><div className="mt-1 text-xs font-semibold">{load.date}</div></div></div>
    <div className="mt-4 flex items-center justify-between gap-3"><div><div className="text-[10px] text-slate-500">Target freight</div><div className="mt-0.5 text-lg font-black text-white">₹{load.rate.toLocaleString("en-IN")}</div><div className="text-[10px] text-slate-500">{load.quotes} quotes</div></div><Button onClick={() => onQuote?.(load)}>Compare quotes <ArrowRight size={14}/></Button></div>
  </article>;
}
