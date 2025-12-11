import { useState } from "react";
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
        <a
          href="#about"
          className="text-2xl font-extrabold tracking-wide text-white"
        >
          My <span className="text-blue-400">Porto</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-gray-300 text-lg">
          <li>
            <a
              href="#about"
              className="hover:text-white transition font-medium"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#journey"
              className="hover:text-white transition font-medium"
            >
              Journey
            </a>
          </li>

          <li>
            <a
              href="#projects"
              className="hover:text-white transition font-medium"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#skills"
              className="hover:text-white transition font-medium"
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#testimonials"
              className="hover:text-white transition font-medium"
            >
              Testimonies
            </a>
          </li>
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="
            hidden md:block
            px-5 py-2 rounded-full text-white font-semibold 
            border border-white/30 hover:bg-white hover:text-slate-900
            transition
          "
        >
          Hire Me →
        </a>

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
          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            About
          </a>

          <a
            href="#journey"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            Journey
          </a>

          <a
            href="#projects"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            Projects
          </a>

          <a
            href="#skills"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            Skills
          </a>

          <a
            href="#testimonials"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-white transition"
          >
            Testimonies
          </a>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block w-full px-4 py-2 rounded-full
              text-center border border-white/30 text-white
              hover:bg-white hover:text-slate-900 transition font-semibold"
          >
            Hire Me →
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
