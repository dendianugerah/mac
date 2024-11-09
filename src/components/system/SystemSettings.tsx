import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { 
  User, Wifi, Bell, Lock, 
  Globe2, Keyboard, Mouse, Battery,
  Network, Shield, Users, Download,
  Clock, Info
} from 'lucide-react';
import { WindowTitleBar } from '@/components/window/WindowTitleBar';

interface SystemSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const settingsCategories = [
  { 
    title: 'Personal',
    items: [
      { icon: User, label: 'Profile', color: '#007AFF' },
      { icon: Globe2, label: 'Language & Region', color: '#32A852' },
      { icon: Bell, label: 'Notifications', color: '#FF3B30' },
    ]
  },
  {
    title: 'System',
    items: [
      { icon: Lock, label: 'Lock Screen', color: '#007AFF' },
      { icon: Battery, label: 'Battery', color: '#34C759' },
      { icon: Shield, label: 'Privacy & Security', color: '#AF52DE' },
    ]
  },
  {
    title: 'Input & Output',
    items: [
      { icon: Keyboard, label: 'Keyboard', color: '#FF9500' },
      { icon: Mouse, label: 'Mouse', color: '#FF2D55' },
    ]
  },
  {
    title: 'Network',
    items: [
      { icon: Wifi, label: 'Wi-Fi', color: '#007AFF' },
      { icon: Network, label: 'Network', color: '#FF9500' },
    ]
  },
  {
    title: 'Other',
    items: [
      { icon: Users, label: 'Users & Groups', color: '#FF3B30' },
      { icon: Download, label: 'Software Update', color: '#32A852' },
      { icon: Clock, label: 'Time Machine', color: '#5856D6' },
      { icon: Info, label: 'About', color: '#007AFF' },
    ]
  }
];

export const SystemSettings = ({ isOpen, onClose, isDarkMode }: SystemSettingsProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const { position, startDragging } = useWindowDrag(false);
  const [selectedCategory, setSelectedCategory] = useState('Profile');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = searchQuery
    ? settingsCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : settingsCategories;

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
            className={`w-[780px] h-[520px] rounded-xl shadow-2xl overflow-hidden
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
              title="System Settings"
              className="h-11"
            />

            {/* Content */}
            <div className="flex h-[calc(100%-2.75rem)]">
              {/* Sidebar */}
              <div className={`w-[220px] flex flex-col border-r
                ${isDarkMode 
                  ? 'bg-[#2a2a2a] border-[#3a3a3a]' 
                  : 'bg-[#f5f5f7] border-gray-200'}`}
              >
                {/* Search with icon */}
                <div className="p-2">
                  <div className={`relative rounded-md shadow-sm
                    ${isDarkMode ? 'bg-[#1c1c1e]' : 'bg-white/80'}`}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className={`h-4 w-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Settings"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-3 py-1.5 rounded-md text-sm
                        ${isDarkMode 
                          ? 'bg-[#1c1c1e] text-white placeholder:text-white/40 border-transparent' 
                          : 'bg-white/80 text-black placeholder:text-black/40 border border-gray-200/80'}
                        focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                {/* Categories with smooth animations */}
                <div className="flex-1 overflow-y-auto px-2 py-1">
                  <AnimatePresence>
                    {filteredCategories.map((category) => (
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4"
                      >
                        <div className={`px-2 py-1 text-[11px] font-medium
                          ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                          {category.title}
                        </div>
                        {category.items.map((item) => (
                          <motion.button
                            key={item.label}
                            onClick={() => setSelectedCategory(item.label)}
                            className={`w-full px-2 py-1 rounded-md flex items-center space-x-2 text-sm
                              ${selectedCategory === item.label
                                ? isDarkMode 
                                  ? 'bg-[#0058d1] text-white' 
                                  : 'bg-[#0058d1] text-white'
                                : isDarkMode
                                  ? 'hover:bg-white/10 text-white/90'
                                  : 'hover:bg-black/5 text-black/90'
                              }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${item.color}20` }}>
                              <item.icon 
                                className="w-4 h-4"
                                style={{ color: item.color }}
                              />
                            </div>
                            <span>{item.label}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Main Content Area with animations */}
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex-1 p-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}
              >
                <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
                <div className={`rounded-lg p-4 
                  ${isDarkMode ? 'bg-[#1c1c1e]' : 'bg-white/60'}`}>
                  <p className="text-sm opacity-60">
                    {selectedCategory} settings content will be displayed here.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 