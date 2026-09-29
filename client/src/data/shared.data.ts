import type { DoctorStatus } from "@/types/doctor";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

export const variantStyles = {
  error: {
    container: "border-rose-500/20 bg-rose-500/[0.07] text-rose-300",
    iconWrapper: "bg-rose-500/10 border-rose-500/15",
    icon: "text-rose-400",
  },

  warning: {
    container: "border-amber-500/20 bg-amber-500/[0.07] text-amber-300",
    iconWrapper: "bg-amber-500/10 border-amber-500/15",
    icon: "text-amber-400",
  },

  success: {
    container: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-300",
    iconWrapper: "bg-emerald-500/10 border-emerald-500/15",
    icon: "text-emerald-400",
  },

  info: {
    container: "border-sky-500/20 bg-sky-500/[0.07] text-sky-300",
    iconWrapper: "bg-sky-500/10 border-sky-500/15",
    icon: "text-sky-400",
  },
};

export const defaultIcons = {
  error: AlertCircle,
  warning: TriangleAlert,
  success: CheckCircle2,
  info: Info,
};

export const inputClasses = (isEditing: boolean) => {
  return `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 ${
    isEditing
      ? "border-blue-200 bg-white text-gray-900 shadow-sm ring-1 ring-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
      : "border-gray-100 bg-gray-50 text-gray-700 cursor-default"
  }`;
};

export const displayClasses =
  "w-full px-4 py-2.5 rounded-lg border border-transparent bg-transparent text-gray-700";
export const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";

export const disabledInputClasses =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed opacity-100";

