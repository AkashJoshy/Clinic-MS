export const getAdminSettingsPageTheme = (isDark: boolean) => ({
  container: isDark
    ? "border-white/10 bg-white/[0.02]"
    : "border-gray-200 bg-white",

  mobileNavigationButton: isDark
    ? "bg-[#0d1a27] border-white/10 text-[#8b9ab0] hover:text-white"
    : "bg-white border-gray-200 text-gray-500 hover:text-gray-900",

  desktopNavigation: isDark
    ? "bg-[#0d1a27] border-white/[0.08]"
    : "bg-white border-gray-200",

  breadcrumb: isDark ? "text-[#6b7c93]" : "text-gray-500",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
});

export const getGeneralSettingsSectionTheme = (isDark: boolean, inputClass: string) => ({
  input: `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`,
});


export const getAppearanceSettingsTheme = (isDark: boolean) => ({
  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  modeCard: (isSelected: boolean) =>
    isSelected
      ? "border-emerald-400 bg-emerald-400/10"
      : isDark
        ? "border-white/10 bg-[#091420] hover:border-white/20"
        : "border-gray-200 bg-white hover:border-gray-300",

  radioIndicator: (isSelected: boolean) =>
    isSelected
      ? "border-emerald-400 bg-emerald-400"
      : isDark
        ? "border-white/30"
        : "border-gray-300",

  radioInner: isDark ? "bg-[#091420]" : "bg-white",

  previewContainer: isDark
    ? "border-white/8 bg-[#091420]"
    : "border-gray-200 bg-white",

  previewLabel: isDark ? "text-[#6b7c93]" : "text-gray-500",

  previewPlatformName: isDark ? "text-white" : "text-gray-900",
});

export const getBusinessSettingsSectionTheme = (isDark: boolean, inputClass: string) => ({
  input: `${inputClass} ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`,

  sectionDivider: isDark ? "border-white/5" : "border-gray-200",
});

export const getSystemSettingsSectionTheme = (isDark: boolean, inputClass: string) => ({
  card: isDark
    ? "border-white/8 bg-[#091420]"
    : "border-gray-200 bg-white",

  title: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  input: `${inputClass} ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`,
});
