import { ArrowRight, GraduationCap, Mail, Phone, Target, Truck, Users, ShieldCheck, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const linkedinUrl = "https://www.linkedin.com/in/rahul-kumar-78414324a";

function InfoCard({ icon: Icon, title, children, className = "" }) {
  return <section className={`rounded-2xl border border-sky-900/80 bg-[#061a2c]/90 p-5 sm:p-6 ${className}`}>
    <div className="flex items-start gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-orange-500 text-orange-500"><Icon size={24} /></div>
      <div className="min-w-0 flex-1"><h3 className="text-lg font-bold text-white">{title}</h3><div className="mt-2 text-sm leading-6 text-slate-300">{children}</div></div>
    </div>
  </section>;
}

export default function About() {
  return <div className="relative -m-4 overflow-hidden bg-[#031629] sm:-m-7 xl:-m-9">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_8%,rgba(249,115,22,.18),transparent_34%),radial-gradient(ellipse_at_20%_55%,rgba(8,67,105,.28),transparent_48%),linear-gradient(180deg,#06182b_0%,#031629_62%,#021323_100%)]" />
    <div className="relative">
      <div className="border-b border-sky-950/80 px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm text-slate-300"><Link to="/" className="hover:text-orange-400">Home</Link><span className="mx-3">›</span><span>About</span></div>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">About <span className="text-orange-500">Me</span></h1>
          <p className="mt-3 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">A little about who I am, what I do, and my vision for Cargology.</p>
        </div>
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12 lg:py-10">
        <aside className="h-fit rounded-2xl border border-sky-900 bg-[#03182b]/90 px-6 py-8 text-center sm:px-8 sm:py-9">
          <img src="/assets/rahul-profile.png" alt="Rahul Kumar profile" className="mx-auto h-44 w-44 rounded-full border-[5px] border-orange-500 object-cover shadow-lg shadow-orange-950/30" />
          <h2 className="mt-4 text-3xl font-black text-white">Rahul Kumar</h2>
          <div className="mx-auto mt-5 h-1 w-16 bg-orange-500" />
          <div className="mt-7 flex justify-center gap-4">
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Rahul Kumar on LinkedIn" title="Open LinkedIn profile" className="grid h-12 w-12 place-items-center rounded-full border border-slate-500 text-slate-100 transition hover:border-orange-500 hover:text-orange-400"><Linkedin size={22} /></a>
            <a href="mailto:cargology27@gmail.com" aria-label="Email Rahul Kumar" title="Email Rahul Kumar" className="grid h-12 w-12 place-items-center rounded-full border border-slate-500 text-slate-100 transition hover:border-orange-500 hover:text-orange-400"><Mail size={22} /></a>
          </div>
          <p className="mx-auto mt-8 max-w-xs text-base italic leading-7 text-slate-200">“Building digital solutions for a smarter and stronger logistics future.”</p>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300">View LinkedIn profile <ArrowRight size={15} /></a>
        </aside>
        <div>
          <h2 className="text-3xl font-black text-white sm:text-4xl">About <span className="text-orange-500">Rahul Kumar</span></h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">Hi, I’m Rahul Kumar, a passionate and dedicated individual with a strong interest in business, finance, and technology. I created Cargology to solve real-world logistics problems and make the transportation process easier, faster, and more transparent for everyone.</p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-200">I enjoy building useful digital products, learning new technologies, and exploring how business and technology can work together to create impactful solutions.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard icon={GraduationCap} title="Education"><p className="font-semibold text-white">BBA (Finance)</p><p className="mt-1">Focused on business management, finance and strategic decision making.</p></InfoCard>
            <InfoCard icon={Phone} title="Contact Details"><p><span className="font-semibold text-white">Phone:</span> <a className="hover:text-orange-400" href="tel:7654820793">+91 7654820793</a></p><p><span className="font-semibold text-white">Email:</span> <a className="break-all hover:text-orange-400" href="mailto:cargology27@gmail.com">cargology27@gmail.com</a></p><div className="mt-4 flex flex-wrap gap-2"><a href="tel:7654820793" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-[#07111f] hover:bg-orange-400"><Phone size={14} /> Call Now</a><a href="mailto:cargology272@gmail.com" className="inline-flex items-center gap-2 rounded-lg border border-orange-500 px-4 py-2 text-xs font-bold text-orange-400 hover:bg-orange-500/10"><Mail size={14} /> Send Email</a></div></InfoCard>
            <InfoCard icon={Target} title="My Vision" className="md:col-span-2"><p>To build a reliable and user-friendly platform that connects truck owners, drivers and load seekers — helping the logistics industry grow with technology.</p></InfoCard>
          </div>
        </div>
      </div>
      <div className="border-t border-sky-900 bg-[#031426]/90 px-5 py-7 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {[[Users, "Connected People", "Stronger Network"], [ShieldCheck, "Transparent Process", "Better Trust"], [Truck, "Smarter Logistics", "Greater Efficiency"]].map(([Icon, title, subtitle]) => <div key={title} className="flex items-center justify-center gap-4"><Icon size={35} className="shrink-0 text-orange-500" /><div><h3 className="text-sm font-bold text-white">{title}</h3><p className="mt-1 text-xs text-slate-300">{subtitle}</p></div></div>)}
        </div>
      </div>
    </div>
  </div>;
}
