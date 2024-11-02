import { Users, MapPin, Link2, Mail, Star, Building, Clock } from 'lucide-react';

interface GitHubProfileProps {
  isDarkMode: boolean;
  userData: any;
  formatDate: (date: string) => string;
  children?: React.ReactNode;
}

export const GitHubProfile = ({ isDarkMode, userData, formatDate, children }: GitHubProfileProps) => (
  <div className="flex">
    {/* Left Column - Profile Info */}
    <div className="w-[296px] flex-shrink-0 px-8 pt-8">
      <div className="sticky top-[16px]">
        <div className="relative group">
          <img 
            src={userData.avatar_url} 
            alt={userData.name}
            className="w-full aspect-square rounded-full border-[0.5px] border-gray-300 dark:border-gray-700"
          />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className={`absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100
              ${isDarkMode ? 'bg-[#0d1117]/80' : 'bg-black/50'}`}>
              <span className="text-sm">Change avatar</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-[24px] font-semibold leading-[1.25] break-words">
            {userData.name}
          </h1>
          <div className="text-[20px] font-light leading-[24px] text-gray-500 dark:text-gray-400 break-words">
            {userData.login}
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full px-3 py-[5px] text-sm font-medium rounded-md
            bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[rgba(31,35,40,0.15)]
            dark:bg-[#21262d] dark:hover:bg-[#30363d] dark:border-[rgba(240,246,252,0.1)]
            transition-colors">
            Edit profile
          </button>
        </div>

        <div className="mt-4 text-[14px]">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
            <div className="flex items-center flex-wrap">
              <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff]">
                <span className="font-semibold">{userData.followers}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">followers</span>
              </a>
              <span className="mx-1">·</span>
              <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff]">
                <span className="font-semibold">{userData.following}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">following</span>
              </a>
            </div>
          </div>

          {userData.company && (
            <div className="mt-3 flex items-center text-gray-700 dark:text-gray-300">
              <Building className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="break-words">{userData.company}</span>
            </div>
          )}

          {userData.location && (
            <div className="mt-3 flex items-center text-gray-700 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="break-words">{userData.location}</span>
            </div>
          )}

          {userData.blog && (
            <div className="mt-3 flex items-center text-gray-700 dark:text-gray-300">
              <Link2 className="w-4 h-4 mr-2 flex-shrink-0" />
              <a href={userData.blog} target="_blank" rel="noopener noreferrer" 
                className="text-[#0969da] hover:underline dark:text-[#58a6ff] break-all">
                {userData.blog.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {userData.email && (
            <div className="mt-3 flex items-center text-gray-700 dark:text-gray-300">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <a href={`mailto:${userData.email}`} 
                className="text-[#0969da] hover:underline dark:text-[#58a6ff] break-all">
                {userData.email}
              </a>
            </div>
          )}

          <div className="mt-3 flex items-center text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Joined {formatDate(userData.created_at)}</span>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-4 pt-4 border-t border-[#21262d]">
          <h2 className="text-sm font-semibold mb-2">Achievements</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 p-1 rounded-full bg-[#1c2128]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffa500] flex items-center justify-center">
                ⭐
              </div>
              <div className="pr-2">
                <div className="text-xs font-medium">Pro</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column - Tabs and Content */}
    <div className="flex-1 min-w-0">
      {children}
    </div>
  </div>
); 