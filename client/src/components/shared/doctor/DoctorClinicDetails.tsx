import React, { useState } from "react";
import {
  Building,
  MapPinned,
  Pencil,
  X,
  Check,
  Wallet,
  Timer,
  Globe,
  Video,
  Building2,
  Info,
} from "lucide-react";
import { useAuthStore } from "@/store";
import type { DoctorClinic } from "@/types/doctor-clinic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationDetailsSchema } from "@/schemas/doctor/consultation-details.schema";
import type { ConsulationDetailsSchema } from "@/schemas/doctor/doctor.schema";
import { cn } from "@/lib/utils";
import { useMutate } from "@/hooks/useMutate";
import { updateDoctorConsultationDetails } from "@/services/doctor.service";
import type { DoctorConsultationDetails } from "@/types/doctor";
import toast from "react-hot-toast";

const DoctorClinicDetails: React.FC = () => {
  const doctorProfile = useAuthStore((state) => state.doctor);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);
  const user = useAuthStore((state) => state.user);
  const [isAppointmentAccept, setIsAppointmentAccept] = useState<boolean>(
    doctorProfile?.doctorClinic?.isActive ?? false,
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsulationDetailsSchema>({
    resolver: zodResolver(consultationDetailsSchema),
    mode: "onSubmit",
  });

  if (!doctorProfile) return <h2>Loading...</h2>;

  const [isEditing, setIsEditing] = useState(false);

  if (!doctorProfile) {
    return <h2>Loading...</h2>;
  }

  const addressParts = [
    doctorProfile.clinic.clinicAddress?.addressLine,
    doctorProfile.clinic.clinicAddress?.city,
    doctorProfile.clinic.clinicAddress?.state,
    doctorProfile.clinic.clinicAddress?.country,
  ].filter(Boolean);

  const startEdit = () => {
    if (
      doctorProfile.doctor.id &&
      doctorProfile.doctorClinic.id &&
      user?.id &&
      doctorProfile.clinic.id
    ) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      reset({
        id: doctorProfile.doctorClinic.id,
        userId: user.id,
        doctorId: doctorProfile.doctor.id,
        clinicId: doctorProfile.clinic.id,
        consultationFee: doctorProfile.doctorClinic.consultationFee,
        type: doctorProfile.doctorClinic.type,
        slotDuration: doctorProfile.doctorClinic.slotDuration,
        timeZone,
        isActive: doctorProfile.doctorClinic.isActive,
      });
    }
    setIsEditing(true);
  };

  const { mutate, isPending } = useMutate(updateDoctorConsultationDetails, {
    onSuccess(data) {
      if (data.data) {
        updateDoctor({
          ...doctorProfile,
          doctorClinic: {
            id: doctorProfile.doctorClinic.id,
            ...data.data,
          },
        });
        setIsEditing(false);
      }
    },
  });

  const changeAppointmentActive = () => {
    setIsAppointmentAccept((prev) => {
      const isActive = !prev;
      setValue("isActive", isActive);
      return isActive;
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const fieldClasses = `w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 bg-[#101f2e] text-white placeholder:text-[#5b6b80] ${
    isEditing
      ? "border-[#1dc465]/40 focus:border-[#1dc465] focus:ring-1 focus:ring-[#1dc465]/40"
      : "border-white/8 cursor-default"
  }`;

  const labelClasses = "block text-xs font-medium text-[#8b9ab0] mb-1.5";

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div>
        <h3 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
          <Building className="w-4 h-4 text-[#1dc465]" />
          Clinic details
        </h3>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1dc465]/10 border border-[#1dc465]/20 flex items-center justify-center shrink-0">
            <span className="text-[#1dc465] font-semibold text-base">
              {doctorProfile.clinic.name?.[0]?.toUpperCase() ?? "C"}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-white font-medium text-sm">
              {doctorProfile.clinic.name}
            </p>

            <p className="text-[#8b9ab0] text-sm mt-1 leading-relaxed">
              {doctorProfile.clinic.about || "No description available."}
            </p>
          </div>
        </div>

        {addressParts.length > 0 && (
          <div className="flex items-start gap-2 mt-4 pt-4 border-t border-white/8">
            <MapPinned className="w-4 h-4 text-[#8b9ab0] mt-0.5 shrink-0" />

            <p className="text-sm text-[#c3cddb]">{addressParts.join(", ")}</p>
          </div>
        )}
      </div>
      <div className="my-6 border-t border-white/8" />

      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold text-base">
            Consultation settings
          </h3>

          {!isEditing ? (
            <button
              type="button"
              onClick={startEdit}
              className="flex items-center gap-1.5 text-xs font-medium text-[#1dc465] hover:text-[#15a050] transition-colors cursor-pointer"
            >
              <Pencil size={13} />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-1 text-xs font-medium text-[#8b9ab0] hover:text-white px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={13} />
                Cancel
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleSubmit(
                  (data) => {
                    if (!user?.id) return;

                    const consulationData = {
                      id: doctorProfile.doctorClinic.id,
                      userId: user.id,
                      doctorId: doctorProfile.doctor.id,
                      clinicId: doctorProfile.clinic.id,
                      consultationFee:
                        doctorProfile.doctorClinic.consultationFee,
                      slotDuration: doctorProfile.doctorClinic.slotDuration,
                      timeZone: doctorProfile.doctorClinic.timeZone,
                      type: doctorProfile.doctorClinic.type,
                      isActive: doctorProfile.doctorClinic.isActive,
                    };

                    const isDataSame =
                      consulationData.id === data.id &&
                      consulationData.userId === data.userId &&
                      consulationData.doctorId === data.doctorId &&
                      consulationData.clinicId === data.clinicId &&
                      consulationData.consultationFee ===
                        data.consultationFee &&
                      consulationData.slotDuration === data.slotDuration &&
                      consulationData.timeZone === data.timeZone &&
                      consulationData.type === data.type &&
                      consulationData.isActive === data.isActive;

                    if (isDataSame) {
                      toast.custom(
                        () => (
                          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow-lg">
                            <Info className="h-5 w-5 text-blue-600" />
                            <p className="text-sm font-medium text-blue-800">
                              No changes were made.
                            </p>
                          </div>
                        ),
                        {
                          position: "bottom-right",
                        },
                      );
                    } else {
                      mutate(data as DoctorConsultationDetails);
                    }
                  },
                  (error) => {
                    console.log(`Errors: `);
                    console.log(error);
                  },
                )}
                className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                  isPending
                    ? "bg-[#1dc465]/50 text-primary-100 cursor-not-allowed"
                    : "bg-[#1dc465] text-[#0d1a27] hover:bg-[#15a050] cursor-pointer"
                }`}
              >
                <Check aria-disabled={isPending} size={13} />
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>
              <span className="inline-flex items-center gap-1.5">
                <Wallet size={12} />
                Consultation fee
              </span>
            </label>

            {isEditing ? (
              <>
                <input
                  type="number"
                  min={10}
                  step={10}
                  className={fieldClasses}
                  {...register("consultationFee")}
                />
                {errors && errors.consultationFee && (
                  <h2 className="text-red-500 text-[11px] mt-2">
                    {errors.consultationFee?.message}
                  </h2>
                )}
              </>
            ) : (
              <p className="text-sm text-white px-3.5 py-2.5">
                ₹
                {doctorProfile.doctorClinic.consultationFee.toLocaleString(
                  "en-IN",
                )}
              </p>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <span className="inline-flex items-center gap-1.5">
                <Timer size={12} />
                Slot duration
              </span>
            </label>

            {isEditing ? (
              <>
                <input
                  type="number"
                  min={5}
                  step={5}
                  className={fieldClasses}
                  {...register("slotDuration")}
                />
                {errors && errors.slotDuration && (
                  <h2 className="text-red-500 text-[11px] mt-2">
                    {errors.slotDuration?.message}
                  </h2>
                )}
              </>
            ) : (
              <p className="text-sm text-white px-3.5 py-2.5">
                {doctorProfile.doctorClinic.slotDuration} min
              </p>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <span className="inline-flex items-center gap-1.5">
                <Globe size={12} />
                Time zone
              </span>
            </label>

            {isEditing ? (
              <input
                type="text"
                value={doctorProfile.doctorClinic.timeZone ?? "Not Set"}
                readOnly
                className={cn(fieldClasses, "cursor-not-allowed ")}
              />
            ) : (
              <p className="text-sm text-white px-3.5 py-2.5">
                {doctorProfile.doctorClinic.timeZone}
              </p>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <span className="inline-flex items-center gap-1.5">
                {doctorProfile.doctorClinic.type === "ONLINE" ? (
                  <Video size={12} />
                ) : (
                  <Building2 size={12} />
                )}
                Consultation type
              </span>
            </label>

            {isEditing ? (
              <>
                <select className={fieldClasses} {...register("type")}>
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                  <option value="BOTH">Both</option>
                </select>
                {errors && errors.type && (
                  <h2 className="text-red-500 text-[11px] mt-2">
                    {errors.type?.message}
                  </h2>
                )}
              </>
            ) : (
              <p className="text-sm text-white px-3.5 py-2.5 capitalize">
                {doctorProfile.doctorClinic.type.toLowerCase()}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/8">
          <div>
            <p className="text-sm text-white font-medium">
              Accepting appointments
            </p>

            <p className="text-xs text-[#8b9ab0] mt-0.5">
              Patients can only book slots while this is on.
            </p>
          </div>

          <button
            type="button"
            disabled={!isEditing}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
              isAppointmentAccept ? "bg-[#1dc465]" : "bg-white/10"
            } ${
              !isEditing ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
          >
            <span
              onClick={changeAppointmentActive}
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                isAppointmentAccept ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorClinicDetails;
