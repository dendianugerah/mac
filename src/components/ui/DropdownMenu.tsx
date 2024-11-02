import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { ChevronRight } from 'lucide-react';

interface MenuItem {
  label: string;
  action: string;
  shortcut?: string;
  disabled?: boolean;
  submenu?: MenuItem[];
}

interface MenuSection {
  items: MenuItem[];
  withDivider?: boolean;
}

interface DropdownMenuProps {
  label: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  isDarkMode: boolean;
  sections: MenuSection[];
  isAppleMenu?: boolean;
}

export const DropdownMenu = ({ 
  label, 
  isOpen, 
  onClose, 
  onAction, 
  isDarkMode, 
  sections,
  isAppleMenu
}: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuTimer, setSubmenuTimer] = useState<NodeJS.Timeout | null>(null);
  useOnClickOutside(menuRef, onClose);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Handle keyboard shortcuts
      sections.forEach(section => {
        section.items.forEach(item => {
          if (item.shortcut) {
            const keys = item.shortcut.toLowerCase().split('');
            const isCmd = e.metaKey && keys.includes('⌘');
            const isShift = e.shiftKey && keys.includes('⇧');
            const isCtrl = e.ctrlKey && keys.includes('⌃');
            const isAlt = e.altKey && keys.includes('⌥');
            const key = e.key.toLowerCase();
            
            if (isCmd && 
                (!isShift || (isShift && keys.includes('⇧'))) && 
                (!isCtrl || (isCtrl && keys.includes('⌃'))) &&
                (!isAlt || (isAlt && keys.includes('⌥'))) && 
                keys.includes(key)) {
              e.preventDefault();
              if (!item.disabled) {
                onAction(item.action);
              }
            }
          }
        });
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, sections, onAction, onClose]);

  const handleMouseEnter = (action: string, hasSubmenu: boolean) => {
    if (submenuTimer) {
      clearTimeout(submenuTimer);
      setSubmenuTimer(null);
    }
    if (hasSubmenu) {
      setActiveSubmenu(action);
    }
  };

  const handleMouseLeave = (hasSubmenu: boolean) => {
    if (hasSubmenu) {
      const timer = setTimeout(() => {
        setActiveSubmenu(null);
      }, 100);
      setSubmenuTimer(timer);
    }
  };

  const MenuItemComponent = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => (
    <button
      onMouseEnter={() => handleMouseEnter(item.action, !!item.submenu)}
      onMouseLeave={() => handleMouseLeave(!!item.submenu)}
      onClick={() => !item.disabled && !item.submenu && onAction(item.action)}
      className={`w-full text-left px-3 py-[5px] text-[13px] flex justify-between items-center
        ${item.disabled 
          ? 'opacity-40 cursor-default' 
          : isDarkMode 
            ? 'hover:bg-[#0058d1] hover:text-white' 
            : 'hover:bg-[#0058d1] hover:text-white'
        } relative group`}
    >
      <span>{item.label}</span>
      <div className="flex items-center space-x-2">
        {item.shortcut && (
          <span className={`text-[12px] ${
            isDarkMode 
              ? 'text-gray-400 group-hover:text-white/80' 
              : 'text-gray-500 group-hover:text-white/90'
          }`}>
            {item.shortcut}
          </span>
        )}
        {item.submenu && (
          <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
        )}
      </div>

      {/* Submenu with improved animation and positioning */}
      <AnimatePresence>
        {item.submenu && activeSubmenu === item.action && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.98 }}
            transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
            onMouseEnter={() => setActiveSubmenu(item.action)}
            onMouseLeave={() => handleMouseLeave(true)}
            className={`absolute left-full top-0 ml-[1px] w-56 rounded-lg shadow-lg 
              ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white'} 
              ring-1 ring-black/[0.03] shadow-black/20 py-1`}
            style={{
              top: depth === 0 ? -8 : -4,
            }}
          >
            {item.submenu.map((subItem, idx) => (
              <MenuItemComponent key={idx} item={subItem} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );

  return (
    <div className="relative">
      <button
        onClick={() => onAction('toggle')}
        className={`h-full flex items-center px-4
          ${isOpen 
            ? isDarkMode 
              ? 'bg-[#0058d1] text-white' 
              : 'bg-[#0058d1] text-white'
            : isAppleMenu
              ? 'hover:bg-black/[0.06] active:bg-black/10'
              : 'hover:bg-black/[0.06] active:bg-black/10'
          }`}
      >
        {typeof label === 'string' ? (
          <span className="text-[13px]">{label}</span>
        ) : (
          label
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -2, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -2, scale: 0.98 }}
            transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
            className={`absolute left-0 mt-[6px] w-56 rounded-lg shadow-lg 
              ${isDarkMode ? 'bg-[#3a3a3a] text-white' : 'bg-white text-black'}
              ring-1 ring-black/[0.03] shadow-black/20 z-[9999] py-1`}
          >
            {sections.map((section, index) => (
              <div key={index}>
                {section.items.map((item, itemIndex) => (
                  <MenuItemComponent key={itemIndex} item={item} />
                ))}
                {section.withDivider && index < sections.length - 1 && (
                  <div className={`my-1 border-t ${isDarkMode ? 'border-[#4a4a4a]' : 'border-gray-200'}`} />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 