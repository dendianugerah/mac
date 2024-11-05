import { RefreshCw, Search } from 'lucide-react';
import { GitHubHeader } from '../github/GitHubHeader';
import { GitHubProfile } from '../github/GitHubProfile';
import { GitHubTabs } from '../github/GitHubTabs';
import { GitHubContent } from '../github/GitHubContent';
import { formatDate } from '@/utils/dateFormatters';
import { type GitHubUser, type GitHubRepo } from '@/hooks/useGitHubData';
import { useState } from 'react';
import Image from 'next/image';

interface Tab {
  url: string;
  type: 'github' | 'web';
}

interface SafariContentProps {
  isDarkMode: boolean;
  isLoading: boolean;
  userData: GitHubUser | null;
  repos: GitHubRepo[];
  error: string | null;
  activeTab: Tab;
  type: 'github' | 'web';
}

const NewTabPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const favorites = [
    { 
      title: 'Favorites',
      items: [
        { 
          name: 'Apple',
          url: 'https://apple.com',
          icon: '/icons/safari/apple.svg',
          bgColor: '#000000'
        },
        { 
          name: 'iCloud',
          url: 'https://icloud.com',
          icon: '/icons/safari/icloud.svg',
          bgColor: '#3693F3'
        },
        { 
          name: 'App Store',
          url: 'https://apps.apple.com',
          icon: '/icons/safari/appstore.svg',
          bgColor: '#0D84F8'
        },
        { 
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/dendianugerah',
          icon: '/icons/safari/linkedin.png',
          bgColor: 'white'
        },
        { 
          name: 'Apple TV+',
          url: 'https://tv.apple.com',
          icon: '/icons/safari/tv.svg',
          bgColor: '#000000'
        },
        { 
          name: 'Apple Music',
          url: 'https://music.apple.com',
          icon: '/icons/safari/music.svg',
          bgColor: '#FA2D48'
        },
      ]
    },
    { 
      title: 'Frequently Visited',
      items: [
        { 
          name: 'GitHub',
          url: 'https://github.com',
          icon: '/icons/safari/github.png',
          bgColor: '#24292F'
        },
        { 
          name: 'Gmail',
          url: 'https://gmail.com',
          icon: '/icons/safari/gmail.svg',
          bgColor: '#EA4335'
        },
        { 
          name: 'YouTube',
          url: 'https://youtube.com',
          icon: '/icons/safari/youtube.svg',
          bgColor: '#FF0000'
        },
        { 
          name: 'Twitter',
          url: 'https://twitter.com',
          icon: '/icons/safari/twitter.svg',
          bgColor: '#1DA1F2'
        },
        { 
          name: 'LinkedIn',
          url: 'https://linkedin.com',
          icon: '/icons/safari/linkedin.svg',
          bgColor: '#0A66C2'
        },
        { 
          name: 'Netflix',
          url: 'https://netflix.com',
          icon: '/icons/safari/netflix.svg',
          bgColor: '#E50914'
        },
      ]
    }
  ];

  return (
    <div className={`flex-1 ${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-[#f6f6f6]'} relative`}>
      {/* Top Gradient */}
      <div className={`absolute top-0 left-0 right-0 h-[200px] pointer-events-none
        ${isDarkMode 
          ? 'bg-gradient-to-b from-[#1c1c1c] via-[#1c1c1c] to-transparent' 
          : 'bg-gradient-to-b from-[#f6f6f6] via-[#f6f6f6] to-transparent'}`} 
      />

      {/* Search Section */}
      <div className="w-full max-w-[680px] mx-auto pt-[120px] px-6 relative">
        {/* Siri Suggestions */}
        <div className={`absolute top-[76px] left-1/2 -translate-x-1/2
          text-[13px] font-medium
          ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
          Siri Suggestions
        </div>

        <div className={`h-[38px] rounded-lg 
          ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'}
          ${isDarkMode 
            ? 'shadow-[0_2px_8px_rgba(0,0,0,0.2)]' 
            : 'shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}
          flex items-center px-3.5 group
          focus-within:ring-[1.5px] ring-[#0061FF] transition-all`}>
          <Search className={`w-[14px] h-[14px] mr-2.5
            ${isDarkMode ? 'text-white/40' : 'text-black/40'}
            group-focus-within:text-[#0061FF]
            transition-colors duration-150`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or enter website name"
            className={`w-full bg-transparent text-[13px] outline-none
              ${isDarkMode 
                ? 'text-white/90 placeholder:text-white/40' 
                : 'text-black/90 placeholder:text-black/40'}
              font-medium`}
          />
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="w-full max-w-[840px] mx-auto px-6 mt-14">
        {favorites.map((section) => (
          <div key={section.title} className="mb-10 last:mb-0">
            <h2 className={`text-[11px] font-semibold mb-3 px-1.5
              ${isDarkMode ? 'text-white/50' : 'text-[#666666]'}`}>
              {section.title}
            </h2>
            <div className="grid grid-cols-6 gap-4">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-2 rounded-xl
                    transition-all duration-150 group relative
                    ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                >
                  <div className={`w-[76px] h-[76px] mb-2.5 rounded-[20px]
                    flex items-center justify-center relative
                    transition-transform duration-200
                    group-hover:scale-105 group-active:scale-95
                    ${isDarkMode 
                      ? 'shadow-[0_2px_8px_rgba(0,0,0,0.3)]' 
                      : 'shadow-[0_2px_8px_rgba(0,0,0,0.1)]'}`}
                    style={{ backgroundColor: item.bgColor }}>
                    <Image
                      src={item.icon}
                      width={42}
                      height={42}
                      alt={item.name}
                      className="object-contain"
                    />
                    <div className={`absolute inset-0 rounded-[20px]
                      ${isDarkMode 
                        ? 'shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.1)]' 
                        : 'shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.1)]'}`} 
                    />
                  </div>
                  <span className={`text-[11px] text-center leading-tight
                    ${isDarkMode ? 'text-white/80' : 'text-[#333333]'}
                    font-medium`}>
                    {item.name}
                  </span>

                  {/* Edit button overlay */}
                  <button className={`absolute top-1 right-1 w-5 h-5
                    rounded-full opacity-0 group-hover:opacity-100
                    transition-opacity duration-150
                    ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'}
                    ${isDarkMode 
                      ? 'hover:bg-[#333333]' 
                      : 'hover:bg-[#f5f5f5]'}`}>
                    <svg viewBox="0 0 16 16" className={`w-3 h-3 m-auto
                      ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      <path fill="currentColor" d="M3 8.5v2h2l6-6-2-2-6 6zm9-6.5l-1-1-1 1 2 2 1-1-1-1z"/>
                    </svg>
                  </button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SafariContent = ({
  isDarkMode,
  isLoading,
  userData,
  repos,
  error,
  activeTab,
  type
}: SafariContentProps) => {
  const [currentGitHubTab, setCurrentGitHubTab] = useState('overview');

  if (type === 'web') {
    if (activeTab.url === 'https://www.google.com') {
      return <NewTabPage isDarkMode={isDarkMode} />;
    }

    return (
      <div className="flex-1">
        <iframe
          src={activeTab.url}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`flex-1 ${isDarkMode ? 'bg-[#0d1117]' : 'bg-white'}`}>
      <div className="h-full overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        ) : userData ? (
          <div className="min-h-full">
            <GitHubHeader isDarkMode={isDarkMode} userData={userData} />
            <GitHubProfile 
              isDarkMode={isDarkMode} 
              userData={userData} 
              formatDate={formatDate}
            >
              <div className="flex flex-col">
                <GitHubTabs 
                  isDarkMode={isDarkMode} 
                  activeTab={currentGitHubTab}
                  setActiveTab={setCurrentGitHubTab}
                  repoCount={userData.public_repos}
                  starCount={37}
                />
                <GitHubContent 
                  isDarkMode={isDarkMode} 
                  activeTab={currentGitHubTab}
                  repos={repos} 
                />
              </div>
            </GitHubProfile>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            {error || 'Failed to load GitHub profile'}
          </div>
        )}
      </div>
    </div>
  );
}; 