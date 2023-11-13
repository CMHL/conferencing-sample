import { Resident } from './resident.model';

export interface Hardware {
  id?: number;
  resident: Resident | number;
  hardware_id: string;
  ip_address?: string;
  serial_number?: string;
  model_number?: string;
  status: string;
  is_active: boolean;
  current_messenger_version?: string;
  current_sunrise_version?: string;
  logging_enabled: boolean;
  av_key_enabled: boolean;
  menu_key_enabled: boolean;
  default_av_input?: string;
  firmware_version?: string;
}
