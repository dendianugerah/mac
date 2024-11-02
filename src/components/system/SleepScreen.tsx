import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SleepScreenProps {
  isAsleep: boolean;
  onWake: () => void;
}

export const SleepScreen = ({ isAsleep, onWake }: SleepScreenProps) => {
  const [showCursor, setShowCursor] = useState(false);
  const [mouseDistance, setMouseDistance] = useState(0);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isAsleep) {
      const timer = setTimeout(() => setShowCursor(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowCursor(false);
      setMouseDistance(0);
    }
  }, [isAsleep]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isAsleep) return;

    const distance = Math.sqrt(
      Math.pow(e.clientX - lastMousePosition.x, 2) + 
      Math.pow(e.clientY - lastMousePosition.y, 2)
    );

    setMouseDistance(prev => prev + distance);
    setLastMousePosition({ x: e.clientX, y: e.clientY });

    if (mouseDistance > 100) {
      onWake();
    }
  };

  return (
    <AnimatePresence>
      {isAsleep && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 bg-black z-[9999] cursor-none"
          onClick={onWake}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence>
            {showCursor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  text-white/40 text-[15px] font-light tracking-wide"
              >
                Move mouse to wake
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 