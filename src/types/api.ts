export type Repository = {
  id: number;
  user_id: number;
  github_id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  default_branch: string;
  private: boolean;
  fork: boolean;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  readme: string;
  last_commit_message: string;
  last_commit_author: string;
  last_commit_date: string;
  synced: boolean;
  github_created_at: string;
  github_updated_at: string;
  github_pushed_at: string;
  created_at: string;
  updated_at: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  description: string;
};

export type WorkExperience = {
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  technologies: string[];
};

export type LanguageSkill = {
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
};

export type Resume = {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  photo_url: string;
  about: string;
  work_format: 'remote' | 'hybrid' | 'office';
  skills: string[];
  languages: LanguageSkill[];
  education: Education[];
  work_experience: WorkExperience[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Skill = {
  id: number;
  name: string;
  user_id: number | null;
  created_at: string;
  updated_at: string;
};

export type RefreshToken = {
  id: number;
  user_id: number;
  ip_address: string;
  user_agent: string;
  is_revoked: boolean;
  expires_at: string;
  last_used: string;
  created_at: string;
  updated_at: string;
};

export type ApiError = {
  success: false;
  message: string;
  error: string;
};
