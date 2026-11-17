import { usePlatformData } from "@/hooks/use-platform-data.hook";
import { usePrimaryColor } from "@/hooks/use-primary-color.hook";
import { Outlet } from "react-router-dom";

const PlatformConfigInitializer = () => {
  usePlatformData();
  usePrimaryColor()

  return <Outlet />;
};

export default PlatformConfigInitializer;
