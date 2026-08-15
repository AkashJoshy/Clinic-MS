import React, { useState } from "react";
import { UserRound } from "lucide-react";
import DoctorBioDetails from "@/components/shared/doctor/DoctorBioDetails";
import DoctorAddressDetails from "@/components/shared/doctor/DoctorAddressDetails";
import DoctorAvatarCard from "@/components/shared/doctor/DoctorAvatarCar";
import DoctorAccountInfo from "@/components/shared/doctor/DoctorAccountInfo";
import type { DoctorProfileData } from "@/types/doctor";
import { initialData } from "@/constants/doctor.constant";
import DoctorClinicDetails from "@/components/shared/doctor/DoctorClinicDetails";
import { Button } from "@/components/ui/button";

const DoctorProfilePage: React.FC = () => {
  const [data, setData] = useState<DoctorProfileData>(initialData);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handlePhotoChange = async (file: File) => {
    setIsUploadingPhoto(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  return (
    <div className="min-h-full p-6 lg:p-8 space-y-6 relative border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center">
          <UserRound size={20} className="text-[#1dc465]" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">My Profile</h1>
          <h6 className="text-[#8b9ab0] text-sm">
            Manage your professional details, clinic and consultation settings
          </h6>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <DoctorAvatarCard
            onPhotoChange={handlePhotoChange}
            isUploading={isUploadingPhoto}
          />
          <DoctorAccountInfo department={data.department} />
          <Button className="w-full">Add New Clinic</Button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <DoctorBioDetails />
          <DoctorClinicDetails />
          <DoctorAddressDetails />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
