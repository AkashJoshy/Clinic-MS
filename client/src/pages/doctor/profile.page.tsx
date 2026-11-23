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
import DoctorPageHeader from "@/components/shared/page-header.shared";

const DoctorProfilePage: React.FC = () => {
  const [data, setData] = useState<DoctorProfileData>(initialData);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const { primaryColor } = useAuthStore((state) => state.platform);
  const doctor = useAuthStore((state) => state.users.doctor);

  const isDark = doctor?.theme === "DARK";

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
        <DoctorPageHeader
          icon={UserRound}
          title={"My Profile"}
          description="Manage your professional details, clinic and consultation settings"
          isDark={isDark}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <DoctorAvatarCard isDark={isDark} />
          <DoctorAccountInfo department={data.department} isDark={isDark} />
          {/* <Button className="w-full">Add New Clinic</Button> */}
        </div>

        <div className="space-y-6 lg:col-span-2">
          <DoctorBioDetails isDark={isDark} />
          <DoctorClinicDetails isDark={isDark} />
        </div>
      </div>
      
    </div>
  );
};

export default DoctorProfilePage;
