import { Book, Package, Star, Folder } from 'lucide-react';

interface TabProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
}

interface GitHubTabsProps {
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  repoCount: number;
  starCount: number;
}

export const GitHubTabs = ({ isDarkMode, activeTab, setActiveTab, repoCount, starCount }: GitHubTabsProps) => {
  const tabs: TabProps[] = [
    { icon: <Book className="w-4 h-4" />, label: 'Overview' },
    { icon: <Book className="w-4 h-4" />, label: 'Repositories', count: repoCount },
    { icon: <Folder className="w-4 h-4" />, label: 'Projects' },
    { icon: <Package className="w-4 h-4" />, label: 'Packages' },
    { icon: <Star className="w-4 h-4" />, label: 'Stars', count: starCount }
  ];

  return (
    <div className={`border-b ${isDarkMode ? 'border-[#21262d]' : 'border-gray-200'}`}>
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label.toLowerCase())}
            className={`flex items-center px-4 py-3 border-b-2 transition-colors relative
              ${activeTab === tab.label.toLowerCase()
                ? `border-[#f78166] ${isDarkMode ? 'text-white' : 'text-black'}`
                : `border-transparent ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
              } hover:border-gray-300`}
          >
            <div className="flex items-center">
              {tab.icon}
              <span className="ml-2 text-sm font-medium">{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`ml-2 px-[6px] py-[2px] text-xs rounded-full leading-none
                  ${isDarkMode ? 'bg-[#30363d] text-gray-200' : 'bg-[#eef1f4] text-gray-600'}`}
                >
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 