import React, { useState } from 'react';
import { Wifi, Volume2, Search, Moon, Sun, WifiOff, Github } from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { WifiMenu } from '@/components/ui/WifiMenu';
import { AnimatePresence } from 'framer-motion';
import { AppleMenu } from '@/components/ui/AppleMenu';
import { Safari } from '@/components/browser/Safari';
import { BatteryMenu } from '@/components/ui/BatteryMenu';
import { VolumeMenu } from '@/components/ui/VolumeMenu';
import { SearchMenu as SpotlightMenu } from '@/components/ui/SearchMenu';
import { createPortal } from 'react-dom';

interface MenuBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isFileMenuOpen: boolean;
  setIsFileMenuOpen: (isOpen: boolean) => void;
  handleFileAction: (action: string) => void;
  currentTime: Date;
  onSleep: () => void;
  onLock: () => void;
  onOpenGithub?: () => void;
}

interface MenuItem {
  label: string;
  action: string;
  shortcut?: string;
}

interface MenuSection {
  items: MenuItem[];
  withDivider?: boolean;
}

type MenuSections = {
  [key: string]: MenuSection[];
}

const StatusIcons = ({ isDarkMode, toggleDarkMode, currentTime }: Pick<MenuBarProps, 'isDarkMode' | 'toggleDarkMode' | 'currentTime'>) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const [isGithubOpen, setIsGithubOpen] = useState(false);

  return (
    <div className="flex items-center h-full">
      <div className="flex items-center space-x-[8px] px-[8px] h-full">
        <SearchMenu isDarkMode={isDarkMode} />
        <WifiStatus isDarkMode={isDarkMode} />
        <BatteryStatus isDarkMode={isDarkMode} />
        <VolumeControl isDarkMode={isDarkMode} />
        <button 
          onClick={() => setIsGithubOpen(true)}
          className="hover:bg-black/10 dark:hover:bg-white/10 p-[2px] rounded-sm"
        >
          <Github className="w-[14px] h-[14px]" />
        </button>
        <button 
          onClick={toggleDarkMode} 
          className="hover:bg-black/10 dark:hover:bg-white/10 p-[2px] rounded-sm"
        >
          {isDarkMode ? (
            <Sun className="w-[14px] h-[14px]" />
          ) : (
            <Moon className="w-[14px] h-[14px]" />
          )}
        </button>
        <div className={`text-[12px] font-medium tracking-[-0.01em] flex items-center space-x-[6px]
          ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}
        >
          <span>{dateFormatter.format(currentTime)}</span>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Safari Browser */}
        <AnimatePresence>
          {isGithubOpen && (
            <Safari
              isDarkMode={isDarkMode}
              url="https://github.com/dendianugerah"
              onClose={() => setIsGithubOpen(false)}
              isMaximized={false}
              onMaximize={() => {}}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


const WifiStatus = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-[4px]
          transition-colors duration-150"
      >
        {isConnected ? (
          <Wifi className="w-[16px] h-[16px]" />
        ) : (
          <WifiOff className="w-[16px] h-[16px]" />
        )}
      </button>
      <WifiMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isDarkMode={isDarkMode}
        isConnected={isConnected}
        onToggleConnection={toggleConnection}
      />
    </div>
  );
};

const VolumeControl = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-[4px]
          transition-colors duration-150"
      >
        <Volume2 className="w-[16px] h-[16px]" />
      </button>
      <VolumeMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

const BatteryStatus = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const batteryLevel = 85;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-[4px]
          transition-colors duration-150 flex items-center"
      >
        <div className="relative">
          <svg width="16" height="16" viewBox="0 0 16 16" className={batteryLevel > 20 ? 'text-current' : 'text-red-500'}>
            <rect x="1" y="4" width="12" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
            <rect x="2" y="5" width={`${(batteryLevel/100) * 10}`} height="6" fill="currentColor" />
            <path d="M14 7h1v2h-1V7z" fill="currentColor" />
          </svg>
        </div>
      </button>
      <BatteryMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

const SearchMenu = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`p-1 rounded-[4px] transition-colors duration-150
          ${isDarkMode 
            ? 'hover:bg-white/10 active:bg-white/15' 
            : 'hover:bg-black/5 active:bg-black/10'}`}
      >
        <Search className="w-[16px] h-[16px]" />
      </button>
      {createPortal(
        <SpotlightMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          isDarkMode={isDarkMode}
        />,
        document.body
      )}
    </>
  );
};

const menuSections: MenuSections = {
  file: [
    {
      items: [
        { label: 'New Note', action: 'new', shortcut: '⌘N' },
        { label: 'Open...', action: 'open', shortcut: '⌘O' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Save', action: 'save', shortcut: '⌘S' },
        { label: 'Save As...', action: 'saveAs', shortcut: '⇧⌘S' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Delete Note', action: 'delete', shortcut: '⌫' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Close', action: 'close', shortcut: '⌘W' },
      ]
    }
  ],
  edit: [
    {
      items: [
        { label: 'Undo', action: 'undo', shortcut: '⌘Z' },
        { label: 'Redo', action: 'redo', shortcut: '⇧⌘Z' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Cut', action: 'cut', shortcut: '⌘X' },
        { label: 'Copy', action: 'copy', shortcut: '⌘C' },
        { label: 'Paste', action: 'paste', shortcut: '⌘V' },
      ]
    }
  ],
  view: [
    {
      items: [
        { label: 'Show Sidebar', action: 'toggleSidebar', shortcut: '⌘\\' },
        { label: 'Show Notes List', action: 'toggleNotesList', shortcut: '⇧⌘1' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Enter Full Screen', action: 'toggleFullscreen', shortcut: '⌃⌘F' },
      ]
    }
  ],
  format: [
    {
      items: [
        { label: 'Bold', action: 'bold', shortcut: '⌘B' },
        { label: 'Italic', action: 'italic', shortcut: '⌘I' },
        { label: 'Underline', action: 'underline', shortcut: '⌘U' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Align Left', action: 'alignLeft' },
        { label: 'Center', action: 'alignCenter' },
        { label: 'Align Right', action: 'alignRight' },
      ]
    }
  ]
} as const;

export const MenuBar = ({
  isDarkMode,
  toggleDarkMode,
  handleFileAction,
  currentTime,
  onSleep,
  onLock,
}: MenuBarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuAction = (menu: string, action: string) => {
    if (action === 'toggle') {
      setActiveMenu(activeMenu === menu ? null : menu);
      return;
    }
    
    switch (action) {
      case 'sleep':
        onSleep();
        break;
      case 'lock':
        onLock();
        break;
      default:
        handleFileAction(action);
    }
    setActiveMenu(null);
  };

  const menuItems = ['File', 'Edit', 'View', 'Format'] as const;

  return (
    <div className={`h-[25px] ${
      isDarkMode 
        ? 'bg-[#1c1c1c]/90'
        : 'bg-[#fbfbfb]/90'
    } backdrop-blur-[20px] border-b ${
      isDarkMode 
        ? 'border-[#424242]/50'
        : 'border-[#d1d1d6]/50'
    } flex items-center justify-between relative z-[999]`}>
      <div className="flex items-center h-full">
        <AppleMenu 
          isDarkMode={isDarkMode}
          onSleep={onSleep}
          onLock={onLock}
        />
        <div className="flex items-center h-full">
          <div className="pl-[8px] pr-[10px] flex items-center space-x-[6px] h-full">
            <span className={`font-semibold text-[13px] tracking-[-0.01em] ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Notes
            </span>
          </div>
          <div className="flex items-center h-full space-x-[2px]">
            {menuItems.map((menu) => (
              <DropdownMenu
                key={menu}
                label={menu}
                isOpen={activeMenu === menu.toLowerCase()}
                onClose={() => setActiveMenu(null)}
                onAction={(action) => handleMenuAction(menu.toLowerCase(), action)}
                isDarkMode={isDarkMode}
                sections={menuSections[menu.toLowerCase() as keyof typeof menuSections]}
              />
            ))}
          </div>
        </div>
      </div>
      <StatusIcons
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentTime={currentTime}
      />
    </div>
  );
};