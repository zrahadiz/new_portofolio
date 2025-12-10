import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CursorTooltip({ children, tooltip }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="inline-block"
      onMouseMove={handleMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {/* Tooltip */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed pointer-events-none z-9999"
            style={{
              top: pos.y,
              left: pos.x + 20,
            }}
          >
            <div className="px-3 py-2 bg-black/80 text-white text-xs rounded-lg shadow-lg border border-blue-500/50">
              {tooltip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
