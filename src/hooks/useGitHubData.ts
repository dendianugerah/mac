import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  visibility: string;
}

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

export const useGitHubData = (url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = url.split('/').pop() || '';
        const [userResponse, reposResponse] = await Promise.all([
          octokit.users.getByUsername({ username }),
          octokit.repos.listForUser({ username, sort: 'updated', per_page: 20 })
        ]);

        setUserData(userResponse.data as GitHubUser);
        setRepos(reposResponse.data as GitHubRepo[]);
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