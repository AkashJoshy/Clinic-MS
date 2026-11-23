
export const getDepartmentTheme = (isDark: boolean) => ({
  container: isDark ? "border-white/10 bg-white/2" : "border-gray-200 bg-white",

  searchIcon: isDark ? "text-[#8b9ab0]" : "text-gray-400",

  searchInput: isDark
    ? "bg-[#0d1a27] border-white/8 text-white placeholder:text-[#8b9ab0] focus:border-primary/50"
    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary/50",

  emptyState: isDark ? "text-[#8b9ab0]" : "text-gray-500",
});

export const getAddDepartmentTheme = (isDark: boolean) => {
  return {
    page: isDark ? "border-white/10 bg-white/2" : "border-gray-200 bg-gray-50",

    backButton: isDark
      ? "bg-[#0d1a27] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/15"
      : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300",

    formCard: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200",

    input: isDark
      ? "bg-white/5 border-white/8 text-white placeholder:text-[#8b9ab0] focus:border-primary/50"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary/50",

    cancelButton: isDark
      ? "border-white/8 text-white hover:bg-white/5"
      : "border-gray-200 text-gray-700 hover:bg-gray-100",
  };
};

export const getEditDepartmentTheme = (isDark: boolean) => ({
  container: isDark
    ? "border-white/10 bg-white/2"
    : "border-gray-200 bg-gray-50",

  backButton: isDark
    ? "bg-[#0d1a27] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/15"
    : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300",

  card: isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200",

  input: isDark
    ? "bg-white/5 border-white/8 text-white focus:border-primary/50"
    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary/50",

  cancelButton: isDark
    ? "border-white/8 text-white hover:bg-white/5"
    : "border-gray-200 text-gray-700 hover:bg-gray-100",
});

export const getDepartmentCardTheme = (isDark: boolean) => ({
  card: isDark
    ? "bg-[#0d1a27] border-white/8 hover:border-white/15"
    : "bg-white border-gray-200 hover:border-gray-300",

  title: isDark ? "text-white" : "text-gray-900",

  muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  modeBadge: isDark
    ? "bg-white/5 text-[#8b9ab0]"
    : "bg-gray-100 text-gray-600",

  divider: isDark ? "border-white/8" : "border-gray-200",
});
