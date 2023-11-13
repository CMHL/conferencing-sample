export interface BaseUser {
  id: number;
  username: string;
  email: string;
  slug: string;
  user_type: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: Date;
  created: Date;
  modified: Date;
  avatar: string;
  avatar_original: string;
  avatar_thumb: string;
  avatar_large: string;
  locale: string;
  time_zone: string;
  online: boolean;
}
