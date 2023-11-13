import { Hardware } from './hardware.model';
import { Site } from './site.model';
import { Supporter } from './supporter.model';

export interface Resident  {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  user_type: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: Date;
  created: Date;
  modified: Date;
  avatar: string;
  avatar_original: string;
  avatar_large: string;
  avatar_thumb: string;
  locale: string;
  time_zone: string;
  online: boolean;
  slug: string;
  customer: number;
  site: Site | number;
  supporters?: Supporter[];
  gender: string;
  age: number;
  pin_code?: number;
  deliver_to_inbox: boolean;
  is_assistance_active: boolean;
  set_top_box?: Hardware;
}
