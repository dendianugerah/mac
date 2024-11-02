import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

export const useGitHubData = (url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = url.split('/').pop() || '';
        const [userResponse, reposResponse] = await Promise.all([
          octokit.users.getByUsername({ username }),
          octokit.repos.listForUser({ username, sort: 'updated', per_page: 20 })
        ]);

        setUserData(userResponse.data);
        setRepos(reposResponse.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError('Failed to load GitHub profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [url]);

  return { isLoading, userData, repos, error };
}; 