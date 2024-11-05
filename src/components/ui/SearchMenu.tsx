import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Mail, Calendar, FileText, Image, MessageSquare } from 'lucide-react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { createPortal } from 'react-dom';

interface SearchMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const SearchMenu = ({ isOpen, onClose, isDarkMode }: SearchMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(menuRef, onClose);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const suggestions = [
    { type: 'app', name: 'Safari', icon: <Globe className="w-4 h-4" />, category: 'Applications' },
    { type: 'app', name: 'Messages', icon: <MessageSquare className="w-4 h-4" />, category: 'Applications' },
    { type: 'app', name: 'Mail', icon: <Mail className="w-4 h-4" />, category: 'Applications' },
    { type: 'app', name: 'Calendar', icon: <Calendar className="w-4 h-4" />, category: 'Applications' },
    { type: 'file', name: 'Recent Document.pdf', icon: <FileText className="w-4 h-4" />, category: 'Documents' },
    { type: 'file', name: 'Screenshot 2024-03-20', icon: <Image className="w-4 h-4" />, category: 'Images' },
  ].filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Escape':
        onClose();
        break;
      case 'Enter':
        if (suggestions[selectedIndex]) {
          // Handle selection
          onClose();
        }
        break;
    }
  };

  const groupedSuggestions = suggestions.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof suggestions>);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={`fixed inset-0 ${isDarkMode ? 'bg-black/30' : 'bg-black/20'} backdrop-blur-sm z-[99999]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] rounded-xl
              ${isDarkMode ? 'bg-[#1e1e1e]/90' : 'bg-[#ffffff]/90'} 
              backdrop-blur-xl
              ${isDarkMode 
                ? 'shadow-[0_0_0_0.5px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.45)]' 
                : 'shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_8px_40px_rgba(0,0,0,0.12)]'}
              z-[100000]`}
            onKeyDown={handleKeyDown}
          >
            <div className="p-3">
              <div className="flex items-center space-x-3 px-3">
                <Search className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Spotlight Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 bg-transparent border-none outline-none text-[16px]
                    ${isDarkMode ? 'text-white placeholder-white/40' : 'text-black placeholder-black/40'}`}
                />
                <div className={`flex items-center justify-center w-5 h-5 rounded border text-[11px] font-medium
                  ${isDarkMode ? 'border-white/20 text-white/40' : 'border-black/20 text-black/40'}`}
                >
                  ⌘
                </div>
              </div>
            </div>

            <div className={`h-[1px] mx-3 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            <div className="py-2 max-h-[400px] overflow-y-auto">
              {Object.entries(groupedSuggestions).map(([category, items], categoryIndex) => (
                <div key={category} className={categoryIndex > 0 ? 'mt-2' : ''}>
                  <div className={`px-5 py-1 text-[11px] font-medium
                    ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                    {category}
                  </div>
                  {items.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <button
                        key={index}
                        className={`w-full px-5 py-1.5 flex items-center space-x-3
                          ${isSelected 
                            ? isDarkMode 
                              ? 'bg-white/10' 
                              : 'bg-black/5'
                            : 'hover:bg-white/5'}
                          transition-colors duration-75`}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full
                          ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                          {item.icon}
                        </div>
                        <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={`h-[1px] mx-3 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            <div className="p-2">
              <div className={`px-3 py-1 text-[11px] ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                Press Return to search in Finder
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}; 