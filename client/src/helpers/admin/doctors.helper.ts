
export const getDoctorManagementTheme = (isDark: boolean) => {
  return {
    container: isDark
      ? "border-white/10 bg-white/[0.02] text-white"
      : "border-gray-200 bg-gray-50 text-gray-900",

    searchIcon: "text-[#4a5568] group-focus-within:text-primary",

    searchInput: isDark
      ? "border-white/8 bg-[#0d1a27] text-white placeholder:text-[#4a5568]"
      : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",

    tabsContainer: isDark
      ? "border-white/10 bg-[#0d1a27]"
      : "border-gray-200 bg-white",

    tabBase:
      "flex items-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-200",

    tabActive: "bg-primary text-white shadow-lg shadow-primary/20",

    tabInactive: isDark
      ? "text-[#8b9ab0] hover:text-white hover:bg-white/5"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",

    filterButton: isDark
      ? "border-white/8 bg-[#0d1a27] text-[#8b9ab0] hover:text-white hover:bg-primary/5"
      : "border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-primary-50",

    filterHover: "hover:border-primary/50",

    grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",

    badgeBase: "rounded-md px-2 py-0.5 text-[11px] font-bold",

    pendingBadge: isDark
      ? "bg-amber-500/20 text-amber-400"
      : "bg-amber-100 text-amber-700",

    rejectedBadge: isDark
      ? "bg-red-500/20 text-red-400"
      : "bg-red-100 text-red-700",

    approvedBadge: isDark
      ? "bg-[#1dc465] text-[#0d1a27]"
      : "bg-emerald-100 text-emerald-700",

    neutralBadge: isDark
      ? "bg-white/8 text-[#8b9ab0]"
      : "bg-gray-100 text-gray-500",
  };
};

export const getDoctorDetailsTheme = (isDark: boolean) => {
  return {
    page: isDark
      ? "border-white/10 bg-white/[0.02]"
      : "border-gray-200 bg-white shadow-sm",

    card: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    inner: isDark
      ? "bg-[#080d14] border-white/8"
      : "bg-gray-50 border-gray-200",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    backButton: isDark
      ? "text-[#8b9ab0] hover:text-white"
      : "text-gray-500 hover:text-gray-900",

    primaryButton: isDark
      ? "text-black hover:bg-[#159a4e]"
      : "text-white hover:bg-[#159a4e]",

    imageOverlay: isDark
      ? "bg-[#080d14]/90"
      : "bg-gray-900/80",

    imageCard: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200",

    imageContent: isDark
      ? "bg-[#080d14]/30"
      : "bg-gray-100",
  };
};

export const getDoctorProfileCardTheme = (isDark: boolean) => {
  return {
    card: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    divider: isDark ? "border-white/5" : "border-gray-200",

    code: isDark
      ? "bg-white/5 border-white/10 text-[#8b9ab0]"
      : "bg-gray-100 border-gray-200 text-gray-600",
  };
};


export const getDoctorContactCardTheme = (isDark: boolean) => {
  return {
    card: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    divider: isDark ? "border-white/5" : "border-gray-200",
  };
};


export const getDoctorQualificationsCardTheme = (isDark: boolean) => {
  return {
    card: isDark
      ? "border-white/8 bg-[#0d1a27]"
      : "border-gray-200 bg-white shadow-sm",

    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    divider: isDark ? "border-white/5" : "border-gray-200",

    document: isDark
      ? "border-white/8 bg-white/[0.03]"
      : "border-gray-200 bg-gray-50",

    documentHover: isDark
      ? "hover:bg-primary/[0.03]"
      : "hover:bg-primary/5",

    iconHover: isDark
      ? "group-hover:text-white"
      : "group-hover:text-gray-900",
  };
};

export const getDocumentStatusStyles = (status?: string) => {
  if (status === "APPROVED") {
    return {
      wrapper: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
      dot: "bg-emerald-500",
      label: "Verified",
    };
  }

  if (status === "REJECTED") {
    return {
      wrapper: "border-red-400/20 bg-red-400/10 text-red-400",
      dot: "bg-red-400",
      label: "Rejected",
    };
  }

  return {
    wrapper: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    dot: "bg-amber-400",
    label: "Pending",
  };
};

export const getDoctorClinicCardTheme = (isDark: boolean) => {
  return {
    heading: isDark ? "text-white" : "text-gray-900",
    text: isDark ? "text-[#c1ccd9]" : "text-gray-700",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    headerDivider: isDark ? "border-white/10" : "border-gray-200",
    divider: isDark ? "border-white/5" : "border-gray-200",

    card: isDark
      ? "border-white/8 bg-[#0d1a27]"
      : "border-gray-200 bg-white shadow-sm",

    innerCard: isDark
      ? "border-white/5 bg-white/[0.02]"
      : "border-gray-200 bg-gray-50",

    emptyCard: isDark
      ? "border-white/8 bg-[#0d1a27]"
      : "border-gray-200 bg-white",

    dashedCard: isDark ? "border-white/10" : "border-gray-300",

    emptyIcon: isDark ? "text-[#64748b]" : "text-gray-400",
  };
};


export const getDoctorScheduleCardTheme = (isDark: boolean) => {
  return {
    container: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    heading: isDark ? "text-white" : "text-gray-900",
    divider: isDark ? "border-white/5" : "border-gray-200",

    dayCard: isDark
      ? "bg-white/[0.02] border-white/5"
      : "bg-gray-50 border-gray-200",

    session: isDark
      ? "bg-[#080d14] border-white/10 text-white"
      : "bg-white border-gray-200 text-gray-700",

    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    empty: isDark
      ? "border-white/10 bg-white/[0.02]"
      : "border-gray-300 bg-gray-50",
  };
};


export const getDocumentVerificationModalTheme = (isDark: boolean) => {
  return {
    modal: isDark
      ? "border-white/10 bg-[#111827]"
      : "border-gray-200 bg-white",

    heading: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-gray-400" : "text-gray-500",
    description: isDark ? "text-gray-400" : "text-gray-600",
    documentName: isDark ? "text-white" : "text-gray-900",
    note: "text-gray-500",

    closeButton: isDark
      ? "text-gray-400 hover:bg-white/5 hover:text-white"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

    cancelButton: isDark
      ? "border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };
};

