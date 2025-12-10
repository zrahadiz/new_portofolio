import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className=" relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">My Porto</span>
        </div>

        <ul className="hidden md:flex gap-8 text-gray-300">
          <li className="hover:text-white cursor-pointer transition">
            <Link> Home </Link>
          </li>
          <li className="hover:text-white cursor-pointer transition">
            <Link> Projects </Link>
          </li>
          <li className="hover:text-white cursor-pointer transition">
            <Link> About </Link>
          </li>
        </ul>

        <button className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-slate-900">
          Hire Me →
        </button>
      </nav>
    </>
  );
}

export default Navbar;
