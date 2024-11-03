import { Plus, X } from 'lucide-react';

interface Tab {
  id: string;
  url: string;
  title: string;
  type: 'github' | 'web';
}

interface SafariTabsProps {
  tabs: Tab[];
  activeTabId: string;
  isDarkMode: boolean;
  onTabClick: (tabId: string) => void;
  onAddTab: () => void;
  onCloseTab: (tabId: string) => void;
}

export const SafariTabs = ({
  tabs,
  activeTabId,
  isDarkMode,
  onTabClick,
  onAddTab,
  onCloseTab
}: SafariTabsProps) => {
  return (
    <div className={`h-[29px] flex items-center px-1 relative
      ${isDarkMode 
        ? 'bg-[#2a2a2a] border-b border-[#3a3a3a]' 
        : 'bg-[#e7e7e7] border-b border-[#d1d1d1]'}`}
    >
      {/* Background gradient for inactive tabs */}
      <div className={`absolute inset-0 
        ${isDarkMode 
          ? 'bg-gradient-to-b from-[#2a2a2a] to-[#282828]' 
          : 'bg-gradient-to-b from-[#e7e7e7] to-[#e3e3e3]'}`} 
      />

      <div className="flex-1 flex items-center h-full relative">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`group relative h-[28px] min-w-[100px] max-w-[160px]
              flex items-center px-2.5 select-none
              ${tab.id === activeTabId
                ? isDarkMode 
                  ? 'bg-[#1e1e1e]' 
                  : 'bg-white'
                : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }
              ${tab.id === activeTabId 
                ? 'rounded-t-[4px]' 
                : index === 0 
                  ? 'rounded-tl-[4px]' 
                  : ''}`}
            onClick={() => onTabClick(tab.id)}
          >
            {/* Tab separator */}
            {tab.id !== activeTabId && index > 0 && (
              <div className={`absolute left-0 top-2 bottom-2 w-[1px]
                ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#d1d1d1]'}`} />
            )}
            
            {/* Active tab indicator line and borders */}
            {tab.id === activeTabId && (
              <>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#0061FF]" />
                <div className={`absolute bottom-[-1px] left-0 right-0 h-[1px] 
                  ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`} />
                <div className={`absolute top-0 bottom-[-1px] left-0 w-[1px]
                  ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#d1d1d1]'}`} />
                <div className={`absolute top-0 bottom-[-1px] right-0 w-[1px]
                  ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#d1d1d1]'}`} />
                
                {/* Active tab shadow */}
                <div className="absolute -top-1 left-0 right-0 h-[1px] 
                  bg-gradient-to-b from-black/5 to-transparent" />
              </>
            )}
            
            <span className={`text-[11px] font-medium truncate flex-1 relative
              ${isDarkMode 
                ? tab.id === activeTabId ? 'text-white/90' : 'text-white/60'
                : tab.id === activeTabId ? 'text-black/90' : 'text-black/60'
              }
              transition-colors duration-150`}>
              {tab.title}
            </span>
            <button
              className={`ml-1 p-0.5 rounded-full opacity-0 group-hover:opacity-100
                transition-all duration-150 
                ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}
                active:scale-90`}
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
            >
              <X className="w-[9px] h-[9px]" />
            </button>
          </div>
        ))}

        {/* Add new tab button integrated in tab bar */}
        <button
          className={`relative h-[28px] w-[28px] flex items-center justify-center
            transition-all duration-150 rounded-t-[4px]
            ${isDarkMode 
              ? 'hover:bg-white/[0.03]' 
              : 'hover:bg-black/[0.03]'}`}
          onClick={onAddTab}
        >
          <Plus className={`w-[12px] h-[12px]
            ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          
          {/* Left separator */}
          <div className={`absolute left-0 top-2 bottom-2 w-[1px]
            ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#d1d1d1]'}`} />
        </button>
      </div>

      {/* Right side buttons container */}
      <div className="flex items-center space-x-1 relative px-1">
        {/* Show All Tabs button */}
        <button className={`w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-150
          ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
          active:scale-95`}>
          <svg viewBox="0 0 16 16" className={`w-3.5 h-3.5
            ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            <path fill="currentColor" 
              d="M2 3h2v2H2V3zm4 0h8v2H6V3zM2 7h2v2H2V7zm4 0h8v2H6V7zm-4 4h2v2H2v-2zm4 0h8v2H6v-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}; 