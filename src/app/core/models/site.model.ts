export interface Site {
  id?: number;
  customer?: string;
  name: string;
  slug: string;
  is_active: boolean;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  lat?: string;
  lon?: string;
  firmware_release: string;
  created: Date;
  resident_count: number;
  permissions?: string[];
}
