import { useState } from 'react';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { motion } from 'framer-motion';

interface WindowTitleBarProps {
  isDarkMode: boolean;
  isMaximized?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onDoubleClick?: () => void;
  title?: string;
}

export const WindowTitleBar = ({ 
  isDarkMode, 
  isMaximized, 
  onClose, 
  onMinimize, 
  onMaximize,
  title = "Notes"
}: WindowTitleBarProps) => {
  const { startDragging } = useWindowDrag(!!isMaximized);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseDown={startDragging}
      onDoubleClick={onMaximize}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-[28px] select-none
        ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#e7e7e7]'} 
        border-b ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'} 
        flex items-center justify-between px-3 cursor-default`}
      initial={false}
      animate={{
        backgroundColor: isDarkMode ? '#2a2a2a' : '#e7e7e7'
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center space-x-2 h-full py-1.5">
        <div className="flex items-center space-x-[8px]">
          <WindowControl
            color="#ff5f57"
            hoverColor="#ff4b4a"
            icon="close"
            onClick={onClose}
            isVisible={isHovered}
          />
          <WindowControl
            color="#febc2e"
            hoverColor="#febc2e"
            icon="minimize"
            onClick={onMinimize}
            isVisible={isHovered}
          />
          <WindowControl
            color="#28c840"
            hoverColor="#28c840"
            icon="maximize"
            onClick={onMaximize}
            isVisible={isHovered}
            isMaximized={isMaximized}
          />
        </div>
      </div>
      <div className={`absolute left-1/2 transform -translate-x-1/2 text-xs font-bold
        ${isDarkMode ? 'text-[#999]' : 'text-[#666]'}`}
      >
        {title}
      </div>
    </motion.div>
  );
};

interface WindowControlProps {
  color: string;
  hoverColor: string;
  icon: 'close' | 'minimize' | 'maximize';
  onClick?: () => void;
  isVisible: boolean;
  isMaximized?: boolean;
}

const WindowControl = ({ 
  color, 
  hoverColor, 
  icon, 
  onClick, 
  isVisible,
  isMaximized 
}: WindowControlProps) => (
  <motion.button 
    onClick={onClick}
    className={`w-[12px] h-[12px] rounded-full will-change-transform
      group flex items-center justify-center relative`}
    style={{ backgroundColor: color }}
    whileHover={isVisible ? { scale: 1.08 } : {}}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 15,
      mass: 0.5,
    }}
  >
    <motion.div 
      className="absolute inset-0 rounded-full will-change-opacity"
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.1,
        ease: "easeOut"
      }}
    >
      {icon === 'close' && (
        <motion.svg 
          className="w-[8px] h-[8px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          viewBox="0 0 10 10" 
          stroke="#4c0002" 
          strokeWidth="1.1"
          initial={false}
          animate={{ opacity: isVisible ? 1 : 0 }}
        >
          <path d="M2 2l6 6m0-6L2 8" />
        </motion.svg>
      )}
      {icon === 'minimize' && (
        <motion.svg 
          className="w-[8px] h-[8px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          viewBox="0 0 10 10" 
          stroke="#9a6b00" 
          strokeWidth="1.1"
          initial={false}
          animate={{ opacity: isVisible ? 1 : 0 }}
        >
          <path d="M2.5 5h5" strokeLinecap="round" />
        </motion.svg>
      )}
      {icon === 'maximize' && (
        <motion.svg 
          className="w-[8px] h-[8px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          viewBox="0 0 10 10" 
          stroke="#0b6300" 
          strokeWidth="1.1"
          initial={false}
          animate={{ opacity: isVisible ? 1 : 0 }}
        >
          {isMaximized ? (
            <g>
              <path d="M3.5 3.5h3v3h-3z" fill="none" />
            </g>
          ) : (
            <g>
              <path d="M3.5 3.5h3v3h-3z" fill="none" />
              <path d="M3.5 3.5v-1h3v1M3.5 6.5v1h3v-1" strokeLinecap="round" />
            </g>
          )}
        </motion.svg>
      )}
    </motion.div>
  </motion.button>
); 