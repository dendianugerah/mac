import { Bell, Plus, ChevronDown } from 'lucide-react';
import { type GitHubUser } from '@/hooks/useGitHubData';

interface GitHubHeaderProps {
  isDarkMode: boolean;
  userData: GitHubUser;
}

export const GitHubHeader = ({ isDarkMode, userData }: GitHubHeaderProps) => (
  <div className={`h-[62px] ${
    isDarkMode ? 'bg-[#0d1117]' : 'bg-white'
  } border-b ${
    isDarkMode ? 'border-[#21262d]' : 'border-[#d0d7de]'
  } flex items-center px-8`}>
    <div className="flex items-center flex-1">
      <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" className={`${isDarkMode ? 'text-white' : 'text-black'} fill-current`}>
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
      </svg>
      <div className="ml-4 flex items-center space-x-4">
        <div className={`relative flex items-center h-[30px] w-[272px] rounded-md
          ${isDarkMode ? 'bg-[#0d1117]' : 'bg-[#f6f8fa]'} 
          border ${isDarkMode ? 'border-[#30363d]' : 'border-[#d0d7de]'}`}
        >
          <input 
            type="text"
            placeholder="Search or jump to..."
            className={`w-full h-full px-3 text-sm rounded-md
              ${isDarkMode 
                ? 'bg-[#0d1117] text-white placeholder-gray-400' 
                : 'bg-[#f6f8fa] text-[#24292f] placeholder-[#57606a]'
              } focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-transparent`}
          />
          <div className={`absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-xs border
            ${isDarkMode 
              ? 'border-[#30363d] text-gray-400' 
              : 'border-gray-300 text-gray-600'}`}
          >
            /
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          {['Pull requests', 'Issues', 'Codespaces', 'Marketplace', 'Explore'].map((item) => (
            <a 
              key={item} 
              href="#"
              className={`text-sm font-semibold hover:text-[#0969da]
                ${isDarkMode ? 'text-white' : 'text-[#24292f]'}`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <button className={`p-1 rounded-full relative
        ${isDarkMode ? 'hover:bg-[#30363d]' : 'hover:bg-gray-100'}`}>
        <Bell className="w-4 h-4" />
        <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full
          ${isDarkMode ? 'bg-[#1f6feb]' : 'bg-[#0969da]'}`} />
      </button>
      <button className={`flex items-center space-x-1 p-1 rounded-md
        ${isDarkMode ? 'hover:bg-[#30363d]' : 'hover:bg-gray-100'}`}>
        <Plus className="w-4 h-4" />
        <ChevronDown className="w-3 h-3" />
      </button>
      <button className={`flex items-center space-x-1 p-1 rounded-md
        ${isDarkMode ? 'hover:bg-[#30363d]' : 'hover:bg-gray-100'}`}>
        <img 
          src={userData?.avatar_url}
          alt="Profile"
          className="w-5 h-5 rounded-full"
        />
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  </div>
); 