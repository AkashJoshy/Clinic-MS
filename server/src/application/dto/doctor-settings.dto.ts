import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type {
  DoctorAppearanceSettings,
  DoctorNotificationSettings,
  DoctorProfileSettings,
  DoctorSecuritySettings,
  SafeDoctorSettings,
  UpdateDoctorAppearanceInput,
  UpdateDoctorNotificationsInput,
  UpdateDoctorProfileInput,
  UpdateDoctorSecurityInput,
} from "../../domain/types/doctor-settings.types.ts";

export type UpdateDoctorSettingsDto =
  | {
      section: "PROFILE";
      data: UpdateDoctorProfileInput;
    }
  | {
      section: "SECURITY";
      data: UpdateDoctorSecurityInput;
    }
  | {
      section: "NOTIFICATIONS";
      data: UpdateDoctorNotificationsInput;
    }
  | {
      section: "APPEARANCE";
      data: UpdateDoctorAppearanceInput;
    };

export type UpdateDoctorSettingsResponseDto =
  | {
      section: "PROFILE";
      data: DoctorProfileSettings;
    }
  | {
      section: "SECURITY";
      data: DoctorSecuritySettings;
    }
  | {
      section: "NOTIFICATIONS";
      data: DoctorNotificationSettings;
    }
  | {
      section: "APPEARANCE";
      data: DoctorAppearanceSettings;
    };

export type GetDoctorSettingsResponseDto = SafeDoctorSettings & {
  displayName: string;
  phone: string;
};
