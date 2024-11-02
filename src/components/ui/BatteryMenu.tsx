import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface BatteryMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const BatteryMenu = ({ isOpen, onClose, isDarkMode }: BatteryMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, onClose);
  const batteryLevel = 85; // This could be dynamic

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
            <div className="px-3 py-2 flex items-center space-x-3">
              <BatteryIcon level={batteryLevel} />
              <div className="flex-1">
                <div className={`text-[13px] font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Battery
                </div>
                <div className={`text-[12px] ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                  {batteryLevel}% remaining
                </div>
              </div>
            </div>

            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            <div className="py-1">
              <div className={`px-3 py-1 text-[13px] font-medium ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                Power Source
              </div>
              <PowerSourceItem
                label="Power Adapter"
                isActive={true}
                isDarkMode={isDarkMode}
              />
              <PowerSourceItem
                label="Battery (Built-in)"
                isActive={false}
                isDarkMode={isDarkMode}
              />
            </div>

            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            <div className="py-1">
              <BatteryOption
                label="Battery Percentage"
                isActive={true}
                isDarkMode={isDarkMode}
              />
              <BatteryOption
                label="Power Mode"
                value="Automatic"
                isDarkMode={isDarkMode}
              />
            </div>

            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            <div className="py-1">
              <button className={`w-full px-3 py-1 text-left
                ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
                transition-colors duration-150`}
              >
                <span className={`text-[13px] text-[#007AFF]`}>
                  Battery Preferences...
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PowerSourceItemProps {
  label: string;
  isActive: boolean;
  isDarkMode: boolean;
}

const PowerSourceItem = ({ label, isActive, isDarkMode }: PowerSourceItemProps) => (
  <div className={`px-3 py-1 flex items-center justify-between
    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
    transition-colors duration-150`}
  >
    <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
      {label}
    </span>
    {isActive && (
      <div className="text-[#007AFF] text-[13px]">✓</div>
    )}
  </div>
);

interface BatteryOptionProps {
  label: string;
  value?: string;
  isActive?: boolean;
  isDarkMode: boolean;
}

const BatteryOption = ({ label, value, isActive, isDarkMode }: BatteryOptionProps) => (
  <div className={`px-3 py-1 flex items-center justify-between
    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
    transition-colors duration-150`}
  >
    <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
      {label}
    </span>
    {value ? (
      <span className={`text-[13px] ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
        {value}
      </span>
    ) : isActive && (
      <div className="text-[#007AFF] text-[13px]">✓</div>
    )}
  </div>
);

const BatteryIcon = ({ level }: { level: number }) => (
  <div className="relative">
    <svg width="20" height="20" viewBox="0 0 16 16" className={level > 20 ? 'text-[#007AFF]' : 'text-red-500'}>
      <rect x="1" y="4" width="12" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="5" width={`${(level/100) * 10}`} height="6" fill="currentColor" />
      <path d="M14 7h1v2h-1V7z" fill="currentColor" />
    </svg>
  </div>
); 