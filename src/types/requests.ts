import type { Education, LanguageSkill, WorkExperience } from './api';

export type LoginResponse = {
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
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type LogoutRequest = {
  refresh_token: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type UpdateMeRequest = {
  email?: string;
  avatar_url?: string;
};

export type CreateResumeRequest = {
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
};

export type UpdateResumeRequest = {
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
};

export type GeneratePDFRequest = {
  template?: 'modern' | 'classic' | 'minimal';
};

export type GeneratePDFResponse = {
  success: boolean;
  message: string;
  download_url: string;
};

export type GenerateAboutRequest = {
  repository_ids: number[];
  job_description?: string;
  user_note?: string;
};

export type GenerateAboutResponse = {
  success: boolean;
  message: string;
  data: {
    about: string;
  };
};

export type CreateSkillRequest = {
  name: string;
};

export type GetSkillsParams = {
  q?: string;
};

export type RevokeSessionRequest = {
  refresh_token: string;
};
