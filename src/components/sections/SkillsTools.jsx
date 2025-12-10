import React, { useState } from "react";
import { Code, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const truckVariants = {
  idle: {
    transform: "translateX(-50%)",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },

  leaveNext: {
    transform: "translateX(150%)",
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  leavePrev: {
    transform: "translateX(-250%)",
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },

  startLeft: {
    transform: "translateX(-350%)",
    opacity: 0,
  },
  startRight: {
    transform: "translateX(250%)",
    opacity: 0,
  },

  enter: {
    transform: "translateX(-50%)",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

export default function SkillsTools() {
  const [currentTruck, setCurrentTruck] = useState(0);
  const [nextTruck, setNextTruck] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(""); // 'next' or 'prev'

  const skillCategories = [
    {
      id: 1,
      category: "Frontend Development",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "JavaScript", level: 90, icon: "📜" },
        { name: "TypeScript", level: 85, icon: "📘" },
        { name: "HTML/CSS", level: 95, icon: "🎨" },
        { name: "Tailwind CSS", level: 90, icon: "💨" },
        { name: "Next.js", level: 80, icon: "▲" },
        { name: "Vue.js", level: 75, icon: "💚" },
        { name: "SASS/SCSS", level: 85, icon: "💅" },
      ],
    },
    {
      id: 2,
      category: "Backend Development",
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Python", level: 80, icon: "🐍" },
        { name: "Express.js", level: 85, icon: "🚂" },
        { name: "MongoDB", level: 80, icon: "🍃" },
        { name: "PostgreSQL", level: 75, icon: "🐘" },
        { name: "REST API", level: 90, icon: "🔌" },
        { name: "GraphQL", level: 70, icon: "◈" },
        { name: "Firebase", level: 85, icon: "🔥" },
      ],
    },
    {
      id: 3,
      category: "Design Tools",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Figma", level: 95, icon: "🎨" },
        { name: "Adobe XD", level: 90, icon: "🎭" },
        { name: "Sketch", level: 80, icon: "💎" },
        { name: "Photoshop", level: 85, icon: "🖼️" },
        { name: "Illustrator", level: 80, icon: "✏️" },
        { name: "InVision", level: 75, icon: "👁️" },
        { name: "Framer", level: 70, icon: "🎬" },
        { name: "Webflow", level: 85, icon: "🌊" },
      ],
    },
    {
      id: 4,
      category: "DevOps & Tools",
      icon: "🛠️",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git", level: 90, icon: "🔀" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 70, icon: "☁️" },
        { name: "CI/CD", level: 80, icon: "🔄" },
        { name: "Webpack", level: 75, icon: "📦" },
        { name: "Jest", level: 85, icon: "🃏" },
        { name: "Linux", level: 80, icon: "🐧" },
        { name: "Nginx", level: 70, icon: "🟩" },
      ],
    },
    {
      id: 5,
      category: "Mobile Development",
      icon: "📱",
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: "React Native", level: 85, icon: "⚛️" },
        { name: "Flutter", level: 75, icon: "🦋" },
        { name: "iOS Dev", level: 70, icon: "🍎" },
        { name: "Android Dev", level: 70, icon: "🤖" },
        { name: "Expo", level: 80, icon: "📲" },
        { name: "Swift", level: 65, icon: "🏎️" },
        { name: "Kotlin", level: 65, icon: "🔷" },
        { name: "App Store", level: 80, icon: "🏪" },
      ],
    },
  ];

  const handleNext = () => {
    if (isAnimating) return;
    const next = (currentTruck + 1) % skillCategories.length;
    setNextTruck(next);
    setDirection("next");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentTruck(next);
      setNextTruck(null);
      setIsAnimating(false);
      setDirection("");
    }, 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const prev =
      (currentTruck - 1 + skillCategories.length) % skillCategories.length;
    setNextTruck(prev);
    setDirection("prev");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentTruck(prev);
      setNextTruck(null);
      setIsAnimating(false);
      setDirection("");
    }, 800);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentTruck) return;
    setNextTruck(index);
    setDirection(index > currentTruck ? "next" : "prev");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentTruck(index);
      setNextTruck(null);
      setIsAnimating(false);
      setDirection("");
    }, 1000);
  };

  const currentCategory = skillCategories[currentTruck];

  // Render truck component to avoid duplication
  const renderTruck = (category, showSmoke) => (
    <div className="relative">
      {/* Cargo Container with Skills - BIGGER */}
      <div
        className={`w-80 sm:w-96 md:w-[500px] lg:w-[600px] h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br ${category.color} rounded-lg shadow-2xl relative overflow-hidden`}
      >
        {/* Container Texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 h-full">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>

        {/* Category Label */}
        <div className="absolute top-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">{category.icon}</span>
          <span className="font-bold text-white text-base sm:text-lg md:text-xl">
            {category.category}
          </span>
        </div>

        {/* Skills Grid - More spacing */}
        <div className="absolute top-20 sm:top-24 left-4 right-4 bottom-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pr-2">
            {category.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl sm:text-2xl">{skill.icon}</span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {skill.name}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Truck Cabin - Bigger */}
      <div className="absolute -right-20 sm:-right-24 bottom-0 w-20 sm:w-24 h-32 sm:h-36 bg-gradient-to-br from-slate-700 to-slate-800 rounded-tl-xl rounded-tr-sm shadow-xl">
        {/* Window */}
        <div className="absolute top-4 left-3 w-14 sm:w-16 h-16 sm:h-20 bg-blue-400/30 rounded border-2 border-slate-600"></div>
        {/* Door line */}
        <div className="absolute top-24 left-3 right-3 h-10 border-t-2 border-slate-600"></div>
        {/* Details */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
      </div>

      {/* Wheels - Bigger and more detailed */}
      <div className="absolute -bottom-6 left-12 flex gap-40 sm:gap-52 md:gap-72">
        {/* Back Wheel */}
        <div className="relative">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 rounded-full border-4 border-slate-700 shadow-lg"
            style={{ animation: "spin-wheel 0.5s linear infinite" }}
          ></div>
          <div className="absolute inset-3 bg-slate-600 rounded-full"></div>
          <div className="absolute inset-4 bg-slate-700 rounded-full"></div>
        </div>
        {/* Front Wheel */}
        <div className="relative">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 rounded-full border-4 border-slate-700 shadow-lg"
            style={{ animation: "spin-wheel 0.5s linear infinite" }}
          ></div>
          <div className="absolute inset-3 bg-slate-600 rounded-full"></div>
          <div className="absolute inset-4 bg-slate-700 rounded-full"></div>
        </div>
      </div>

      {/* Exhaust smoke when animating */}
      {showSmoke && (
        <div className="absolute -left-8 top-0">
          <div className="animate-smoke">💨</div>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
            <Wrench size={20} className="text-green-400" />
            <span className="text-sm text-gray-400">What I Know</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Tools
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Truck Animation Container */}
        <div className="mb-12">
          {/* Road Scene */}
          <div className="relative h-96 sm:h-[500px] md:h-[600px] bg-gradient-to-b from-slate-800/30 to-slate-700/50 rounded-3xl overflow-hidden border border-white/10">
            {/* Sky/Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>

            {/* Moving clouds for depth */}
            <div className="absolute top-10 left-0 right-0 flex gap-20 animate-cloud-drift">
              <div className="w-20 h-10 bg-white/5 rounded-full blur-xl"></div>
              <div className="w-32 h-12 bg-white/5 rounded-full blur-xl"></div>
              <div className="w-24 h-10 bg-white/5 rounded-full blur-xl"></div>
            </div>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-slate-600/80">
              {/* Road lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 border-t-2 sm:border-t-4 border-dashed border-yellow-400/50"></div>
            </div>

            <div className="relative w-full h-full">
              <AnimatePresence mode="sync">
                {/* ⚡ CURRENT TRUCK (LEAVING) OR IDLE */}
                {!isAnimating ? (
                  /* Idle Truck (not animating) */
                  <motion.div
                    key={`idle-${currentTruck}`}
                    className="absolute bottom-36 left-1/2"
                    initial="idle"
                    animate="idle"
                    style={{ transform: "translateX(-50%)" }}
                  >
                    {renderTruck(skillCategories[currentTruck], false)}
                  </motion.div>
                ) : (
                  /* Leaving Truck */
                  <motion.div
                    key={`leave-${currentTruck}`}
                    className="absolute bottom-36 left-1/2"
                    initial="idle"
                    animate={direction === "next" ? "leaveNext" : "leavePrev"}
                    exit="idle"
                    variants={truckVariants}
                    style={{ transform: "translateX(-50%)" }}
                  >
                    {renderTruck(skillCategories[currentTruck], true)}
                  </motion.div>
                )}

                {/* ⚡ NEXT / PREV TRUCK ENTERING */}
                {isAnimating && nextTruck !== null && (
                  <motion.div
                    key={`enter-${nextTruck}`}
                    className="absolute bottom-36 left-1/2"
                    initial={direction === "next" ? "startLeft" : "startRight"}
                    animate="enter"
                    exit="idle"
                    variants={truckVariants}
                  >
                    {renderTruck(skillCategories[nextTruck], false)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Indicator */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Category Progress</span>
                <span className="text-xs text-gray-400">
                  {currentTruck + 1} / {skillCategories.length}
                </span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      ((currentTruck + 1) / skillCategories.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Category Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={isAnimating}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTruck
                      ? "w-8 bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  } disabled:cursor-not-allowed`}
                ></button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="btn btn-circle btn-lg btn-outline border-white/20 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="btn btn-circle btn-lg btn-outline border-white/20 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Skills Detail List - Below Truck */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">{currentCategory.icon}</span>
              {currentCategory.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCategory.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{skill.icon}</span>
                      <span className="font-semibold text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${currentCategory.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-wheel {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes cloud-drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100px);
          }
        }
        @keyframes smoke {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-50px) scale(1.5);
          }
        }
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-350%);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          0% {
            transform: translateX(250%);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%);
            opacity: 1;
          }
        }
        .animate-cloud-drift {
          animation: cloud-drift 20s linear infinite;
        }
        .animate-smoke {
          animation: smoke 1s ease-out infinite;
        }
      `}</style>
    </section>
  );
}
