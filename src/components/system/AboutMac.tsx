import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { WindowTitleBar } from '@/components/window/WindowTitleBar';

interface AboutMacProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const AboutMac = ({ isOpen, onClose, isDarkMode }: AboutMacProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const { position, startDragging } = useWindowDrag(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'support'>('overview');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 80 }}
          exit={{ opacity: 0, scale: 0.95, y: 80 }}
          transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 top-0 z-[9999] flex justify-center"
          onClick={onClose}
        >
          <motion.div
            ref={windowRef}
            className={`w-[420px] rounded-xl shadow-xl overflow-hidden
              ${isDarkMode 
                ? 'bg-[#2a2a2a] border border-[#3a3a3a]' 
                : 'bg-[#f5f5f7]/90 backdrop-blur-xl border border-white/20'}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              boxShadow: isDarkMode 
                ? '0 24px 40px rgba(0, 0, 0, 0.4)' 
                : '0 24px 40px rgba(0, 0, 0, 0.2)',
              willChange: 'transform'
            }}
          >
            <WindowTitleBar
              isDarkMode={isDarkMode}
              isMaximized={false}
              onClose={onClose}
              onMinimize={() => {}}
              onMaximize={() => {}}
              onMouseDown={startDragging}
              title="About This Portfolio"
              className="h-11"
            />

            {/* Tabs */}
            <div className={`flex px-6 pt-4 space-x-4 border-b 
              ${isDarkMode ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
              {(['overview', 'support'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 pb-2 text-[13px] font-medium relative
                    ${activeTab === tab 
                      ? isDarkMode ? 'text-white' : 'text-black' 
                      : isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full
                        ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 flex"
                >
                  {/* Left side - Big macOS logo */}
                  <div className="w-40 flex-shrink-0">
                    <div className={`w-28 h-28 rounded-[22px] mb-4 flex items-center justify-center
                      ${isDarkMode ? 'bg-[#323232]' : 'bg-[#e8e8e8]'}`}>
                      <svg className={`w-20 h-20 ${isDarkMode ? 'text-white' : 'text-black'}`} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                    </div>
                    <div className="space-y-[2px]">
                      <button className={`w-full text-left text-[12px] py-[3px] px-2 rounded
                        ${isDarkMode 
                          ? 'hover:bg-[#0058d1] text-white' 
                          : 'hover:bg-[#0058d1] hover:text-white text-black/80'}`}>
                        System Report...
                      </button>
                      <button className={`w-full text-left text-[12px] py-[3px] px-2 rounded
                        ${isDarkMode 
                          ? 'hover:bg-[#0058d1] text-white' 
                          : 'hover:bg-[#0058d1] hover:text-white text-black/80'}`}>
                        Software Update...
                      </button>
                    </div>
                  </div>

                  {/* Right side - Specs */}
                  <div className="flex-1 space-y-4 pt-1">
                    <div>
                      <h2 className={`text-[20px] font-semibold mb-1
                        ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Portfolio
                      </h2>
                      <div className={`text-[12px] space-y-[2px]
                        ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                        <p>Version 1.0</p>
                        <p>Next.js 15.0.2</p>
                      </div>
                    </div>

                    <div className={`space-y-[2px] text-[12px]
                      ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      <div className="flex">
                        <span className="w-[72px] font-medium">Developer</span>
                        <span>Dendi Anugerah</span>
                      </div>
                      <div className="flex">
                        <span className="w-[72px] font-medium">Stack</span>
                        <span>Next.js, TypeScript</span>
                      </div>
                      <div className="flex">
                        <span className="w-[72px] font-medium">UI</span>
                        <span>Tailwind CSS, Framer Motion</span>
                      </div>
                      <div className="flex pt-1">
                        <span className="w-[72px] font-medium">Serial</span>
                        <span className="font-light">DEND1-AN0G3-RAH0-2024</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="support"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6"
                >
                  <div className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    <h3 className="font-medium mb-2">Portfolio Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://github.com/dendianugerah" 
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub Repository
                        </a>
                      </li>
                      <li>
                        <a href="#" 
                          className="text-blue-500 hover:underline"
                        >
                          Documentation
                        </a>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 