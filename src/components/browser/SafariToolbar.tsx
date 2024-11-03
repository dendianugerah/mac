import { ChevronLeft, ChevronRight, Share, Globe } from 'lucide-react';

interface SafariToolbarProps {
  isDarkMode: boolean;
  url: string;
  onUrlChange: (newUrl: string) => void;
}

export const SafariToolbar = ({ isDarkMode, url, onUrlChange }: SafariToolbarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let newUrl = e.currentTarget.value;
      if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
        newUrl = `https://${newUrl}`;
      }
      onUrlChange(newUrl);
    }
  };

  return (
    <div className={`h-[36px] relative
      ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#f6f6f6]'}
      flex items-center px-1.5 space-x-1 border-b
      ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d1]'}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 
        ${isDarkMode 
          ? 'bg-gradient-to-b from-[#2a2a2a] to-[#282828]' 
          : 'bg-gradient-to-b from-[#f6f6f6] to-[#f2f2f2]'}`} 
      />

      <div className="flex items-center space-x-[1px] relative">
        <button className={`w-6 h-6 rounded-full flex items-center justify-center
          ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
          transition-all duration-150 active:scale-90 disabled:opacity-30`}
          disabled>
          <ChevronLeft className="w-3 h-3 opacity-40" />
        </button>
        <button className={`w-6 h-6 rounded-full flex items-center justify-center
          ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
          transition-all duration-150 active:scale-90 disabled:opacity-30`}
          disabled>
          <ChevronRight className="w-3 h-3 opacity-40" />
        </button>
      </div>
      
      <div className={`flex-1 h-[22px] rounded-[4px] relative
        ${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-white'}
        border ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d1]'}
        flex items-center px-1.5 mx-1 group
        focus-within:ring-1 focus-within:ring-[#0061FF]
        transition-all duration-150
        ${isDarkMode 
          ? 'shadow-[0_1px_0_rgba(255,255,255,0.05)]' 
          : 'shadow-[0_1px_0_rgba(0,0,0,0.05)]'}`}>
        <Globe className={`w-[10px] h-[10px] mr-1 flex-shrink-0
          ${isDarkMode ? 'text-white/30' : 'text-black/30'}
          group-focus-within:text-[#0061FF]
          transition-colors duration-150`} />
        <input
          type="text"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent text-[11px] outline-none 
            ${isDarkMode ? 'text-white/90' : 'text-black/90'}
            placeholder:text-opacity-40 select-all`}
          placeholder="Search or enter website name"
        />
        
        {/* Reader View button */}
        <button className={`px-1 py-0.5 rounded transition-colors
          ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
          <svg viewBox="0 0 16 16" className={`w-3 h-3
            ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>
            <path fill="currentColor" d="M2 4h12v2H2V4zm0 3h8v2H2V7zm0 3h12v2H2v-2z"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-1 relative">
        <button className={`w-6 h-6 rounded-full flex items-center justify-center
          ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
          transition-all duration-150 active:scale-90`}>
          <Share className="w-3 h-3 opacity-40" />
        </button>
        
        {/* Add Tab List button */}
        <button className={`w-6 h-6 rounded-full flex items-center justify-center
          ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
          transition-all duration-150 active:scale-90`}>
          <svg viewBox="0 0 16 16" className="w-3 h-3 opacity-40">
            <path fill="currentColor" d="M2 4h2v2H2V4zm4 0h8v2H6V4zm-4 3h2v2H2V7zm4 0h8v2H6V7zm-4 3h2v2H2v-2zm4 0h8v2H6v-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}; 