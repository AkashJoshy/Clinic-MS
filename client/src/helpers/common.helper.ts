
export const getDeleteConfirmationalModalTheme = (isDark: boolean) => {
  return {
    modal: isDark
      ? "border-white/10 bg-[#111827]"
      : "border-gray-200 bg-white",

    heading: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-gray-400" : "text-gray-500",
    description: isDark ? "text-gray-400" : "text-gray-600",
    name: isDark ? "text-white" : "text-gray-900",

    closeButton: isDark
      ? "text-gray-400 hover:bg-white/5 hover:text-white"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

    cancelButton: isDark
      ? "border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };
};


export const getRejectModalTheme = (isDark: boolean) => {
  return {
    modal: isDark
      ? "border-white/10 bg-[#0d1a27]"
      : "border-gray-200 bg-white",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    input: isDark
      ? "border-white/10 bg-[#080d14] text-white placeholder:text-[#4a5568]"
      : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400",

    inputFocus: "focus:border-[#1dc465]/50",

    closeButton: isDark
      ? "text-[#8b9ab0] hover:text-white"
      : "text-gray-500 hover:text-gray-900",

    cancelButton: isDark
      ? "border-white/8 bg-white/5 text-[#8b9ab0] hover:bg-white/10 hover:text-white"
      : "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900",
  };
};

export const getAllApprovalsTheme = (isDark: boolean) => ({
  container: isDark
    ? "border-white/1 bg-[#0d1a27]/50"
    : "border-gray-200 bg-white",

  iconWrapper: isDark ? "bg-white/5" : "bg-gray-100",

  icon: isDark ? "text-[#4a5568]" : "text-gray-400",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
});
