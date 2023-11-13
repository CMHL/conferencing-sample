export interface Customer {
  id?: number;
  name: string;
  slug: string;
  website: string;
  is_active: boolean;
  use_own_branding: boolean;
  settings_menu_label: string;
  assistance_menu_label: string;
  support_phone: string;
  support_url: string;
  settings_enabled: boolean;
  assistance_enabled: boolean;
  created: Date;
  modified: Date;
  logo: string;
  logo_original: string;
  logo_thumb: string;
  logo_large: string;
  resident_count: number;
  permissions?: string[];
}
