import { useEffect } from "react";
import toast from "react-hot-toast";
import { fetchPlatformData } from "@/services/shared.service";
import { useAuthStore } from "@/store";

export const usePlatformData = () => {
  const setPlatformData = useAuthStore((state) => state.updatePlatform);

  useEffect(() => {
    const getPlatformData = async () => {
      try {
        const res = await fetchPlatformData();
        setPlatformData(res.data);
        console.log(`The Platform Primary Color after the update by Admin: `)
        console.log(res.data)
      } catch (error: any) {
        toast.error(error?.message || "Failed to load platform settings");
      }
    };

    getPlatformData();
  }, [setPlatformData]);
};
