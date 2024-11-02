import { Star, GitFork } from 'lucide-react';
import { type GitHubRepo } from '@/hooks/useGitHubData';

interface GitHubContentProps {
  isDarkMode: boolean;
  activeTab: string;
  repos: GitHubRepo[];
}

export const GitHubContent = ({ isDarkMode, activeTab, repos }: GitHubContentProps) => {
  const pinnedRepos = repos.filter(repo => 
    ['hooknhold', 'DSA'].includes(repo.name)
  );

  return (
    <div className={`px-8 py-6 ${isDarkMode ? 'text-white' : 'text-[#24292f]'}`}>
      {activeTab === 'overview' && (
        <div>
          {/* Pinned Repositories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-[#24292f]'}`}>
                Pinned
              </h2>
              <button className={`text-xs ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-[#58a6ff]' 
                  : 'text-[#57606a] hover:text-[#0969da]'
              }`}>
                Customize your pins
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {pinnedRepos.map((repo) => (
                <PinnedRepoCard key={repo.name} repo={repo} isDarkMode={isDarkMode} />
              ))}
            </div>
          </div>

          {/* Contribution Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold">
                616 contributions in the last year
              </h2>
              <button className={`text-xs hover:text-[#0969da] dark:hover:text-[#58a6ff]
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Contribution settings
              </button>
            </div>
            <ContributionGraph isDarkMode={isDarkMode} />
            <button className={`mt-2 text-xs hover:text-[#0969da] dark:hover:text-[#58a6ff]
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Learn how we count contributions
            </button>

            {/* Activity Overview */}
            <div className="mt-4">
              <ActivityOverview isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PinnedRepoCard = ({ repo, isDarkMode }: { repo: GitHubRepo; isDarkMode: boolean }) => (
  <div className={`p-4 rounded-lg border h-[120px] flex flex-col justify-between
    ${isDarkMode 
      ? 'border-[#30363d] bg-[#0d1117] hover:border-[#8b949e]' 
      : 'border-[#d0d7de] bg-white hover:border-[#0969da]'
    } transition-colors duration-200`}
  >
    <div>
      <div className="flex items-center gap-2">
        <a 
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isDarkMode ? 'text-[#58a6ff]' : 'text-[#0969da]'} text-sm font-semibold hover:underline`}
        >
          {repo.name}
        </a>
        <span className={`text-xs px-1.5 py-0.5 rounded-full
          ${isDarkMode ? 'bg-[#21262d] text-gray-400' : 'bg-[#eef1f6] text-[#57606a]'}`}>
          Public
        </span>
      </div>
      <p className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#57606a]'} line-clamp-2`}>
        {repo.description || (
          repo.name === 'hooknhold' 
            ? 'Open-source visual bookmark manager built with Next.js. Simple, and easy to set up'
            : 'Data Structures and Algorithms'
        )}
      </p>
    </div>

    <div className="flex items-center space-x-4 text-xs">
      <span className={isDarkMode ? 'text-gray-400' : 'text-[#57606a]'}>
        <span className="w-2.5 h-2.5 rounded-full inline-block mr-1"
          style={{ 
            backgroundColor: repo.name === 'hooknhold' ? '#3178c6' : '#00ADD8'
          }}
        />
        {repo.name === 'hooknhold' ? 'TypeScript' : 'Go'}
      </span>
      <a href="#" className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-[#58a6ff]' : 'text-[#57606a] hover:text-[#0969da]'}`}>
        <Star className="w-4 h-4 mr-1" />
        <span>{repo.name === 'hooknhold' ? '21' : '1'}</span>
      </a>
      <a href="#" className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-[#58a6ff]' : 'text-[#57606a] hover:text-[#0969da]'}`}>
        <GitFork className="w-4 h-4 mr-1" />
        <span>{repo.name === 'hooknhold' ? '1' : '0'}</span>
      </a>
    </div>
  </div>
);

const ContributionGraph = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className={`p-4 rounded-lg border
    ${isDarkMode ? 'border-[#30363d] bg-[#0d1117]' : 'border-[#d0d7de] bg-white'}`}
  >
    <div className="grid grid-cols-[repeat(51,_1fr)] gap-[3px]">
      {Array.from({ length: 357 }).map((_, i) => (
        <div
          key={i}
          className={`w-[10px] h-[10px] rounded-sm cursor-pointer
            ${isDarkMode 
              ? 'bg-[#2d333b] hover:bg-[#444c56]' 
              : 'bg-[#ebedf0] hover:bg-[#40c463]'
            }`}
          title="No contributions on this day"
        />
      ))}
    </div>
    <div className="mt-2 flex items-center justify-between text-xs text-[#57606a]">
      <span>Less</span>
      <div className="flex items-center gap-[3px]">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`w-[10px] h-[10px] rounded-sm ${
              isDarkMode
                ? level === 0 ? 'bg-[#2d333b]' : `bg-[#39d353]`
                : level === 0 ? 'bg-[#ebedf0]' : `bg-[#40c463]`
            }`}
          />
        ))}
      </div>
      <span>More</span>
    </div>
  </div>
);

const ActivityOverview = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className={`mt-4 p-4 rounded-lg border
    ${isDarkMode ? 'border-[#30363d] bg-[#0d1117]' : 'border-[#d0d7de] bg-white'}`}
  >
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs
        bg-[#1f6feb] text-white font-medium">
        @Hi
      </span>
    </div>
    <div className="mt-4">
      <div className="flex items-center gap-6">
        <div className="text-sm">
          <span className="font-semibold">2%</span>
          <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-[#57606a]'}`}>
            Code review
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">89%</span>
          <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-[#57606a]'}`}>
            Commits
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">9%</span>
          <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-[#57606a]'}`}>
            Pull requests
          </span>
        </div>
      </div>
    </div>
  </div>
);