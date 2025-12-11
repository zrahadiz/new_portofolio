import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const renderTruck = (category) => (
  <div className="relative">
    {/* Cargo Container with Skills - Responsive sizes */}
    <div
      className={`w-48 h-40 xs:w-64 sm:w-80 sm:h-48 md:w-96 md:h-56 lg:w-[500px] lg:h-64 xl:w-[600px] xl:h-72 bg-gradient-to-br ${category.color} rounded-lg shadow-2xl relative overflow-hidden`}
    >
      {/* Container Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 h-full">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
      </div>

      {/* Category Label - Responsive text */}
      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 md:px-6 flex items-center gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl md:text-4xl">
          {category.icon}
        </span>
        <span className="font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl">
          {category.category}
        </span>
      </div>

      {/* Skills Grid - Responsive spacing and columns */}
      <div className="absolute top-14 left-2 right-2 bottom-2 sm:top-16 sm:left-4 sm:right-4 sm:bottom-4 md:top-20 lg:top-24 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 pr-2">
          {category.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <span className="text-lg sm:text-xl md:text-2xl">
                  {skill.icon}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white truncate">
                  {skill.name}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-white rounded-full h-1.5 sm:h-2 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Truck Cabin - Responsive sizes */}
    <div className="absolute -right-14 bottom-0 w-14 h-24 sm:-right-16 sm:w-16 sm:h-28 md:-right-20 md:w-20 md:h-32 lg:-right-24 lg:w-24 lg:h-36 bg-gradient-to-br from-slate-700 to-slate-800 rounded-tl-xl rounded-tr-sm shadow-xl">
      {/* Window */}
      <div className="absolute top-3 left-2 w-10 h-12 sm:top-4 sm:left-3 sm:w-12 sm:h-14 md:w-14 md:h-16 lg:w-16 lg:h-20 bg-blue-400/30 rounded border-2 border-slate-600"></div>
      {/* Door line */}
      <div className="absolute top-16 left-2 right-2 h-8 sm:top-20 sm:left-3 sm:right-3 md:top-24 lg:h-10 border-t-2 border-slate-600"></div>
      {/* Details */}
      <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:top-2 sm:right-2 sm:w-2 sm:h-2 bg-orange-400 rounded-full"></div>
    </div>
    {/* Wheels - Responsive sizes and gaps */}
    <div className="absolute -bottom-4 left-8 flex gap-24 sm:-bottom-6 sm:left-12 sm:gap-32 md:gap-40 lg:gap-52 xl:gap-72">
      {/* Back Wheel */}
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-slate-900 rounded-full border-3 sm:border-4 border-slate-700 shadow-lg"></div>
        <div className="absolute inset-2 sm:inset-3 bg-slate-600 rounded-full"></div>
        <div className="absolute inset-3 sm:inset-4 bg-slate-700 rounded-full"></div>
      </div>
      {/* Front Wheel */}
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-slate-900 rounded-full border-3 sm:border-4 border-slate-700 shadow-lg"></div>
        <div className="absolute inset-2 sm:inset-3 bg-slate-600 rounded-full"></div>
        <div className="absolute inset-3 sm:inset-4 bg-slate-700 rounded-full"></div>
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
    // 1. SKY LAYER - Responsive height
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-blue-100 rounded-2xl sm:rounded-3xl">
      {/* 2. CLOUD SCENE LAYER - Responsive sizes */}
      <div className="absolute inset-0 z-0 opacity-70">
        {/* Cloud Left */}
        <div className="absolute top-8 -left-5 w-32 h-12 sm:top-16 sm:-left-10 sm:w-48 sm:h-16 bg-white rounded-full blur-md"></div>
        <div className="absolute top-12 left-5 w-24 h-10 sm:top-24 sm:left-10 sm:w-32 sm:h-12 bg-white/80 rounded-full blur-sm"></div>

        {/* Cloud Right */}
        <div className="absolute top-4 -right-5 w-40 h-14 sm:top-8 sm:-right-10 sm:w-56 sm:h-20 bg-white rounded-full blur-md opacity-80"></div>
        <div className="absolute top-10 right-10 w-20 h-8 sm:top-20 sm:right-20 sm:w-24 sm:h-10 bg-white/70 rounded-full blur-sm"></div>

        {/* Distant hazy cloud */}
        <div className="absolute top-1/3 left-1/3 w-48 h-6 sm:w-64 sm:h-8 bg-white/40 rounded-full blur-xl"></div>
      </div>

      {/* 3. ROAD SCENE LAYER - Responsive height */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] sm:h-[35%] z-0">
        {/* Horizon Line / Grassy Edge */}
        <div className="w-full h-3 sm:h-4 bg-gradient-to-b from-green-600 to-green-800 blur-[1px]"></div>

        {/* Asphalt Road surface */}
        <div className="relative w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 border-t border-slate-600">
          {/* Road Stripes (Dashed Line) - Responsive width */}
          <div className="absolute left-1/2 inset-y-0 w-3 -translate-x-1/2 border-l-4 sm:w-4 sm:border-l-[6px] border-dashed border-yellow-400/70 mt-1 sm:mt-2"></div>
          {/* Subtle road texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        </div>
      </div>

      {/* --- UI LAYER (Progress Indicator) - z-20, Responsive spacing --- */}
      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-20">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-medium text-sky-900/70">
            Category Progress
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-sky-900/70">
            {currentTruck + 1} / {skillCategories.length}
          </span>
        </div>
        <div className="w-full bg-slate-900/20 rounded-full h-1.5 sm:h-2 backdrop-blur-sm">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-blue-600 h-1.5 sm:h-2 rounded-full"
            initial={false}
            animate={{
              width: `${((currentTruck + 1) / skillCategories.length) * 100}%`,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* --- SIDE NAVIGATION CONTROLS - z-20, Responsive button sizes --- */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 z-20">
        {/* Previous Button (Left) */}
        <button
          onClick={() => paginate(-1)}
          className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/80 cursor-pointer"
          aria-label="Previous Category"
        >
          {/* Left Arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
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
          className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/80 cursor-pointer"
          aria-label="Next Category"
        >
          {/* Right Arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {/* --- TRUCK ANIMATION LAYER - z-10, Responsive positioning --- */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentTruck}
          custom={direction}
          variants={truckVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-44 left-1/2 z-30"
        >
          <div>{renderTruck(skillCategories[currentTruck])}</div>
        </motion.div>
      </AnimatePresence>

      {/* --- UI LAYER (Navigation Dots) - z-20, Responsive sizes --- */}
      <div className="absolute bottom-9 sm:bottom-10 md:bottom-12 lg:bottom-32 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
        {skillCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full shadow-sm ${
              index === currentTruck
                ? "w-6 h-1.5 sm:w-8 sm:h-2 bg-yellow-400"
                : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TruckCarousel;
