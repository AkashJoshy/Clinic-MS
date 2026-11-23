export const getAdminDashboardTheme = (isDark: boolean) => ({
  container: isDark ? "border-white/10 bg-white/2" : "border-gray-200 bg-white",

  headerDivider: "border-white/5",

  dateBadge: isDark
    ? "bg-white/5 border-white/10 text-gray-300"
    : "bg-gray-100 border-gray-200 text-gray-700",

  refreshButton: isDark
    ? "bg-white/5 border-white/10 text-gray-200 hover:border-primary/50 hover:bg-white/10"
    : "bg-white border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50 shadow-2xs",

  errorContainer: isDark
    ? "bg-rose-500/10 border-rose-500/25 text-rose-300"
    : "bg-rose-50 border-rose-200 text-rose-900",
});

export const getDashboardStatsTheme = (isDark: boolean) => ({

  card: isDark
    ? "bg-[#0d1a27] border-white/8 hover:border-primary/40 hover:bg-[#0f1f2f]"
    : "bg-white border-gray-200 hover:border-primary/40 hover:shadow-md",

  title: isDark ? "text-[#8b9ab0]" : "text-gray-500",
  value: isDark ? "text-white" : "text-gray-900",
  subtitle: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  footer: "border-white/10",

  pendingAlert: isDark
    ? "bg-amber-500/10 border-amber-500/25 text-amber-200"
    : "bg-amber-50 border-amber-200 text-amber-900",
});

export const getPlatformGrowthChartTheme = (isDark: boolean) => ({
  container: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-600",

  rangeContainer: isDark
    ? "bg-white/5 border-white/8"
    : "bg-gray-100 border-gray-200",

  rangeActive: isDark
    ? "bg-primary text-slate-950 shadow-sm"
    : "bg-white text-gray-900 shadow-sm",

  rangeInactive: isDark
    ? "text-[#8b9ab0] hover:text-white"
    : "text-gray-500 hover:text-gray-900",

  metricsContainer: isDark
    ? "bg-white/[0.02] border-white/5"
    : "bg-gray-50 border-gray-200",

  metricLabel: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  metricValue: isDark ? "text-white" : "text-gray-900",

  gridLine: isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(0,0,0,0.06)",

  guideline: isDark ? "#38bdf8" : "#0284c7",

  chartPointFill: isDark ? "#0d1a27" : "#ffffff",

  chartLabel: isDark ? "#8b9ab0" : "#6b7280",

  chartLabelActive: isDark ? "#ffffff" : "#111827",
});

export const getDepartmentDistributionChartTheme = (isDark: boolean) => ({
  container: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark ? "text-white" : "text-gray-900",

  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  centerLabel: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  centerValue: isDark ? "text-white" : "text-gray-900",

  legendItem: isDark
    ? "bg-white/[0.02] border-white/5 hover:border-white/15"
    : "bg-gray-50 border-gray-100 hover:border-gray-200",

  legendItemHovered: isDark
    ? "bg-white/10 border-white/20"
    : "bg-gray-100 border-gray-300",

  legendName: isDark ? "text-white" : "text-gray-800",

  legendCount: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  progressTrack: "bg-white/10",
});

export const getQuickActionsTheme = (isDark: boolean) => ({
  container: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark ? "text-white" : "text-gray-900",
  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  actionCard: isDark
    ? "bg-white/[0.02] border-white/5 hover:border-primary/40 hover:bg-primary/[0.04]"
    : "bg-gray-50/70 border-gray-100 hover:border-primary/40 hover:bg-primary/[0.04]",

  actionTitle: isDark ? "text-white" : "text-gray-900",
  actionDescription: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  arrow:
    "text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all",
});

export const getRegisteredDoctorsWidgetTheme = (isDark: boolean) => ({
  container: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark ? "text-white" : "text-gray-900",
  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  registeredBadge: isDark
    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
    : "bg-emerald-50 text-emerald-700 border border-emerald-200",

  filterContainer: isDark
    ? "bg-white/5 border-white/8"
    : "bg-gray-100 border-gray-200",

  filterActive: isDark
    ? "bg-primary text-slate-950 font-bold"
    : "bg-white text-gray-900 font-bold shadow-xs",

  filterInactive: isDark
    ? "text-[#8b9ab0] hover:text-white"
    : "text-gray-500 hover:text-gray-900",

  doctorCard: isDark
    ? "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
    : "bg-gray-50/70 border-gray-100 hover:border-gray-200 hover:bg-gray-50",

  doctorName: isDark ? "text-white" : "text-gray-900",

  doctorCode: isDark
    ? "bg-white/5 text-[#8b9ab0]"
    : "bg-gray-200 text-gray-700",

  emptyIcon: "text-gray-500",
  emptyMessage: "text-gray-400",

  profileButton: isDark
    ? "border-white/10 hover:border-primary/40 hover:text-primary text-gray-300"
    : "border-gray-300 hover:border-primary/40 hover:text-primary text-gray-700",

  manageLink:
    "text-primary hover:underline text-xs font-semibold flex items-center gap-1 shrink-0",

  reviewButton:
    "px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs",
});

export const getRegisteredPatientsWidgetTheme = (isDark: boolean) => ({
  container: isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200",

  heading: isDark ? "text-white" : "text-gray-900",
  description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

  registeredBadge: isDark
    ? "bg-sky-500/15 text-sky-400 border border-sky-500/25"
    : "bg-sky-50 text-sky-700 border border-sky-200",

  patientCard: isDark
    ? "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
    : "bg-gray-50/70 border-gray-100 hover:border-gray-200 hover:bg-gray-50",

  patientName: isDark ? "text-white" : "text-gray-900",

  patientNumber: isDark
    ? "bg-white/5 text-[#8b9ab0]"
    : "bg-gray-200 text-gray-700",

  patientDetails: "text-[#8b9ab0]",

  emptyIcon: "text-gray-500",
  emptyMessage: "text-gray-400",

  detailsButton: isDark
    ? "border-white/10 hover:border-primary/40 hover:text-primary text-gray-300"
    : "border-gray-300 hover:border-primary/40 hover:text-primary text-gray-700",

  viewAllLink:
    "text-primary hover:underline text-xs font-semibold flex items-center gap-1 shrink-0",
});