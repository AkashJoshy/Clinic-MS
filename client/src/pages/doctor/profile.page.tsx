import React, { useState } from "react";
import { UserRound } from "lucide-react";
import DoctorBioDetails from "@/components/shared/doctor/profile/bio-details.shared";
import DoctorAddressDetails from "@/components/shared/doctor/profile/address-details.shared";
import DoctorAvatarCard from "@/components/shared/doctor/profile/avatar-card.shared";
import DoctorAccountInfo from "@/components/shared/doctor/profile/account-info.shared";
import type { DoctorProfileData } from "@/types/doctor";
import { initialData } from "@/constants/doctor.constant";
import DoctorClinicDetails from "@/components/shared/doctor/profile/clinic-details.shared";
import { useAuthStore } from "@/store";

const DoctorProfilePage: React.FC = () => {
  const [data, setData] = useState<DoctorProfileData>(initialData);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const { primaryColor } = useAuthStore((state) => state.platform);

  const isDark = true

  const handlePhotoChange = async (file: File) => {
    setIsUploadingPhoto(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  return (
    <div
      className={`
        relative min-h-full space-y-6 border p-6 shadow-2xs
        lg:p-8
        ${
          isDark
            ? "border-white/10 bg-white/[0.02]"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{
            backgroundColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)`,
            borderColor: `color-mix(in srgb, ${primaryColor} 25%, transparent)`,
          }}
        >
          <UserRound size={20} style={{ color: primaryColor }} />
        </div>

        <div>
          <h1
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            My Profile
          </h1>

          <h6
            className={`text-sm ${
              isDark ? "text-[#8b9ab0]" : "text-slate-500"
            }`}
          >
            Manage your professional details, clinic and consultation settings
          </h6>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <DoctorAvatarCard />
          <DoctorAccountInfo department={data.department} />
          {/* <Button className="w-full">Add New Clinic</Button> */}
        </div>

        <div className="space-y-6 lg:col-span-2">
          <DoctorBioDetails />
          <DoctorClinicDetails />
          {/* <DoctorAddressDetails /> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
