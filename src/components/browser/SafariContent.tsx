import { RefreshCw } from 'lucide-react';
import { GitHubHeader } from '../github/GitHubHeader';
import { GitHubProfile } from '../github/GitHubProfile';
import { GitHubTabs } from '../github/GitHubTabs';
import { GitHubContent } from '../github/GitHubContent';
import { formatDate } from '@/utils/dateFormatters';

interface SafariContentProps {
  isDarkMode: boolean;
  isLoading: boolean;
  userData: any;
  repos: any[];
  error: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const SafariContent = ({
  isDarkMode,
  isLoading,
  userData,
  repos,
  error,
  activeTab,
  setActiveTab
}: SafariContentProps) => (
  <div className={`flex-1 ${
    isDarkMode ? 'bg-[#0d1117]' : 'bg-white'
  }`}>
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
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                repoCount={userData.public_repos}
                starCount={37}
              />
              <GitHubContent 
                isDarkMode={isDarkMode} 
                activeTab={activeTab} 
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