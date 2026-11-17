import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  doctorNavigation,
  initialDoctorSettings,
  doctorSectionId,
} from "../constants/doctor-settings.constant";
import type {
  DoctorSettingsKey,
  DoctorSettingsSection,
  DoctorSettingsValues,
} from "../types/doctor-settings";
import {
  doctorSettingsSchema,
  type DoctorSettingsSchemaType,
} from "../schemas/doctor/settings";
import { useMutate } from "./use-mutate.hook";
import {
  getDoctorSettingsDetails,
  updateDoctorSettingsDetails,
} from "@/services/doctor.service";
import { mapDoctorSettingsResponse } from "@/helpers/doctor-settings.helper";

export const useDoctorSettings = () => {
  const [activeSection, setActiveSection] = useState<DoctorSettingsSection>(
    "PROFILE_VERIFICATION",
  );
  const [activeSetting, setActiveSetting] =
    useState<DoctorSettingsKey>("PROFILE_INFO");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const methods = useForm<DoctorSettingsSchemaType>({
    resolver: zodResolver(doctorSettingsSchema),
    mode: "onChange",
    defaultValues: initialDoctorSettings,
  });

  const {
    formState: { dirtyFields },
    reset,
    resetField,
  } = methods;

  const fetchDoctorSettings = async () => {
    try {
      const response = await getDoctorSettingsDetails();
      if (response.data) {
        const data = response.data;
        const mappedSettings = mapDoctorSettingsResponse(response.data);
        reset({
          profileInfo: {
            ...initialDoctorSettings.profileInfo,
            displayName: data.displayName,
            emergencyContactPhone: data.phone,
            acceptNewPatients: data.profile.acceptNewPatients,
            publicProfileVisible: data.profile.publicDirectoryVisibility,
          },
          security: {
            ...initialDoctorSettings.security,
            twoFactorAuth: data.security.twoFactorAuthentication,
            loginAlerts: data.security.newDeviceLoginAlerts,
            sessionTimeoutMinutes:
              data.security.inactivitySessionTimeoutMinutes,
          },
          notifications: {
            ...initialDoctorSettings.notifications,
            channels: {
              emailAlerts: data.notifications.channels.email,
              smsAlerts: data.notifications.channels.sms,
              whatsappAlerts: data.notifications.channels.whatsappBusiness,
            },
            clinical: {
              appointmentBooked:
                data.notifications.clinical.newAppointmentBookings,
              appointmentReminderHours:
                data.notifications.clinical.appointmentReminderLeadTimeHours,
              appointmentCancelled:
                data.notifications.clinical.cancellationsAndReschedules,
              patientMessages:
                data.notifications.clinical.patientInquiriesAndMessages,
            },
            updates: {
              marketingEmails:
                data.notifications.updates.platformFeaturesAndClinicalGuides,
              payoutUpdates:
                data.notifications.updates.walletAndPayoutSettlements,
            },
          },
          appearance: {
            ...initialDoctorSettings.appearance,
            colorPaletteId: data.appearance.colorPaletteId,
            mode: data.appearance.theme,
            walletCardDesignId: data.appearance.walletCardDesignId,
            compactScheduleView: data.appearance.compactScheduleView,
            highContrastMode: data.appearance.highContrastMode,
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDoctorSettings();
  }, []);

  const { mutate, isPending } = useMutate(updateDoctorSettingsDetails, {
    onSuccess(data) {
      if (data.data) {
        reset(data.data);
      }
    },
  });

  const activeGroup = useMemo(() => {
    return (
      doctorNavigation.find((g) => g.id === activeSection) ??
      doctorNavigation[0]
    );
  }, [activeSection]);

  const isChanged = useCallback(
    (key: DoctorSettingsKey): boolean => {
      const fieldMapping: Record<
        DoctorSettingsKey,
        keyof DoctorSettingsValues
      > = {
        PROFILE_INFO: "profileInfo",
        KYC: "kyc",
        SECURITY: "security",
        NOTIFICATIONS: "notifications",
        APPEARANCE: "appearance",
        ACCOUNT_MANAGEMENT: "accountManagement",
      };

      const fieldName = fieldMapping[key];
      const dirty = dirtyFields[fieldName];
      if (!dirty) return false;

      const checkDirty = (value: unknown): boolean => {
        if (value === true) return true;
        if (value && typeof value === "object") {
          return Object.values(value).some(checkDirty);
        }
        return false;
      };

      return checkDirty(dirty);
    },
    [dirtyFields],
  );

  const handleNavigation = useCallback(
    (section: DoctorSettingsSection, setting: DoctorSettingsKey) => {
      setActiveSection(section);
      setActiveSetting(setting);
      setIsDrawerOpen(false);

      if (typeof window !== "undefined") {
        setTimeout(() => {
          const el = document.getElementById(doctorSectionId(setting));
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    },
    [],
  );

  const resetSection = useCallback(
    (sectionName: keyof DoctorSettingsValues, sectionLabel: string) => {
      resetField(sectionName, {
        // defaultValue: initialDoctorSettings[sectionName],
      });
      toast.success(`${sectionLabel} reset to default`);
    },
    [resetField],
  );

  return {
    activeSection,
    activeSetting,
    isDrawerOpen,
    setIsDrawerOpen,
    activeGroup,
    isChanged,
    handleNavigation,
    resetSection,
    methods,
    mutate,
    isPending,
  };
};
