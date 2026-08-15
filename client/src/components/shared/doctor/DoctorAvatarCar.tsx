import React, { useRef, useState } from "react";
import {
  Camera,
  Star,
  BadgeCheck,
  Clock3,
  ShieldAlert,
  ShieldX,
} from "lucide-react";
import type { Doctor, DoctorInfo } from "@/types/doctor";
import { useAuthStore } from "@/store";
import { useForm } from "react-hook-form";
import type { UpdatePersonalProfilePictureForm } from "@/schemas/patient/patient.schema";
import { updatePersonalProfilePictureSchema } from "@/schemas/patient/personalDetails.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutate } from "@/hooks/useMutate";
import { updateDoctorProfilePicture } from "@/services/doctor.service";
import toast from "react-hot-toast";

interface DoctorAvatarCardProps {
  // onPhotoChange?: (file: File) => Promise<void> | void;
  // isUploading?: boolean;
}

const statusStyles: Record<
  Doctor["status"],
  { icon: React.ReactNode; label: string; className: string }
> = {
  APPROVED: {
    icon: <BadgeCheck size={13} />,
    label: "Approved",
    className: "bg-[#1dc465]/10 text-[#1dc465]",
  },
  PENDING: {
    icon: <Clock3 size={13} />,
    label: "Pending review",
    className: "bg-amber-500/10 text-amber-400",
  },
  REJECTED: {
    icon: <ShieldX size={13} />,
    label: "Rejected",
    className: "bg-rose-500/10 text-rose-400",
  },
  SUSPENDED: {
    icon: <ShieldAlert size={13} />,
    label: "Suspended",
    className: "bg-rose-500/10 text-rose-400",
  },
};

const DoctorAvatarCard: React.FC = () => {
  const doctorProfile = useAuthStore((state) => state.doctor);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<UpdatePersonalProfilePictureForm>({
    resolver: zodResolver(updatePersonalProfilePictureSchema),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutate(updateDoctorProfilePicture, {
    onSuccess(data) {
      if (data?.data) {
        if (!doctorProfile) return;

        if (
          doctorProfile.doctor.id === data.data.ownerId ||
          data.data.pictureUrl
        ) {
          const updatedDoctorDetails: DoctorInfo = {
            ...doctorProfile,
            doctor: {
              ...doctorProfile?.doctor,
              profilePicture: {
                url: data.data.pictureUrl,
              },
            },
          };

          updateDoctor(updatedDoctorDetails);
        } else {
          toast.error("Unauthorized updation");
        }
      }
    },
  });

  if (!doctorProfile) return <h2>Loading.....</h2>;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const status =
    statusStyles[doctorProfile?.doctor?.status] ?? statusStyles.PENDING;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("profilePicture", file, {
      shouldValidate: true,
    });

    const valid = await trigger("profilePicture");

    if (!valid) return;

    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("doctorId", doctorProfile?.doctor?.id!);
    formData.append("profilePicture", file);

    mutate(formData);
  };

  const avatarSrc =
    preview ||
    doctorProfile.doctor?.profilePicture?.url ||
    "/default-doctor.png";

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 flex flex-col items-center text-center">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="Change profile photo"
        onClick={handleAvatarClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleAvatarClick();
        }}
        className="relative group cursor-pointer mb-4"
      >
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#101f2e] ring-1 ring-white/8 shadow-lg">
          <img
            src={avatarSrc}
            alt={doctorProfile.doctor?.displayName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="w-7 h-7 text-white" />
        </div>
        <div className="absolute bottom-0 right-1 bg-[#1dc465] p-1.5 rounded-full text-[#0d1a27] shadow-md border-2 border-[#0d1a27] pointer-events-none">
          <Camera className="w-3.5 h-3.5" />
        </div>
      </div>
      <h2>
        {errors.profilePicture && (
          <h2 className="text-red-500 text-[12px]">
            {String(errors?.profilePicture?.message)}
          </h2>
        )}
      </h2>

      <h2 className="text-white text-lg font-semibold">
        Dr. {doctorProfile?.doctor.displayName}
      </h2>
      <p className="text-[#8b9ab0] text-sm mt-0.5">
        {doctorProfile.doctor?.specialization}
      </p>

      <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.className}`}
        >
          {status.icon}
          {status.label}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#8b9ab0]">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          {doctorProfile.doctor?.averageRating.toFixed(1)} (
          {doctorProfile.doctor?.totalReviews})
        </span>
      </div>

      <div className="border-t border-white/8 w-full my-5" />

      <div className="grid grid-cols-2 gap-3 w-full text-left">
        <div>
          <p className="text-[#8b9ab0] text-xs">Doctor code</p>
          <p className="text-white text-sm font-medium mt-0.5">
            {doctorProfile.doctor?.doctorCode}
          </p>
        </div>
        <div>
          <p className="text-[#8b9ab0] text-xs">Qualification</p>
          <p className="text-white text-sm font-medium mt-0.5">
            {doctorProfile.doctor?.qualification}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={handleAvatarClick}
        className={`mt-5 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer bg-[#1dc465]/10 text-[#1dc465] hover:bg-[#1dc465]/15 ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending ? "Updating..." : "Change photo"}
      </button>
    </div>
  );
};

export default DoctorAvatarCard;
