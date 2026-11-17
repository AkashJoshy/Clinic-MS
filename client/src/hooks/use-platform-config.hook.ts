import { useAuthStore } from "@/store";
import { DEFAULT_PLATFORM_NAME } from "@/constants/role.constants";
import { formatPlatformName } from "@/helpers/platform.helper";

export const usePlatformConfig = () => {
  const platform = useAuthStore((state) => state.platform);

  const websiteName = formatPlatformName(
    platform.platformName?.trim() || DEFAULT_PLATFORM_NAME
  );

  return {
    platform,
    websiteName,
    primaryColor: platform.primaryColor,
    isMaintenanceMode: platform.isMaintenanceMode,
  };
};