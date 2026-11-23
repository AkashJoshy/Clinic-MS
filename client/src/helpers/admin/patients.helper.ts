
export const getPatientManagementTheme = (isDark: boolean) => ({
  container: isDark
    ? "border-white/10 bg-white/[0.02]"
    : "border-gray-200 bg-gray-50",

  searchIcon: "text-[#4a5568] group-focus-within:text-primary",

  searchInput: isDark
    ? "border-white/8 bg-[#0d1a27] text-white placeholder:text-[#4a5568]"
    : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",

  totalText: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  countBadge: isDark
    ? "bg-gray-800 text-primary"
    : "bg-primary/10 text-primary",

  filterButton: isDark
    ? "border-white/8 bg-[#0d1a27] text-[#8b9ab0] hover:text-white hover:bg-primary/5"
    : "border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-primary/5",

  filterHover: "hover:border-primary/50",
});

export const getPatientFilterModalTheme = (isDark: boolean) => ({
  modal: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  headerBorder: isDark ? "border-white/8" : "border-gray-200",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  closeButton: isDark
    ? "text-[#8b9ab0] bg-white/3 hover:bg-white/5 hover:text-white"
    : "text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900",

  sectionLabel: isDark ? "text-white" : "text-gray-900",

  footer: isDark ? "bg-white/2" : "bg-gray-50",

  resetButton: isDark
    ? "text-[#8b9ab0] hover:text-white"
    : "text-gray-500 hover:text-gray-900",
});

export const getPatientListItemTheme = (isDark: boolean) => ({
  card: isDark
    ? "border-white/8 bg-[#0d1a27]"
    : "border-gray-200 bg-white shadow-sm",

  cardHover: "hover:border-1 hover:border-primary/40",

  heading: isDark ? "text-white" : "text-gray-900",

  text: isDark ? "text-[#c1ccd9]" : "text-gray-700",

  muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  idBadge: isDark
    ? "border-white/10 bg-white/5 text-[#8b9ab0]"
    : "border-gray-200 bg-gray-100 text-gray-600",

  detailsButton: isDark
    ? "border-white/10 text-[#8b9ab0] hover:text-white"
    : "border-gray-200 text-gray-600 hover:text-gray-900",

  detailsHover: isDark ? "hover:bg-white/5" : "hover:bg-gray-100",

  missingCard: isDark
    ? "border-red-500/20 bg-red-500/5"
    : "border-red-200 bg-red-50",

  missingText: isDark ? "text-[#8b9ab0]" : "text-gray-500",
});

export const getPatientDetailsTheme = (isDark: boolean) => ({
  page: isDark
    ? "border-white/10 bg-white/2"
    : "border-gray-200 bg-gray-50",

  card: isDark
    ? "border-white/8 bg-[#0d1a27]"
    : "border-gray-200 bg-white",

  text: isDark ? "text-white" : "text-gray-900",

  mutedText: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  hoverText: isDark ? "hover:text-white" : "hover:text-gray-900",

  tabContainer: isDark
    ? "border-white/8 bg-[#0d1a27]"
    : "border-gray-200 bg-white",

  tabActive: "bg-primary text-primary-foreground shadow-lg shadow-primary/20",

  tabInactive: isDark
    ? "text-[#8b9ab0] hover:bg-white/5 hover:text-white"
    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

  countActive: "bg-white/20 text-white",

  countInactive: isDark
    ? "bg-white/8 text-[#8b9ab0]"
    : "bg-gray-100 text-gray-500",

  backButton: isDark
    ? "text-[#8b9ab0] hover:text-white"
    : "text-gray-500 hover:text-gray-900",

  blockButton:
    "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white",

  restoreButton:
    "border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
});

export const getPatientProfileCardTheme = (isDark: boolean) => ({
  card: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  name: isDark ? "text-white" : "text-gray-900",

  badge: isDark
    ? "bg-white/5 border-white/10 text-[#8b9ab0]"
    : "bg-gray-50 border-gray-200 text-gray-500",

  divider: isDark ? "border-white/5" : "border-gray-100",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
});


export const getPatientContactCardTheme = (isDark: boolean) => ({
  card: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark
    ? "text-white border-white/5"
    : "text-gray-900 border-gray-100",

  label: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  value: isDark ? "text-white" : "text-gray-900",
});


export const getPatientPersonalInformationTheme = (isDark: boolean) => ({
  card: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark
    ? "text-white border-white/5"
    : "text-gray-900 border-gray-100",

  label: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  value: isDark ? "text-white" : "text-gray-900",

  divider: isDark ? "border-white/5" : "border-gray-100",

  empty: isDark
    ? "border-white/10 bg-white/2 text-[#8b9ab0]"
    : "border-gray-200 bg-gray-50 text-gray-500",

  emptyBadge: isDark
    ? "border-white/5 bg-white/5 text-white"
    : "border-gray-200 bg-gray-50 text-gray-700",
});
