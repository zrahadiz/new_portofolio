import React, { useState } from "react";
import { Briefcase, Calendar, Download } from "lucide-react";
import { experiences } from "@/data/growthJourney";

export default function Journey() {
  const [currentExperience, setCurrentExperience] = useState(
    experiences.length - 1
  );

  console.log(experiences);
  const maxVisibleBuildings = 4;

  const [visibleRange, setVisibleRange] = useState({
    start: Math.max(0, experiences.length - maxVisibleBuildings),
    end: experiences.length,
  });

  const handleNext = () => {
    if (currentExperience > 0) {
      const newIndex = currentExperience - 1;
      setCurrentExperience(newIndex);
      updateVisibleRange(newIndex);
    }
  };

  const handlePrev = () => {
    if (currentExperience < experiences.length - 1) {
      const newIndex = currentExperience + 1;
      setCurrentExperience(newIndex);
      updateVisibleRange(newIndex);
    }
  };

  const updateVisibleRange = (index) => {
    const halfRange = Math.floor(maxVisibleBuildings / 2);
    let start = Math.max(0, index - halfRange);
    let end = Math.min(experiences.length, start + maxVisibleBuildings);

    if (end === experiences.length) {
      start = Math.max(0, end - maxVisibleBuildings);
    }

    setVisibleRange({ start, end });
  };

  const visibleExperiences = experiences.slice(
    visibleRange.start,
    visibleRange.end
  );

  const visibleIndex = currentExperience - visibleRange.start;
  const personPosition =
    visibleExperiences.length > 1
      ? ((visibleExperiences.length - 1 - visibleIndex) /
          (visibleExperiences.length - 1)) *
        100
      : 50;

  return (
    <section className="px-8 py-10 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Growth Journey</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My growth journey through various roles and companies
          </p>
        </div>

        {/* Road Animation Container */}
        <div className="mb-12">
          {/* Road with Buildings */}
          <div className="relative h-48 sm:h-56 md:h-64 bg-linear-to-b from-slate-800/50 to-slate-700/50 rounded-3xl overflow-hidden border border-white/10">
            {/* Sky background */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 to-transparent"></div>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-slate-600">
              {/* Road lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 border-t-2 sm:border-t-4 border-dashed border-yellow-400/50"></div>
            </div>

            {/* Buildings (Office markers) */}
            <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-0 right-0 flex justify-between px-4 sm:px-6 md:px-8">
              {visibleExperiences.reverse().map((exp, index) => {
                const originalIndex =
                  visibleRange.start + (visibleExperiences.length - 1 - index);
                return (
                  <div
                    key={originalIndex}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      originalIndex === currentExperience
                        ? "scale-110"
                        : "opacity-50"
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap mb-1 sm:mb-1.5">
                      {exp.company}
                    </span>
                    {/* Building */}
                    <div
                      className={`w-10 h-12 sm:w-12 sm:h-16 md:w-16 md:h-20 bg-linear-to-b rounded-t-lg relative ${
                        originalIndex === currentExperience
                          ? "from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50"
                          : "from-slate-600 to-slate-700"
                      }`}
                    >
                      {/* Windows */}
                      <div className="grid grid-cols-2 gap-0.5 sm:gap-1 p-1 sm:p-1.5 md:p-2">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-full h-1 sm:h-1.5 md:h-2 ${
                              originalIndex === currentExperience
                                ? "bg-yellow-300"
                                : "bg-slate-500"
                            } rounded-sm`}
                          ></div>
                        ))}
                      </div>
                      {/* Door */}
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 sm:w-3 sm:h-4 md:w-4 md:h-6 ${
                          originalIndex === currentExperience
                            ? "bg-yellow-400"
                            : "bg-slate-800"
                        } rounded-t`}
                      ></div>
                    </div>
                    {/* Year label */}
                    <span className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-1.5 whitespace-nowrap hidden sm:block">
                      {exp.year}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Walking Person */}
            <div
              className="absolute bottom-12 sm:bottom-16 md:bottom-20 transition-all duration-700 ease-in-out"
              style={{
                left: `calc(${personPosition}% ${
                  currentExperience ===
                  visibleRange.start + visibleExperiences.length - 1
                    ? "+ 50px"
                    : currentExperience === visibleRange.start
                    ? "- 150px"
                    : "- 20px"
                })`,
              }}
            >
              {/* Simple person icon */}
              <div className="relative">
                {/* Head */}
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-linear-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-0.5 sm:mb-1 ring-1 sm:ring-2 ring-white/30"></div>
                {/* Body */}
                <div className="w-3 h-5 sm:w-3.5 sm:h-6 md:w-4 md:h-8 bg-linear-to-b from-purple-500 to-blue-500 rounded-lg mx-auto"></div>
                {/* Legs - animated walking */}
                <div className="flex gap-0.5 sm:gap-1 justify-center mt-0.5 sm:mt-1">
                  <div className="w-0.5 h-2 sm:w-0.5 sm:h-3 md:w-1 md:h-4 bg-blue-600 rounded animate-pulse"></div>
                  <div
                    className="w-0.5 h-2 sm:w-0.5 sm:h-3 md:w-1 md:h-4 bg-blue-600 rounded animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
              <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2 flex items-center justify-between px-1">
                {/* Progress bar */}
                <div className="flex-1 bg-slate-700/50 rounded-full h-1.5 sm:h-2 relative overflow-hidden">
                  <div
                    className="bg-linear-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        ((experiences.length - currentExperience) /
                          experiences.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                {/* Counter */}
                <span className="text-[10px] sm:text-xs text-gray-400 ml-2 font-medium whitespace-nowrap">
                  {experiences.length - currentExperience}/{experiences.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Details with Navigation Buttons */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Previous Button - Desktop */}
            <button
              onClick={handlePrev}
              disabled={currentExperience === experiences.length - 1}
              className="hidden md:flex btn btn-circle btn-lg btn-outline border-white/20 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>

            {/* Experience Details Card - Fixed Size */}
            <div className="w-full md:w-[600px] lg:w-[700px] h-[420px] md:h-[380px]">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 h-full flex flex-col transition-all duration-500">
                {/* Year Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full mb-4 w-fit">
                  <Calendar size={14} className="text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">
                    {experiences[currentExperience].year}
                  </span>
                </div>

                {/* Role and Company */}
                <h3 className="text-2xl md:text-3xl font-bold mb-2 transition-all duration-500">
                  {experiences[currentExperience].role}
                </h3>
                <p className="text-blue-400 font-medium text-lg md:text-xl mb-4 transition-all duration-500">
                  {experiences[currentExperience].company}
                </p>

                {/* Description - Scrollable if content is long */}
                <div className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                  <p className="text-gray-400 leading-relaxed text-base md:text-lg transition-all duration-500">
                    {experiences[currentExperience].description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-3">
                    Technologies & Tools:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experiences[currentExperience].technologies.map(
                      (tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-700/50 rounded-full text-xs md:text-sm text-gray-300 border border-white/10 transition-all duration-500"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button - Desktop */}
            <button
              onClick={handleNext}
              disabled={currentExperience === 0}
              className="hidden md:flex btn btn-circle btn-lg btn-outline border-white/20 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>

          {/* Navigation Buttons - Mobile (Below card) */}
          <div className="flex md:hidden justify-center gap-6 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentExperience === experiences.length - 1}
              className="btn btn-circle btn-lg btn-outline border-white/20 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={currentExperience === 0}
              className="btn btn-circle btn-lg btn-outline border-white/20 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
