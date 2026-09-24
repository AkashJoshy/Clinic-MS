import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

export const variantStyles = {
  error: {
    container:
      "border-rose-500/20 bg-rose-500/[0.07] text-rose-300",
    iconWrapper:
      "bg-rose-500/10 border-rose-500/15",
    icon: "text-rose-400",
  },

  warning: {
    container:
      "border-amber-500/20 bg-amber-500/[0.07] text-amber-300",
    iconWrapper:
      "bg-amber-500/10 border-amber-500/15",
    icon: "text-amber-400",
  },

  success: {
    container:
      "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-300",
    iconWrapper:
      "bg-emerald-500/10 border-emerald-500/15",
    icon: "text-emerald-400",
  },

  info: {
    container:
      "border-sky-500/20 bg-sky-500/[0.07] text-sky-300",
    iconWrapper:
      "bg-sky-500/10 border-sky-500/15",
    icon: "text-sky-400",
  },
};

export const defaultIcons = {
  error: AlertCircle,
  warning: TriangleAlert,
  success: CheckCircle2,
  info: Info,
};