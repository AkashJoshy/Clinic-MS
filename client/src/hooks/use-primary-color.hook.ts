import { useEffect } from "react";
import { useAuthStore } from "@/store";
import { applyPrimaryColor } from "@/helpers/color-palette.helper";

export const usePrimaryColor = () => {
  const primaryColor = useAuthStore((state) => state.platform.primaryColor);

  useEffect(() => {
    if (!primaryColor) return;

    applyPrimaryColor(primaryColor);
  }, [primaryColor]);
};
