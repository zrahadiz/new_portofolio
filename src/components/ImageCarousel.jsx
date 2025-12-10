import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const goTo = (i) => setIndex(i);

  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <div className="relative w-full h-64 sm:h-80 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center border border-white/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain p-4"
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-2 btn btn-circle btn-sm bg-slate-600/70 border-white/20 hover:bg-white hover:text-black"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={next}
          className="absolute right-2 btn btn-circle btn-sm bg-slate-600/70 border-white/20 hover:bg-white hover:text-black"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Mini Preview Strip */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {/* Previous Image */}
        <img
          src={images[prevIndex]}
          onClick={() => goTo(prevIndex)}
          className="w-16 h-16 object-cover rounded-md opacity-40 hover:opacity-70 cursor-pointer border border-white/10"
        />

        {/* Current */}
        <img
          src={images[index]}
          className="w-20 h-20 object-cover rounded-lg border-2 border-blue-500 shadow-lg"
        />

        {/* Next Image */}
        <img
          src={images[nextIndex]}
          onClick={() => goTo(nextIndex)}
          className="w-16 h-16 object-cover rounded-md opacity-40 hover:opacity-70 cursor-pointer border border-white/10"
        />
      </div>
    </div>
  );
}
