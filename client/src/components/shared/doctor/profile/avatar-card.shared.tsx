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
import { updatePersonalProfilePictureSchema } from "@/schemas/patient/personal-details.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutate } from "@/hooks/use-mutate.hook";
import { updateDoctorProfilePicture } from "@/services/doctor.service";
import toast from "react-hot-toast";
import DoctorAvatarCardSkeleton from "../../skeletons/doctor-avatar-card.skeleton";

const statusStyles: Record<
  Doctor["status"],
  { icon: React.ReactNode; label: string; className: string }
> = {
  APPROVED: {
    icon: <BadgeCheck size={13} />,
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-400",
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
  const { primaryColor } = useAuthStore((state) => state.platform);

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

  if (!doctorProfile) {
    return <DoctorAvatarCardSkeleton />;
  }

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
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#0d1a27] p-6 text-center">
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
        className="group relative mb-4 cursor-pointer"
      >
        <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#101f2e] shadow-lg ring-1 ring-white/10">
          <img
            src={avatarSrc}
            alt={doctorProfile.doctor?.displayName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Camera className="h-7 w-7 text-white" />
        </div>

        <div
          className="pointer-events-none absolute bottom-0 right-1 rounded-full border-2 border-[#0d1a27] p-1.5 shadow-md"
          style={{
            backgroundColor: primaryColor,
            color: "#ffffff",
          }}
        >
          <Camera className="h-3.5 w-3.5" />
        </div>
      </div>

      {errors.profilePicture && (
        <p className="text-[12px] text-red-500">
          {String(errors.profilePicture.message)}
        </p>
      )}

      <h2 className="text-lg font-semibold text-white">
        Dr. {doctorProfile?.doctor.displayName}
      </h2>

      <p className="mt-0.5 text-sm text-[#8b9ab0]">
        {doctorProfile.doctor?.specialization}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
        >
          {status.icon}
          {status.label}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-[#8b9ab0]">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {doctorProfile.doctor?.averageRating.toFixed(1)} (
          {doctorProfile.doctor?.totalReviews})
        </span>
      </div>

      <div className="my-5 w-full border-t border-white/10" />

      <div className="grid w-full grid-cols-2 gap-3 text-left">
        <div>
          <p className="text-xs text-[#8b9ab0]">Doctor code</p>
          <p className="mt-0.5 text-sm font-medium text-white">
            {doctorProfile.doctor?.doctorCode}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#8b9ab0]">Qualification</p>
          <p className="mt-0.5 text-sm font-medium text-white">
            {doctorProfile.doctor?.qualification}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={handleAvatarClick}
        className={`
          mt-5 w-full cursor-pointer rounded-lg px-4 py-2
          text-sm font-medium transition-colors duration-200
          disabled:cursor-not-allowed disabled:opacity-50
        `}
        style={{
          backgroundColor: `color-mix(in srgb, ${primaryColor} 12%, transparent)`,
          color: primaryColor,
        }}
      >
        {isPending ? "Updating..." : "Change photo"}
      </button>
    </div>
  );
};

export default DoctorAvatarCard;
