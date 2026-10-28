import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bell, Menu, X, LayoutDashboard, Package, Truck, Search, MapPinned, Handshake, ShieldCheck, Settings, ChevronDown } from "lucide-react";
import { Brand } from "./ui";

const appLinks = [
  ["/dashboard", "Command center", LayoutDashboard],
  ["/shipper", "Shipper workspace", Package],
  ["/transporter", "Transporter hub", Truck],
  ["/loads", "Load marketplace", Search],
  ["/negotiations", "Negotiations", Handshake],
  ["/trucks", "Truck directory", Truck],
  ["/tracking", "Shipment tracking", MapPinned],
  ["/profile", "Verification", ShieldCheck],
  ["/settings", "Settings", Settings],
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isApp = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/about";
  if (!isApp) return <>
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#07111f]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Brand/>
        <nav className="hidden items-center gap-7 md:flex"><Link className="nav-link" to="/#platform">Platform</Link><Link className="nav-link" to="/loads">Find loads</Link><Link className="nav-link" to="/trucks">Find trucks</Link><Link className="nav-link" to="/#how-it-works">How it works</Link><Link className="nav-link" to="/about">About</Link></nav>
        <div className="hidden items-center gap-3 sm:flex"><Link to="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-400 hover:text-white">Log in</Link><Link to="/dashboard" className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-400">Open workspace ↗</Link></div>
        <button className="rounded-lg p-2 text-slate-300 sm:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
      {mobileOpen && <div className="space-y-1 border-t border-slate-800 p-4 sm:hidden">{[["/loads","Find loads"],["/trucks","Find trucks"],["/login","Log in"],["/dashboard","Open workspace"]].map(([to,t])=><Link key={to} to={to} onClick={()=>setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">{t}</Link>)}</div>}
    </header>
    {children}
    <footer className="border-t border-slate-800/80 bg-[#081321] px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><Brand/><p className="mt-3 max-w-sm text-xs leading-5 text-slate-500">A direct freight network built to connect businesses and transporters with greater transparency.</p></div><div className="flex flex-wrap gap-5 text-xs text-slate-500"><Link to="/loads">Marketplace</Link><Link to="/negotiations">Negotiations</Link><Link to="/tracking">Tracking</Link><Link to="/profile">Verification</Link></div><p className="text-xs text-slate-600">© 2026 Cargology · Prototype</p></div></footer>
  </>;

  const title = appLinks.find(([to]) => to === location.pathname)?.[1] || "Workspace";
  const isMarketplace = location.pathname === "/loads" || location.pathname === "/trucks";
  return <div className="min-h-screen bg-[#07111f] text-slate-100">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800/80 bg-[#091523] p-5 lg:flex">
      <Brand/>
      <div className="mt-10 text-[10px] font-bold uppercase tracking-[.2em] text-slate-600">Workspace</div>
      <nav className="mt-3 space-y-1">{appLinks.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive?"bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/20":"text-slate-400 hover:bg-slate-800/70 hover:text-white"}`}><Icon size={17}/>{label}</NavLink>)}</nav>
      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-4"><div className="text-sm font-semibold">Need a hand?</div><p className="mt-2 text-xs leading-5 text-slate-500">Support for bookings, quotes, and shipment questions.</p><a className="mt-3 inline-block text-xs font-bold text-orange-400" href="mailto:support@cargology.example">Contact support ↗</a></div>
    </aside>
    <div className="min-w-0 lg:pl-64">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-800/80 bg-[#07111f]/95 px-4 backdrop-blur-xl sm:px-7">
        <div className="flex items-center gap-3"><button onClick={()=>setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden" aria-label="Open sidebar"><Menu size={20}/></button><span className="text-sm text-slate-500">Cargology <span className="mx-2 text-slate-700">/</span><span className="text-slate-200">{title}</span></span></div>
        <div className="flex items-center gap-3"><button aria-label="Notifications" className="relative rounded-xl border border-slate-800 p-2.5 text-slate-400 hover:text-white"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500"/></button><div className="flex items-center gap-2 border-l border-slate-800 pl-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500/15 text-sm font-black text-orange-300">RK</div><div className="hidden sm:block"><div className="text-xs font-semibold text-white">Rahul Kumar</div><div className="text-[10px] text-slate-500">Demo account</div></div><ChevronDown size={14} className="hidden text-slate-500 sm:block"/></div></div>
      </header>
      {mobileOpen && <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={()=>setMobileOpen(false)}><aside className="h-full w-72 overflow-y-auto border-r border-slate-800 bg-[#091523] p-5" onClick={e=>e.stopPropagation()}><div className="flex items-center justify-between"><Brand/><button onClick={()=>setMobileOpen(false)}><X/></button></div><nav className="mt-8 space-y-1">{appLinks.map(([to,label,Icon])=><NavLink key={to} to={to} onClick={()=>setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-slate-800"><Icon size={17}/>{label}</NavLink>)}</nav></aside></div>}
      <main className={`mx-auto w-full max-w-[1500px] p-4 sm:p-7 xl:p-9 ${isMarketplace ? "marketplace-surface" : ""}`}>{children}</main>
    </div>
  </div>;
}