import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
}
