import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
    fixed top-0 left-0 w-full z-50
    backdrop-blur-lg bg-slate-900/40 border-b border-white/10
  "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white"
        >
          My <span className="text-blue-400">Porto</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-gray-300 text-lg">
          <li>
            <Link to="/" className="hover:text-white transition font-medium">
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/projects"
              className="hover:text-white transition font-medium"
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-white transition font-medium"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="
            hidden md:block
            px-5 py-2 rounded-full text-white font-semibold 
            border border-white/30 hover:bg-white hover:text-slate-900
            transition
          "
        >
          Hire Me →
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          className="
            md:hidden 
            bg-slate-900/80 backdrop-blur-xl border-t border-white/10 
            px-6 py-4 space-y-4 animate-slideDown
          "
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/projects"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            Projects
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block w-full px-4 py-2 rounded-full
              text-center border border-white/30 text-white
              hover:bg-white hover:text-slate-900 transition font-semibold"
          >
            Hire Me →
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
