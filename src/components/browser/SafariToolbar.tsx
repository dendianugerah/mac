import { ChevronLeft, ChevronRight, Share, Globe } from 'lucide-react';

interface SafariToolbarProps {
  isDarkMode: boolean;
  url: string;
  onMaximize?: () => void;
}

export const SafariToolbar = ({ isDarkMode, url }: SafariToolbarProps) => (
  <div className={`h-[46px] ${
    isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#f5f5f5]'
  } border-b ${
    isDarkMode ? 'border-[#3a3a3a]' : 'border-[#e5e5e5]'
  } flex items-center px-3 space-x-2`}>
    <div className="flex items-center space-x-1">
      <button className={`p-2 rounded-full transition-colors
        ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className={`p-2 rounded-full transition-colors
        ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    
    <div className={`flex-1 h-[32px] rounded-lg ${
      isDarkMode ? 'bg-[#1c1c1c]' : 'bg-white'
    } border ${
      isDarkMode ? 'border-[#3a3a3a]' : 'border-[#e5e5e5]'
    } flex items-center px-3 mx-2`}>
      <div className="flex items-center space-x-2 w-full">
        <Globe className="w-4 h-4 text-[#007AFF]" />
        <span className={`text-sm truncate ${
          isDarkMode ? 'text-white/90' : 'text-black/90'
        }`}>
          {url}
        </span>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <button className={`p-2 rounded-full transition-colors
        ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
        <Share className="w-4 h-4" />
      </button>
    </div>
  </div>
); 