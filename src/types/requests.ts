import type { Education, LanguageSkill, WorkExperience } from './api';

// Auth requests
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      username: string;
      email: string;
      github_id: number;
      avatar_url: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// User/Me requests
export interface UpdateMeRequest {
  email?: string;
  avatar_url?: string;
}

// Resume requests
export interface CreateResumeRequest {
  title: string;
  full_name: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  photo_url?: string;
  about?: string;
  work_format?: 'remote' | 'hybrid' | 'office';
  skills?: string[];
  languages?: LanguageSkill[];
  education?: Education[];
  work_experience?: WorkExperience[];
  slug?: string;
  is_public?: boolean;
}

export interface UpdateResumeRequest {
  title?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  photo_url?: string;
  about?: string;
  work_format?: 'remote' | 'hybrid' | 'office';
  skills?: string[];
  languages?: LanguageSkill[];
  education?: Education[];
  work_experience?: WorkExperience[];
  slug?: string;
  is_public?: boolean;
}

export interface GeneratePDFRequest {
  template?: 'modern' | 'classic' | 'minimal';
}

export interface GeneratePDFResponse {
  success: boolean;
  message: string;
  download_url: string;
}

// AI Generation requests
export interface GenerateAboutRequest {
  repository_ids: number[];
  job_description?: string;
  user_note?: string;
}

export interface GenerateAboutResponse {
  success: boolean;
  message: string;
  data: {
    about: string;
  };
}

// Skills requests
export interface CreateSkillRequest {
  name: string;
}

export interface GetSkillsParams {
  q?: string;
}

// Sessions
export interface RevokeSessionRequest {
  refresh_token: string;
}
