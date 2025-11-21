import type { Repository, Resume } from './api';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  github_id: number;
  avatar_url: string;
  bio: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// API response from backend
export interface MeApiResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    repositories: Repository[];
    resumes: Resume[];
  };
}

// Transformed data stored in RTK Query cache (without API wrappers)
export interface MeResponse {
  user: User;
  repositories: Repository[];
  resumes: Resume[];
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
  };
}
