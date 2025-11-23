import type { Repository, Resume } from './api';

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  github_id: number;
  avatar_url: string;
  bio: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type MeApiResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    repositories: Repository[];
    resumes: Resume[];
  };
};

export type MeResponse = {
  user: User;
  repositories: Repository[];
  resumes: Resume[];
};

export type RefreshTokenResponse = {
  success: boolean;
  message: string;
  data: {
    access_token: string;
  };
};
