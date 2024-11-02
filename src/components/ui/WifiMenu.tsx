import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, ChevronRight, Lock } from 'lucide-react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface WifiMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const WifiMenu = ({ isOpen, onClose, isDarkMode }: WifiMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, onClose);
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);

  const WifiIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M7.927 11.476c.506 0 .917.41.917.916 0 .506-.41.916-.917.916a.917.917 0 0 1-.917-.916c0-.506.41-.916.917-.916zm2.137-2.783c.046.047.088.096.127.147a.917.917 0 0 1-.127 1.29 4.147 4.147 0 0 0-2.137-.586c-.773 0-1.505.21-2.137.586a.917.917 0 0 1-.127-1.29c.039-.051.081-.1.127-.147a5.982 5.982 0 0 1 4.274 0zm2.1-2.1c.046.046.088.095.127.146a.917.917 0 0 1-.127 1.29 7.313 7.313 0 0 0-4.237-1.337 7.313 7.313 0 0 0-4.237 1.337.917.917 0 0 1-.127-1.29c.039-.051.081-.1.127-.146a9.148 9.148 0 0 1 8.474 0zm2.1-2.1c.046.046.088.095.127.146a.917.917 0 0 1-.127 1.29 10.479 10.479 0 0 0-6.337-2.087c-2.373 0-4.614.744-6.337 2.087a.917.917 0 0 1-.127-1.29c.039-.051.081-.1.127-.146a12.314 12.314 0 0 1 12.674 0z"/>
    </svg>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.1 }}
          className={`absolute right-0 top-6 w-[280px] rounded-lg shadow-lg 
            ${isDarkMode ? 'bg-[#2a2a2a]/95' : 'bg-[#ffffff]/95'} 
            backdrop-blur-xl
            border ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]/50'}
            shadow-xl shadow-black/20 z-[9999]`}
        >
          <div className="p-3 space-y-2">
            {/* Wi-Fi Toggle Section */}
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                WiFi
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWifiEnabled(!isWifiEnabled)}
                className={`relative w-[51px] h-[31px] rounded-full 
                  ${isWifiEnabled 
                    ? 'bg-[#007AFF]' 
                    : isDarkMode ? 'bg-[#424242]' : 'bg-gray-200'}`}
              >
                <div
                  className={`absolute w-[27px] h-[27px] transition-transform duration-200 
                    bg-white rounded-full shadow-sm top-[2px] left-[2px]
                    ${isWifiEnabled ? 'translate-x-[20px]' : 'translate-x-0'}`}
                />
              </motion.button>
            </div>

            {isWifiEnabled && (
              <>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                  Personal Hotspot
                </div>

                <button className={`w-full px-2 py-1.5 -mx-1 text-left flex items-center justify-between
                  ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'} rounded-md`}
                >
                  <div className="flex items-center space-x-2">
                    <WifiIcon />
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      iPhone
                    </span>
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                    LTE
                  </div>
                </button>

                <div className={`text-xs font-medium ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                  Preferred Network
                </div>

                <button className={`w-full px-2 py-1.5 -mx-1 text-left flex items-center justify-between
                  ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'} rounded-md`}
                >
                  <div className="flex items-center space-x-2">
                    <WifiIcon />
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Secure WiFi Network
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-3 h-3 text-[#86868b]" />
                    <div className="text-[#007AFF]">✓</div>
                  </div>
                </button>

                <button className={`w-full px-2 py-1.5 -mx-1 text-left flex items-center justify-between
                  ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'} rounded-md`}
                >
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Other Networks...
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#86868b]" />
                </button>

                <div className={`w-full h-[1px] my-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />

                <button className={`w-full px-2 py-1.5 -mx-1 text-left
                  ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'} rounded-md`}
                >
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Network Preferences...
                  </span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 