import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getDoctorKycDetails } from "@/services/doctor.service";
import type {
  AadhaarDetailsData,
  BankDetailsData,
  PanDetailsData,
} from "@/types/kyc";

export const useDoctorKyc = () => {
  const [panDetails, setPanDetails] = useState<PanDetailsData | null>(null);

  const [bankDetails, setBankDetails] = useState<BankDetailsData | null>(null);

  const [aadhaarDetails, setAadhaarDetails] =
    useState<AadhaarDetailsData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchKycDetails = async () => {
      try {
        setIsLoading(true);

        const res = await getDoctorKycDetails();

        if (!isMounted || !res.data) return;

        setPanDetails(res.data.pan);
        setBankDetails(res.data.bank);
        setAadhaarDetails(res.data.aadhaar);
      } catch (error: unknown) {
        if (!isMounted) return;

        const message =
          error instanceof Error
            ? error.message
            : "Error while fetching KYC details";

        toast.error(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchKycDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    panDetails,
    bankDetails,
    aadhaarDetails,
    isLoading,
  };
};
