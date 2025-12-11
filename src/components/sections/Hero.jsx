import { useRef, useEffect } from "react";
import { Download, Play, Linkedin } from "lucide-react";

import {
  SiGithub,
  SiInstagram,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";

import resume from "@/assets/myCv/CV_Rahadi Fauzan_SWE.pdf";
import profileImg from "@/assets/test.jpg";

function Hero() {
  const cardRef = useRef(null);

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  useEffect(() => {
    let frame;

    const animate = () => {
      const card = cardRef.current;
      if (!card) return;

      // Lerp slower for smoother return
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      card.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Set target rotation only (smooth follows)
    targetX = ((x - centerX) / centerX) * 20;
    targetY = ((y - centerY) / centerY) * -20;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const reset = () => {
    targetX = 0;
    targetY = 0;
  };

  return (
    <div className="px-8 pt-36">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-4">
                Hello! I'm
              </h1>
              <h2 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Rahadi Fauzan
              </h2>
              {/* Handwritten style text */}
              <div className="relative mt-4">
                <span className="text-3xl font-['Brush_Script_MT',cursive] text-gray-400 opacity-50">
                  Software Engineer
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-lg max-w-md">
              Software engineer with 2+ years of experience in building web
              applications. Passionate about creating efficient and scalable
              solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={resume}
                download="CV_Rahadi-Fauzan"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-outline gap-2 text-white border-white/30 hover:bg-white hover:text-slate-900">
                  <Download size={18} />
                  Get Resume
                </button>
              </a>

              <button className="btn btn-ghost gap-2 text-gray-300 hover:text-white hover:bg-white/10">
                <Play size={18} />
                Watch Video
              </button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Profile Image Placeholder */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={reset}
                className="
      holo-wrap
      rounded-2xl overflow-hidden
      aspect-3/4
      bg-slate-900 shadow-2xl border border-white/10
    "
              >
                <img
                  src={profileImg}
                  alt="profile"
                  className="w-full h-full object-cover"
                  draggable="false"
                />

                <div className="holo-shine"></div>
                <div className="holo-foil"></div>
                <div className="holo-sparkles"></div>
              </div>

              {/* Social Icons with Curved Line - Desktop Only */}
              <div className="hidden xl:block absolute right-0 top-0 bottom-0 translate-x-20">
                {/* SVG Curved Path */}
                <svg
                  className="absolute inset-0 w-32 h-full"
                  viewBox="0 0 120 500"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 40 50 Q 80 150, 40 250 Q 10 350, 40 450"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Icons positioned along the curve */}
                <button
                  className="absolute btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all"
                  style={{ top: "15%", left: "36px" }}
                >
                  <Linkedin size={20} />
                </button>
                <button
                  className="absolute btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all"
                  style={{ top: "35%", left: "42px" }}
                >
                  <SiGithub size={20} />
                </button>
                <button
                  className="absolute btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all"
                  style={{ top: "55%", left: "12px" }}
                >
                  <SiWhatsapp size={20} />
                </button>
                <button
                  className="absolute btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all"
                  style={{ top: "75%", left: "10px" }}
                >
                  <SiInstagram size={20} />
                </button>
              </div>

              {/* Social Icons - Mobile Version */}
              <div className="xl:hidden flex justify-center gap-4 mt-8">
                <button className="btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all">
                  <Linkedin size={20} />
                </button>
                <button className="btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all">
                  <SiGithub size={20} />
                </button>
                <button className="btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all">
                  <SiWhatsapp size={20} />
                </button>
                <button className="btn btn-circle btn-ghost border border-white/20 hover:bg-white hover:text-slate-900 transition-all">
                  <SiInstagram size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
