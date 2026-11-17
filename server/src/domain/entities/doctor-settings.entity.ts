import {
  INITIAL_DOCTOR_APPEARANCE,
  INITIAL_DOCTOR_CLINICAL_NOTIFICATIONS,
  INITIAL_DOCTOR_NOTIFICATION_CHANNELS,
  INITIAL_DOCTOR_PROFILE,
  INITIAL_DOCTOR_SECURITY,
  INITIAL_DOCTOR_UPDATE_NOTIFICATIONS,
} from "../constants/doctor-settings.constants.ts";

import type {
  AddDoctorSettingsProps,
  DoctorAppearanceSettings,
  DoctorClinicalNotifications,
  DoctorNotificationSettings,
  DoctorProfileSettings,
  DoctorSecuritySettings,
  UpdateDoctorAppearanceInput,
  UpdateDoctorNotificationsInput,
  UpdateDoctorProfileInput,
  UpdateDoctorSecurityInput,
} from "../types/doctor-settings.types.ts";

export class DoctorSettings {
  constructor(
    public id: string | null,
    public doctorId: string | null,
    public profile: DoctorProfileSettings,
    public security: DoctorSecuritySettings,
    public notifications: DoctorNotificationSettings,
    public appearance: DoctorAppearanceSettings,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<AddDoctorSettingsProps>): DoctorSettings {
    return new DoctorSettings(
      data.id ?? null,
      data.doctorId ?? null,
      {
        ...INITIAL_DOCTOR_PROFILE,
        ...data.profile,
      },
      {
        ...INITIAL_DOCTOR_SECURITY,
        ...data.security,
      },
      {
        clinical: {
          ...INITIAL_DOCTOR_CLINICAL_NOTIFICATIONS,
          ...data.notifications?.clinical,
        },
        updates: {
          ...INITIAL_DOCTOR_UPDATE_NOTIFICATIONS,
          ...data.notifications?.updates,
        },
        channels: {
          ...INITIAL_DOCTOR_NOTIFICATION_CHANNELS,
          ...data.notifications?.channels,
        },
      },
      {
        ...INITIAL_DOCTOR_APPEARANCE,
        ...data.appearance,
      },
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static register(doctorId: string): DoctorSettings {
    if (!doctorId.trim()) {
      throw new Error("Doctor ID is required");
    }

    return this.create({ doctorId });
  }

  updateProfile(input: UpdateDoctorProfileInput): void {
    this.profile = {
      ...this.profile,
      ...input,
    };

    this.touch();
  }

  updateSecurity(input: UpdateDoctorSecurityInput): void {
    if (input.inactivitySessionTimeoutMinutes !== undefined) {
      this.assertPositiveInteger(
        input.inactivitySessionTimeoutMinutes,
        "Inactivity session timeout",
      );
    }

    this.security = {
      ...this.security,
      ...input,
    };

    this.touch();
  }

  updateNotifications(input: UpdateDoctorNotificationsInput): void {
    if (input.clinical?.appointmentReminderLeadTimeHours !== undefined) {
      this.assertReminderLeadTime(
        input.clinical.appointmentReminderLeadTimeHours,
      );
    }

    this.notifications = {
      clinical: {
        ...this.notifications.clinical,
        ...input.clinical,
      },

      updates: {
        ...this.notifications.updates,
        ...input.updates,
      },

      channels: {
        ...this.notifications.channels,
        ...input.channels,
      },
    };

    this.touch();
  }

  updateAppearance(input: UpdateDoctorAppearanceInput): void {
    if (input.colorPaletteId !== undefined && !input.colorPaletteId.trim()) {
      throw new Error("Color palette ID is required");
    }

    if (input.walletCardDesignId !== undefined) {
      this.assertPositiveInteger(
        input.walletCardDesignId,
        "Wallet card design ID",
      );
    }

    this.appearance = {
      ...this.appearance,
      ...input,

      ...(input.colorPaletteId !== undefined && {
        colorPaletteId: input.colorPaletteId.trim(),
      }),
    };

    this.touch();
  }

  private assertPositiveInteger(value: number, field: string): void {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`${field} must be a positive integer`);
    }
  }

  private assertReminderLeadTime(
    value: DoctorClinicalNotifications["appointmentReminderLeadTimeHours"],
  ): void {
    const allowedValues = [1, 2, 6, 24];

    if (!allowedValues.includes(value)) {
      throw new Error("Invalid appointment reminder lead time");
    }
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
