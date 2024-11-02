import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock } from 'lucide-react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface WifiMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  isConnected: boolean;
  onToggleConnection: () => void;
}

export const WifiMenu = ({ isOpen, onClose, isDarkMode, isConnected, onToggleConnection }: WifiMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, onClose);
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);

  const handleWifiToggle = () => {
    setIsWifiEnabled(!isWifiEnabled);
    if (!isWifiEnabled) {
      onToggleConnection();
    } else if (isConnected) {
      onToggleConnection();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.1 }}
          className={`absolute right-0 top-7 w-[280px] rounded-lg
            ${isDarkMode ? 'bg-[#2a2a2a]/90' : 'bg-[#ffffff]/90'} 
            backdrop-blur-2xl
            border ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]/50'}
            shadow-xl shadow-black/20 z-[9999]`}
        >
          <div className="py-1">
            {/* Wi-Fi Toggle Section */}
            <div className="flex items-center justify-between px-3 py-2">
              <span className={`text-[13px] font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Wi-Fi
              </span>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleWifiToggle}
                className={`relative w-[40px] h-[24px] rounded-full transition-colors duration-200
                  ${isWifiEnabled 
                    ? 'bg-[#007AFF]' 
                    : isDarkMode ? 'bg-[#424242]' : 'bg-[#e5e5e5]'}`}
              >
                <div
                  className={`absolute w-[20px] h-[20px] transition-transform duration-200 
                    bg-white rounded-full shadow-sm top-[2px] left-[2px]
                    ${isWifiEnabled ? 'translate-x-[16px]' : 'translate-x-0'}`}
                />
              </motion.button>
            </div>

            {isWifiEnabled && (
              <>
                <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                <div className="py-1">
                  <div className={`px-3 py-1 text-[13px] font-medium ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                    Personal Hotspot
                  </div>
                  <NetworkItem
                    name="iPhone"
                    type="personal"
                    isDarkMode={isDarkMode}
                    showSignal={true}
                    showBattery={true}
                    onClick={onToggleConnection}
                  />
                </div>

                <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                <div className="py-1">
                  <div className={`px-3 py-1 text-[13px] font-medium ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                    Preferred Network
                  </div>
                  <NetworkItem
                    name="Secure Wi-Fi Network"
                    type="wifi"
                    isDarkMode={isDarkMode}
                    isSecure={true}
                    isConnected={true}
                  />
                </div>

                <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                <div className="py-1">
                  <button className={`w-full px-3 py-1 text-left flex items-center justify-between
                    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
                    transition-colors duration-150`}
                  >
                    <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Other Networks...
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
                  </button>
                </div>

                <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                <div className="py-1">
                  <button className={`w-full px-3 py-1 text-left
                    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
                    transition-colors duration-150`}
                  >
                    <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Network Preferences...
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface NetworkItemProps {
  name: string;
  type: 'wifi' | 'personal';
  isDarkMode: boolean;
  isSecure?: boolean;
  isConnected?: boolean;
  showSignal?: boolean;
  showBattery?: boolean;
  onClick?: () => void;
}

const NetworkItem = ({ 
  name, 
  type, 
  isDarkMode, 
  isSecure, 
  isConnected,
  showSignal,
  showBattery,
  onClick
}: NetworkItemProps) => (
  <button 
    onClick={onClick}
    className={`w-full px-3 py-1 text-left flex items-center justify-between
      ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
      transition-colors duration-150`}
  >
    <div className="flex items-center space-x-2">
      {type === 'personal' ? (
        <PersonalHotspotIcon />
      ) : (
        <WifiIcon />
      )}
      <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {name}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      {isSecure && <Lock className="w-3 h-3 text-[#86868b]" />}
      {showSignal && <SignalIcon />}
      {showBattery && <BatteryIcon />}
      {isConnected && <div className="text-[#007AFF] text-[13px]">✓</div>}
    </div>
  </button>
);

const WifiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#007AFF]">
    <path d="M8 3C10.8406 3 13.5542 4.08478 15.6673 6.12383L16 6.44721L14.8944 7.55279L14.5617 7.22941C12.7431 5.47423 10.4439 4.5 8 4.5C5.55614 4.5 3.25687 5.47423 1.43832 7.22941L1.10557 7.55279L0 6.44721L0.332676 6.12383C2.44576 4.08478 5.15936 3 8 3ZM8 6.75C9.79493 6.75 11.5019 7.41213 12.8358 8.68695L13.1685 9.00164L12.0685 10.1016L11.7358 9.78695C10.697 8.79402 9.37439 8.25 8 8.25C6.62561 8.25 5.303 8.79402 4.26421 9.78695L3.93146 10.1016L2.83146 9.00164L3.16421 8.68695C4.49807 7.41213 6.20507 6.75 8 6.75ZM8 10.5C8.86195 10.5 9.69354 10.7921 10.3761 11.3238L10.6761 11.5716L8 14.25L5.32385 11.5716L5.62385 11.3238C6.30646 10.7921 7.13805 10.5 8 10.5Z" />
  </svg>
);

const PersonalHotspotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#007AFF]">
    <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z" />
  </svg>
);

const SignalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#86868b]">
    <path d="M1 10h2v4H1v-4zm4-3h2v7H5V7zm4-3h2v10H9V4zm4-3h2v13h-2V1z" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#86868b]">
    <path d="M3 6h8v4H3V6zm-1-1v6h10V5H2zm11 1h1v4h-1V6z" />
  </svg>
);