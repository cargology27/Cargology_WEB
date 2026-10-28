import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import { LoadsPage, TrucksPage } from "./pages/Marketplace";
import { Dashboard, Shipper, Transporter, PostLoad } from "./pages/Operations";
import Negotiations from "./pages/Negotiations";
import Tracking from "./pages/Tracking";
import { Login, Profile, SettingsPage } from "./pages/Account";
import { Button } from "./components/ui";
import { ArrowRight } from "lucide-react";

function NotFound() {
  return <div className="mx-auto max-w-lg py-20 text-center"><div className="text-sm font-bold text-orange-400">404 · ROUTE NOT FOUND</div><h1 className="mt-3 text-3xl font-black text-white">This route is off the map.</h1><p className="mt-3 text-sm text-slate-500">The page may have moved. Return to the Cargology home page.</p><Button to="/" className="mt-6">Back to home <ArrowRight size={15}/></Button></div>;
}
export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/loads" element={<LoadsPage/>}/>
    <Route path="/trucks" element={<TrucksPage/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/shipper" element={<Shipper/>}/>
    <Route path="/transporter" element={<Transporter/>}/>
    <Route path="/post-load" element={<PostLoad/>}/>
    <Route path="/negotiations" element={<Negotiations/>}/>
    <Route path="/tracking" element={<Tracking/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/settings" element={<SettingsPage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Layout>;
}