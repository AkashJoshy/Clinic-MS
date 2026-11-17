import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  navigation,
  sectionFields,
  colorPresets,
  initialGeneralSettings,
  initialBusinessSettings,
  initialSystemSettings,
  sectionId,
  prefersReducedMotion,
  sameValue,
} from "../constants/admin-settings.constant";
import type {
  SettingsSection,
  SettingsKey,
  GeneralSettings,
  BusinessSettings,
  SystemSettings,
} from "../types/admin-settings";
import {
  getPlatformSettings,
  updatePlatformSettings,
} from "@/services/admin.service";
import type { PlatformSettings } from "@/schemas/admin/admin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { platformSettingsSchema } from "@/schemas/admin/settings/platform-settings.schema";
import { useForm } from "react-hook-form";
import { useMutate } from "./use-mutate.hook";
import { useAuthStore } from "@/store";

export const useAdminSettings = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("GENERAL");
  const [activeSetting, setActiveSetting] = useState<SettingsKey>("PLATFORM");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [general, setGeneral] = useState<GeneralSettings>({
    ...initialGeneralSettings,
  });
  const [business, setBusiness] = useState<BusinessSettings>({
    ...initialBusinessSettings,
  });
  const [system, setSystem] = useState<SystemSettings>({
    ...initialSystemSettings,
  });

  const [savedGeneral, setSavedGeneral] = useState<GeneralSettings>({
    ...initialGeneralSettings,
  });
  const [savedBusiness, setSavedBusiness] = useState<BusinessSettings>({
    ...initialBusinessSettings,
  });
  const [savedSystem, setSavedSystem] = useState<SystemSettings>({
    ...initialSystemSettings,
  });

  const methods = useForm<PlatformSettings>({
    resolver: zodResolver(platformSettingsSchema),
    mode: "onSubmit",
    defaultValues: {
      general: {
        platform: {
          platformName: "",
          supportEmail: "",
          supportPhone: "",
          defaultTimezone: "Asia/Kolkata",
          defaultCurrency: "INR",
        },
        appearance: {
          primaryBrandColor: "#1dc465",
          mode: "DARK",
        },
        notifications: {
          emailNotifications: true,
          appointmentReminders: true,
          paymentNotifications: true,
        },
        security: {
          twoFactorAuthRequired: false,
          adminSessionTimeoutMinutes: 30,
          absoluteSessionLifetimeHours: 24,
          maintenanceMode: false,
        },
      },

      // Add your complete business and system defaults here.
    },
  });

  const platformSettings = async () => {
    try {
      const response = await getPlatformSettings();
      console.log(response);
      if (response.data) {
        console.log(`Response Data: `);
        console.log(response.data);
        methods.reset({
          general: response.data.general,
          business: response.data.business,
          system: response.data.system,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    platformSettings();
  }, []);

  const pendingScroll = useRef<SettingsKey | null>(null);
  const spyLocked = useRef(false);
  const lockTimer = useRef<number | undefined>(undefined);

  const activeGroup =
    navigation.find((group) => group.id === activeSection) ?? navigation[0];

  /* ----------------------------- change tracking ----------------------------- */

  const currentFor = useCallback(
    (section: SettingsSection): Record<string, unknown> =>
      section === "GENERAL"
        ? ({ ...general } as unknown as Record<string, unknown>)
        : section === "BUSINESS"
          ? ({ ...business } as unknown as Record<string, unknown>)
          : ({ ...system } as unknown as Record<string, unknown>),
    [general, business, system],
  );

  const savedFor = useCallback(
    (section: SettingsSection): Record<string, unknown> =>
      section === "GENERAL"
        ? ({ ...savedGeneral } as unknown as Record<string, unknown>)
        : section === "BUSINESS"
          ? ({ ...savedBusiness } as unknown as Record<string, unknown>)
          : ({ ...savedSystem } as unknown as Record<string, unknown>),
    [savedGeneral, savedBusiness, savedSystem],
  );

  const isChanged = useCallback(
    (key: SettingsKey) => {
      const current = currentFor(activeSection);
      const saved = savedFor(activeSection);
      return sectionFields[key].some(
        (field) => !sameValue(current[field], saved[field]),
      );
    },
    [activeSection, currentFor, savedFor],
  );

  const changedCount = activeGroup.items.filter((item) =>
    isChanged(item.id),
  ).length;
  const isDirty = changedCount > 0;

  const updateBusiness = <K extends keyof BusinessSettings>(
    key: K,
    value: BusinessSettings[K],
  ) => setBusiness((prev) => ({ ...prev, [key]: value }));

  const updateSystem = <K extends keyof SystemSettings>(
    key: K,
    value: SystemSettings[K],
  ) => setSystem((prev) => ({ ...prev, [key]: value }));

  /* ------------------------------ scroll behavior ---------------------------- */

  const scrollToSection = useCallback((key: SettingsKey) => {
    const el = document.getElementById(sectionId(key));
    if (!el) return;

    // Pause scroll-spy while smooth scrolling is running
    spyLocked.current = true;
    window.clearTimeout(lockTimer.current);

    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    lockTimer.current = window.setTimeout(() => {
      spyLocked.current = false;
    }, 900);
  }, []);

  const handleNavigation = (section: SettingsSection, setting: SettingsKey) => {
    setActiveSetting(setting);
    setIsDrawerOpen(false);

    if (section !== activeSection) {
      pendingScroll.current = setting;
      setActiveSection(section);
    } else {
      scrollToSection(setting);
    }
  };

  // After switching category, scroll to the requested card once it exists
  useEffect(() => {
    const target = pendingScroll.current;
    pendingScroll.current = null;
    if (!target) return;
    const frame = requestAnimationFrame(() => scrollToSection(target));
    return () => cancelAnimationFrame(frame);
  }, [activeSection, scrollToSection]);

  // Scroll-spy: highlight the nav item for the card currently in view
  useEffect(() => {
    const elements = activeGroup.items
      .map((item) => document.getElementById(sectionId(item.id)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        if (spyLocked.current) return;
        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (topMost) {
          setActiveSetting(
            topMost.target.id
              .replace("settings-", "")
              .toUpperCase() as SettingsKey,
          );
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeGroup]);

  // Close the mobile drawer with Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen]);

  const handleSave = () => {
    if (activeSection === "GENERAL") {
      console.log(`General Settings Saved`);
      console.log(general);
      setSavedGeneral({ ...general });
    } else if (activeSection === "BUSINESS") setSavedBusiness({ ...business });
    else setSavedSystem({ ...system });

    toast.success(`${activeGroup.label} settings saved.`);
  };

  const handleValidSubmit = (data: PlatformSettings) => {
    console.log("Validated Settings:", data);

    // Call your updatePlatformSettings API here.
  };

  const updateUser = useAuthStore((state) => state.updateUser);
  const platform = useAuthStore((state) => state.platform);
  const updatePlatform = useAuthStore((state) => state.updatePlatform);

  const { mutate, isPending } = useMutate(updatePlatformSettings, {
    onSuccess(response) {
      const result = response.data;

      switch (result.selection) {
        case "GENERAL": {
          console.log(`Data from the Result: `);
          console.log(result.data);
          updateUser(
            {
              theme: result.data.appearance.mode,
            },
            "admin",
          );

          updatePlatform({
            platformName: result.data.platform.platformName,
            primaryColor: result.data.appearance.primaryBrandColor,
            isMaintenanceMode: result.data.security.maintenanceMode,
          });

          setSavedGeneral(structuredClone(result.data));
          methods.resetField("general", {
            defaultValue: structuredClone(result.data),
          });

          break;
        }

        case "BUSINESS": {
          setSavedBusiness(structuredClone(result.data));
          break;
        }

        case "SYSTEM": {
          setSavedSystem(structuredClone(result.data));
          break;
        }
      }

      toast.success("Settings updated successfully.");
    },
  });

  const handleSectionSave = async () => {
    if (activeSection === "GENERAL") {
      const isValid = await methods.trigger("general");

      if (!isValid) {
        console.log("General settings validation failed");
        return;
      }

      const generalData = methods.getValues("general");

      console.log("Valid General Settings:", generalData);

      mutate({
        selection: "GENERAL",
        data: generalData,
      });
      return;
    }

    if (activeSection === "BUSINESS") {
      console.log("Business Settings:", business);

      // Call Business Settings API here.
      return;
    }

    if (activeSection === "SYSTEM") {
      console.log("System Settings:", system);

      // Call System Settings API here.
    }
  };

  const handleReset = () => {
    if (!isDirty) return;
    if (activeSection === "GENERAL") setGeneral({ ...savedGeneral });
    else if (activeSection === "BUSINESS") setBusiness({ ...savedBusiness });
    else setSystem({ ...savedSystem });

    toast.success("Changes discarded.");
  };

  useEffect(() => {
    methods.reset();
  }, []);

  return {
    activeSection,
    setActiveSection,
    activeSetting,
    setActiveSetting,
    isDrawerOpen,
    setIsDrawerOpen,
    general,
    business,
    system,
    savedGeneral,
    savedBusiness,
    savedSystem,
    activeGroup,
    isDirty,
    changedCount,
    isChanged,
    updateBusiness,
    updateSystem,
    scrollToSection,
    handleNavigation,
    handleSave,
    handleReset,
    handleValidSubmit,
    handleSectionSave,
    methods,
    isPending,
  };
};

export default useAdminSettings;
