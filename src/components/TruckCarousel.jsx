import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TruckCarousel = ({ skillCategories, renderTruck }) => {
  // We track [currentTruck, direction] to keep them in sync
  const [[currentTruck, direction], setPage] = useState([0, 0]);

  // Direction logic: 1 = next (right), -1 = prev (left)
  const paginate = (newDirection) => {
    let nextIndex = currentTruck + newDirection;

    // Handle wrapping (infinite loop)
    if (nextIndex < 0) nextIndex = skillCategories.length - 1;
    if (nextIndex >= skillCategories.length) nextIndex = 0;

    setPage([nextIndex, newDirection]);
  };

  const truckVariants = {
    // 'direction' comes from the custom prop passed to AnimatePresence
    enter: (direction) => ({
      // If clicking Next (1): Enter from Left (-250%)
      // If clicking Prev (-1): Enter from Right (150%)
      x: direction === 1 ? "-250%" : "150%",
      opacity: 0,
    }),
    center: {
      x: "-50%", // Keeps it centered
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: (direction) => ({
      // If clicking Next (1): Exit to Right (150%)
      // If clicking Prev (-1): Exit to Left (-250%)
      x: direction === 1 ? "150%" : "-250%",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  return (
    <div className="relative w-full h-full">
      {/* custom={direction} passes data to the variants */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentTruck} // Changing this triggers the animation
          custom={direction} // Must pass this to motion.div too
          variants={truckVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute bottom-36 left-1/2"
          // IMPORTANT: Remove the inline style transform. Let Framer handle 'x'.
        >
          {renderTruck(skillCategories[currentTruck])}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
        <button onClick={() => paginate(-1)}>Prev</button>
        <button onClick={() => paginate(1)}>Next</button>
      </div>
    </div>
  );
};

export default TruckCarousel;
