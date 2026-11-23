
export const getSubscriptionsPageTheme = (isDark: boolean) => ({
  container: isDark
    ? "border-white/10 bg-white/[0.02]"
    : "border-gray-200 bg-white shadow-sm",

  emptyContainer: isDark
    ? "border-white/10 bg-white/[0.01]"
    : "border-gray-200 bg-gray-50",

  iconWrapper: isDark
    ? "border-white/10 bg-white/5 text-gray-400"
    : "border-gray-200 bg-white text-gray-400",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  resetButton: isDark
    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100",

  createButton: "bg-primary text-primary-foreground hover:bg-primary/90",

  tabContainer: isDark
    ? "border-white/10 bg-[#080d14]"
    : "border-gray-200 bg-gray-50",

  inactiveTab: isDark
    ? "text-[#8b9ab0] hover:bg-white/5 hover:text-white"
    : "text-gray-500 hover:bg-white hover:text-gray-900",

  activeTab: isDark
    ? "bg-primary text-white shadow-sm"
    : "bg-primary text-gray-900 shadow-sm border border-gray-200",
});


export const getSubscriptionHeaderTheme = (isDark: boolean) => ({
  searchInput: isDark
    ? "border-white/10 bg-[#0c141e] text-white placeholder:text-gray-500"
    : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",

  searchIcon: isDark ? "text-[#8b9ab0]" : "text-gray-400",

  filterContainer: isDark
    ? "border-white/10 bg-[#0c141e]"
    : "border-gray-200 bg-gray-50",

  filterText: isDark
    ? "text-[#8b9ab0] hover:bg-white/5 hover:text-white"
    : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900",

  allSelected: isDark
    ? "bg-white/10 text-white"
    : "bg-white text-gray-900 shadow-sm",

  activeSelected:
    "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400",

  inactiveSelected: isDark
    ? "border border-rose-500/30 bg-rose-500/15 text-rose-300"
    : "border border-rose-200 bg-rose-50 text-rose-600",

  allCount: isDark
    ? "bg-white/5 text-current"
    : "bg-gray-200/70 text-gray-600",

  activeCount: "bg-emerald-500/10 text-emerald-400",

  inactiveCount: isDark
    ? "bg-rose-500/10 text-rose-300"
    : "bg-rose-100 text-rose-600",
});


export const getSubscriptionStatsSectionTheme = (isDark: boolean) => ({
  card: isDark
    ? "bg-[#0c141e]/80 border-white/8 hover:border-white/15"
    : "bg-white border-gray-200 hover:border-gray-300",

  title: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  value: isDark ? "text-white" : "text-gray-900",

  subtitle: isDark ? "text-[#6b7c93]" : "text-gray-500",
});


export const getSubscriptionCardTheme = (
  isDark: boolean,
  isPopular: boolean,
) => ({
  card: isPopular
    ? isDark
      ? "border-primary/50 bg-gradient-to-b from-primary/10 via-[#0d1825] to-[#0a121c] shadow-xl shadow-primary/10"
      : "border-primary/50 bg-gradient-to-b from-primary/5 via-white to-white shadow-xl shadow-primary/10"
    : isDark
      ? "border-white/8 bg-[#0b131d]/90 shadow-lg hover:border-white/15 hover:shadow-xl"
      : "border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  muted: isDark ? "text-gray-400" : "text-gray-600",

  subtle: isDark ? "text-gray-500" : "text-gray-500",

  badge: isDark
    ? "border-white/10 bg-white/5 text-[#8b9ab0]"
    : "border-gray-200 bg-gray-100 text-gray-600",

  divider: isDark ? "border-white/8" : "border-gray-200",

  subscriber: isDark
    ? "bg-white/5 text-[#c9d5e4]"
    : "bg-gray-100 text-gray-700",

  featureHeading: isDark ? "text-gray-300" : "text-gray-700",

  actionButton: isDark
    ? "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
    : "border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-300 hover:bg-gray-100",

  inactiveButton: isDark
    ? "border-white/10 text-gray-400 hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400"
    : "border-gray-200 text-gray-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600",
});


export const getSubscriptionFormModalTheme = (isDark: boolean) => ({
  modal: isDark
    ? "border-white/10 bg-[#0c141f]"
    : "border-gray-200 bg-white",

  header: isDark
    ? "border-white/8 bg-white/[0.02]"
    : "border-gray-200 bg-gray-50",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  closeButton: isDark
    ? "text-gray-400 hover:text-white hover:bg-white/10"
    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200",

  label: isDark ? "text-gray-300" : "text-gray-700",

  input: isDark
    ? "bg-[#080d14] border-white/10 text-white placeholder:text-gray-500"
    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400",

  section: isDark
    ? "bg-white/[0.02] border-white/8"
    : "bg-gray-50 border-gray-200",

  divider: isDark ? "border-white/8" : "border-gray-200",

  popularLabel: isDark ? "text-white" : "text-gray-800",

  cancelButton: isDark
    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
});


export const getSubscriptionStatusModalTheme = (isDark: boolean) => ({
  modal: isDark
    ? "border-white/10 bg-[#0e1724]"
    : "border-gray-200 bg-white",

  headerBorder: isDark ? "border-white/8" : "border-gray-200",

  title: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-slate-400" : "text-gray-500",

  closeButton: isDark
    ? "text-slate-400 hover:bg-white/10 hover:text-white"
    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

  summary: isDark
    ? "border-white/8 bg-white/[0.03]"
    : "border-gray-200 bg-gray-50",

  label: isDark ? "text-slate-500" : "text-gray-500",

  planName: isDark ? "text-white" : "text-gray-900",

  price: isDark ? "text-white" : "text-gray-900",

  secondaryText: isDark ? "text-slate-400" : "text-gray-500",

  summaryBorder: isDark ? "border-white/8" : "border-gray-200",

  explanationText: isDark ? "text-slate-300" : "text-gray-600",

  confirmationText: isDark ? "text-slate-400" : "text-gray-500",

  confirmationName: isDark ? "text-white" : "text-gray-900",

  footer: isDark
    ? "border-white/8 bg-white/[0.02]"
    : "border-gray-200 bg-gray-50",

  cancelButton: isDark
    ? "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900",
});


export const getColorPaletteManagementTheme = (isDark: boolean) => ({
  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  section: isDark
    ? "border-white/10 bg-white/[0.02]"
    : "border-gray-200 bg-gray-50",

  secondaryButton: isDark
    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100",

  dangerButton: "bg-red-500 text-white hover:bg-red-600",
});


export const getColorPaletteCardTheme = (isDark: boolean) => ({
  card: isDark
    ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",

  heading: isDark ? "text-white" : "text-gray-900",

  muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  value: isDark ? "text-gray-200" : "text-gray-700",

  swatchRing: isDark ? "ring-white/10" : "ring-black/5",

  action: isDark
    ? "text-gray-400 hover:bg-white/10 hover:text-white focus-visible:ring-white/40"
    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400",

  delete: isDark
    ? "text-gray-400 hover:bg-red-400/10 hover:text-red-400 focus-visible:ring-red-400/50"
    : "text-gray-500 hover:bg-red-50 hover:text-red-600 focus-visible:ring-red-400",

  preview: isDark
    ? "border-white/10 bg-[#080d14]"
    : "border-gray-100 bg-gray-50",
});

export const getColorPalettePreviewTheme = (isDark: boolean) => ({
  label: isDark ? "text-[#9baabe]" : "text-gray-600",

  hexCode: isDark ? "text-[#718096]" : "text-gray-400",
});

export const getColorPaletteFormModalTheme = (isDark: boolean) => ({
  overlay: "bg-black/60 backdrop-blur-sm",

  modal: isDark
    ? "border-white/10 bg-[#111b28]"
    : "border-gray-200 bg-white",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  input: isDark
    ? "border-white/10 bg-[#080d14] text-white placeholder:text-[#6b7c93]"
    : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",

  section: isDark
    ? "border-white/10 bg-white/[0.025]"
    : "border-gray-100 bg-gray-50",

  secondaryButton: isDark
    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100",

  iconButton: isDark
    ? "text-gray-400 hover:bg-white/10 hover:text-white"
    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
});
