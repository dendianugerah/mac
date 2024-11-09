import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { AboutMac } from '@/components/system/AboutMac';
import { SystemSettings } from '@/components/system/SystemSettings';

interface AppleMenuProps {
  isDarkMode: boolean;
  onSleep: () => void;
  onLock: () => void;
}

export const AppleMenu = ({ isDarkMode, onSleep, onLock }: AppleMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setIsOpen(false));

  const menuItems = [
    { label: 'About This Mac', action: 'about' },
    { type: 'separator' as const, label: '', action: '' },
    { label: 'System Settings...', action: 'settings', shortcut: '⌘,' },
    { type: 'separator' as const, label: '', action: '' },
    { label: 'Sleep', action: 'sleep', shortcut: '⌥⌘P' },
    { label: 'Restart...', action: 'restart' },
    { label: 'Shut Down...', action: 'shutdown' },
    { type: 'separator' as const, label: '', action: '' },
    { label: 'Lock Screen', action: 'lock', shortcut: '⌃⌘Q' },
    { label: 'Log Out...', action: 'logout', shortcut: '⇧⌘Q' },
  ];

  const handleAction = (action: string) => {
    switch (action) {
      case 'about':
        setShowAbout(true);
        break;
      case 'settings':
        setShowSettings(true);
        break;
      case 'sleep':
        onSleep();
        break;
      case 'lock':
        onLock();
        break;
      default:
        console.log(`${action} clicked`);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-full flex items-center px-4
            ${isOpen 
              ? isDarkMode 
                ? 'bg-[#0058d1] text-white' 
                : 'bg-[#0058d1] text-white'
              : 'hover:bg-black/[0.06] active:bg-black/10'
            }`}
        >
          <AppleLogo />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
              className={`absolute left-0 mt-[6px] w-[244px] rounded-lg shadow-lg
                ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'}
                border ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]/50'}
                shadow-xl shadow-black/20 z-[9999] py-1`}
            >
              {menuItems.map((item, index) => (
                item.type === 'separator' ? (
                  <div 
                    key={index} 
                    className={`my-1 border-t ${
                      isDarkMode ? 'border-[#3a3a3a]' : 'border-gray-200'
                    }`} 
                  />
                ) : (
                  <button
                    key={index}
                    onClick={() => handleAction(item.action)}
                    className={`w-full px-4 py-[3px] text-[13px] text-left flex items-center justify-between
                      ${isDarkMode 
                        ? 'hover:bg-[#0058d1] hover:text-white' 
                        : 'hover:bg-[#0058d1] hover:text-white'
                      } group`}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className={`text-[12px] ${
                        isDarkMode 
                          ? 'text-gray-400 group-hover:text-white/80' 
                          : 'text-gray-500 group-hover:text-white/90'
                      }`}>
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AboutMac 
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        isDarkMode={isDarkMode}
      />
      <SystemSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

const AppleLogo = () => (
  <svg className="w-[13px] h-[13px] opacity-90" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
  </svg>
); 