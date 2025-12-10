import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const renderTruck = (category) => (
  <div className="relative ">
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
  </div>
);

const TruckCarousel = ({ skillCategories }) => {
  // We track [currentTruck, direction] tuple
  const [[currentTruck, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    let nextIndex = currentTruck + newDirection;

    // Handle wrapping (infinite loop)
    if (nextIndex < 0) nextIndex = skillCategories.length - 1;
    if (nextIndex >= skillCategories.length) nextIndex = 0;

    setPage([nextIndex, newDirection]);
  };

  // Logic for Dots
  const handleDotClick = (index) => {
    if (index === currentTruck) return;
    // Determine if we are going Left (-1) or Right (1)
    const newDirection = index > currentTruck ? 1 : -1;
    setPage([index, newDirection]);
  };

  const truckVariants = {
    enter: (direction) => ({
      x: direction === 1 ? "-250%" : "150%", // Enter from opposite side
      opacity: 0,
    }),
    center: {
      x: "-50%",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction === 1 ? "150%" : "-250%", // Exit to direction clicked
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  return (
    // 1. SKY LAYER (Main container background linear)
    <div className="relative w-full h-full overflow-hidden bg-linear-to-b from-sky-400 via-sky-200 to-blue-100">
      {/* 2. CLOUD SCENE LAYER */}
      <div className="absolute inset-0 z-0 opacity-70">
        {/* Cloud Left */}
        <div className="absolute top-16 -left-10 w-48 h-16 bg-white rounded-full blur-md"></div>
        <div className="absolute top-24 left-10 w-32 h-12 bg-white/80 rounded-full blur-sm"></div>

        {/* Cloud Right */}
        <div className="absolute top-8 -right-10 w-56 h-20 bg-white rounded-full blur-md opacity-80"></div>
        <div className="absolute top-20 right-20 w-24 h-10 bg-white/70 rounded-full blur-sm"></div>

        {/* Distant hazy cloud */}
        <div className="absolute top-1/3 left-1/3 w-64 h-8 bg-white/40 rounded-full blur-xl"></div>
      </div>

      {/* 3. ROAD SCENE LAYER */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] z-0">
        {/* Horizon Line / Grassy Edge */}
        <div className="w-full h-4 bg-linear-to-b from-green-600 to-green-800 blur-[1px]"></div>

        {/* Asphalt Road surface */}
        <div className="relative w-full h-full bg-linear-to-b from-slate-700 to-slate-900 border-t border-slate-600">
          {/* Road Stripes (Dashed Line) */}
          <div className="absolute left-1/2 inset-y-0 w-4 -translate-x-1/2 border-l-[6px] border-dashed border-yellow-400/70 mt-2"></div>
          {/* Subtle road texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        </div>
      </div>

      {/* --- UI LAYER (Progress Indicator) - z-20 to sit on top --- */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between mb-2">
          {/* Changed text color to be readable on sky */}
          <span className="text-xs font-medium text-sky-900/70">
            Category Progress
          </span>
          <span className="text-xs font-medium text-sky-900/70">
            {currentTruck + 1} / {skillCategories.length}
          </span>
        </div>
        {/* Darkened the track background for contrast against sky */}
        <div className="w-full bg-slate-900/20 rounded-full h-2 backdrop-blur-sm">
          <motion.div
            className="bg-linear-to-r from-green-500 to-blue-600 h-2 rounded-full"
            initial={false}
            animate={{
              width: `${((currentTruck + 1) / skillCategories.length) * 100}%`,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* --- SIDE NAVIGATION CONTROLS (NEW) - z-20 --- */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20 ">
        {/* Previous Button (Left) */}
        <button
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/80 cursor-pointer"
          aria-label="Previous Category"
        >
          {/* Left Arrow SVG (Tailwind Heroicons) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        {/* Next Button (Right) */}
        <button
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/80 cursor-pointer"
          aria-label="Next Category"
        >
          {/* Right Arrow SVG (Tailwind Heroicons) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {/* --- TRUCK ANIMATION LAYER - z-10 to sit on road, below UI --- */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentTruck}
          custom={direction}
          variants={truckVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute bottom-32 left-1/2 z-30"
        >
          <div className="">{renderTruck(skillCategories[currentTruck])}</div>
        </motion.div>
      </AnimatePresence>

      {/* --- UI LAYER (Navigation Dots) - z-20 --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {skillCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            // Changed active/inactive colors for better contrast on dark road
            className={`transition-all duration-300 rounded-full shadow-sm ${
              index === currentTruck
                ? "w-8 h-2 bg-yellow-400"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TruckCarousel;
