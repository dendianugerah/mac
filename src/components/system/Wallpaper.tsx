import { motion } from 'framer-motion';

interface WallpaperProps {
  isDarkMode: boolean;
  isBlurred?: boolean;
}

export const Wallpaper = ({ isDarkMode, isBlurred }: WallpaperProps) => {

  const getWallpaperStyle = () => {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;

    return isDaytime
      ? isDarkMode
        ? 'bg-gradient-to-b from-[#1a1b1e] via-[#2d3436] to-[#2d3436]'
        : 'bg-gradient-to-b from-[#89c2d9] via-[#a9d6e5] to-[#caf0f8]'
      : isDarkMode
        ? 'bg-gradient-to-b from-[#0d1b2a] via-[#1b263b] to-[#415a77]'
        : 'bg-gradient-to-b from-[#003049] via-[#023e8a] to-[#0077b6]';
  };

  return (
    <motion.div
      className={`absolute inset-0 ${getWallpaperStyle()} transition-colors duration-500`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dynamic particles/stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-[2px] h-[2px] rounded-full
              ${isDarkMode ? 'bg-white/20' : 'bg-white/40'}
              animate-twinkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Blur overlay */}
      {isBlurred && (
        <motion.div
          initial={{ backdropFilter: 'blur(0px)' }}
          animate={{ backdropFilter: 'blur(20px)' }}
          exit={{ backdropFilter: 'blur(0px)' }}
          className="absolute inset-0 bg-black/20"
        />
      )}
    </motion.div>
  );
}; 