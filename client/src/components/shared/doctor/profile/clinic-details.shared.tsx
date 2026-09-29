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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";
import { useMutate } from "@/hooks/use-mutate.hook";
import { consultationDetailsSchema } from "@/schemas/doctor/consultation-details.schema";
import type { ConsulationDetailsSchema } from "@/schemas/doctor/doctor.schema";
import { updateDoctorConsultationDetails } from "@/services/doctor.service";
import type { DoctorConsultationDetails } from "@/types/doctor";

import DoctorClinicDetailsSkeleton from "../../skeletons/doctor-clinic-details.skeleton";

const FIELD_CLASSES =
  "w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 bg-[#101f2e] text-white placeholder:text-[#5b6b80]";

const LABEL_CLASSES =
  "block text-xs font-medium text-[#8b9ab0] mb-1.5";

const SETTING_FIELDS = [
  {
    key: "consultationFee",
    label: "Consultation fee",
    icon: Wallet,
    display: (value: number) => `₹${value.toLocaleString("en-IN")}`,
    input: "number",
    min: 10,
    step: 10,
  },
  {
    key: "slotDuration",
    label: "Slot duration",
    icon: Timer,
    display: (value: number) => `${value} min`,
    input: "number",
    min: 5,
    step: 5,
  },
] as const;

const DoctorClinicDetails: React.FC = () => {
  const doctorProfile = useAuthStore((state) => state.doctor);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);
  const { doctor: user } = useAuthStore((state) => state.users);

  const [editingClinicId, setEditingClinicId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ConsulationDetailsSchema>({
    resolver: zodResolver(consultationDetailsSchema),
    mode: "onSubmit",
  });

  const isActive = watch("isActive");

  const { mutate, isPending } = useMutate(updateDoctorConsultationDetails, {
    onSuccess(data) {
      if (!data.data || !editingClinicId) return;

      updateDoctor({
        ...doctorProfile!,
        doctorClinicDetails: doctorProfile!.doctorClinicDetails.map(
          (clinicDetails) =>
            clinicDetails.id === editingClinicId
              ? {
                  ...clinicDetails,
                  ...data.data,
                }
              : clinicDetails,
        ),
      });

      setEditingClinicId(null);
      reset();
    },
  });

  if (!doctorProfile) {
    return <DoctorClinicDetailsSkeleton />;
  }

  const clinicDetails = doctorProfile.doctorClinicDetails ?? [];

  const startEdit = (
    details: (typeof clinicDetails)[number],
  ) => {
    if (!user?.id || !doctorProfile.doctor.id || !details.clinic?.id) {
      return;
    }

    reset({
      id: details.id!,
      userId: user.id!,
      doctorId: doctorProfile.doctor.id,
      clinicId: details.clinic.id,
      consultationFee: details.consultationFee,
      slotDuration: details.slotDuration,
      timeZone: details.timeZone,
      type: details.type,
      isActive: details.isActive,
    });

    setEditingClinicId(details.id);
  };

  const cancelEdit = () => {
    setEditingClinicId(null);
    reset();
  };

  const onSubmit = (data: ConsulationDetailsSchema) => {
    if (!user?.id) return;

    const currentClinic = clinicDetails.find(
      (clinic) => clinic.id === data.id,
    );

    if (!currentClinic) return;

    const currentData = {
      id: currentClinic.id,
      userId: user.id,
      doctorId: doctorProfile.doctor.id,
      clinicId: currentClinic.clinic?.id,
      consultationFee: currentClinic.consultationFee,
      slotDuration: currentClinic.slotDuration,
      timeZone: currentClinic.timeZone,
      type: currentClinic.type,
      isActive: currentClinic.isActive,
    };

    const hasChanges =
      currentData.consultationFee !== data.consultationFee ||
      currentData.slotDuration !== data.slotDuration ||
      currentData.timeZone !== data.timeZone ||
      currentData.type !== data.type ||
      currentData.isActive !== data.isActive;

    if (!hasChanges) {
      toast.custom(
        () => (
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow-lg">
            <Info className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">
              No changes were made.
            </p>
          </div>
        ),
        { position: "bottom-right" },
      );

      return;
    }

    mutate(data as DoctorConsultationDetails);
  };

  const fieldClasses = cn(
    FIELD_CLASSES,
    editingClinicId
      ? "border-[#1dc465]/40 focus:border-[#1dc465] focus:ring-1 focus:ring-[#1dc465]/40"
      : "border-white/8 cursor-default",
  );

  return (
    <div className="space-y-6">
      {clinicDetails.map((details) => {
        const isEditing = editingClinicId === details.id;

        const addressParts = [
          details.clinicAddress?.addressLine,
          details.clinicAddress?.city,
          details.clinicAddress?.state,
          details.clinicAddress?.country,
        ].filter(Boolean);

        const consultationTypeIcon =
          details.type === "ONLINE" ? Video : Building2;

        return (
          <div
            key={details.id}
            className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6"
          >
            {/* Clinic */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold text-base flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1dc465]" />
                  Clinic details
                </h3>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => startEdit(details)}
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
                      onClick={handleSubmit(onSubmit)}
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors",
                        isPending
                          ? "bg-[#1dc465]/50 text-primary-100 cursor-not-allowed"
                          : "bg-[#1dc465] text-[#0d1a27] hover:bg-[#15a050] cursor-pointer",
                      )}
                    >
                      <Check size={13} />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1dc465]/10 border border-[#1dc465]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#1dc465] font-semibold text-base">
                    {details.clinic?.name?.[0]?.toUpperCase() ?? "C"}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-white font-medium text-sm">
                    {details.clinic?.name}
                  </p>

                  <p className="text-[#8b9ab0] text-sm mt-1 leading-relaxed">
                    {details.clinic?.about || "No description available."}
                  </p>
                </div>
              </div>

              {addressParts.length > 0 && (
                <div className="flex items-start gap-2 mt-4 pt-4 border-t border-white/8">
                  <MapPinned className="w-4 h-4 text-[#8b9ab0] mt-0.5 shrink-0" />

                  <p className="text-sm text-[#c3cddb]">
                    {addressParts.join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="my-6 border-t border-white/8" />

            {/* Consultation */}
            <div>
              <h3 className="text-white font-semibold text-base mb-5">
                Consultation settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SETTING_FIELDS.map((field) => {
                  const Icon = field.icon;
                  const value = details[
                    field.key
                  ] as number;

                  const error =
                    errors[field.key as keyof ConsulationDetailsSchema];

                  return (
                    <div key={field.key}>
                      <label className={LABEL_CLASSES}>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon size={12} />
                          {field.label}
                        </span>
                      </label>

                      {isEditing ? (
                        <>
                          <input
                            type={field.input}
                            min={field.min}
                            step={field.step}
                            className={fieldClasses}
                            {...register(
                              field.key as keyof ConsulationDetailsSchema,
                              {
                                valueAsNumber: true,
                              },
                            )}
                          />

                          {error && (
                            <p className="text-red-500 text-[11px] mt-2">
                              {error.message}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-white px-3.5 py-2.5">
                          {field.display(value)}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Time zone */}
                <div>
                  <label className={LABEL_CLASSES}>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe size={12} />
                      Time zone
                    </span>
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      value={details.timeZone ?? "Not Set"}
                      readOnly
                      className={cn(
                        fieldClasses,
                        "cursor-not-allowed",
                      )}
                    />
                  ) : (
                    <p className="text-sm text-white px-3.5 py-2.5">
                      {details.timeZone || "Not Set"}
                    </p>
                  )}
                </div>

                {/* Consultation type */}
                <div>
                  <label className={LABEL_CLASSES}>
                    <span className="inline-flex items-center gap-1.5">
                      {React.createElement(consultationTypeIcon, {
                        size: 12,
                      })}
                      Consultation type
                    </span>
                  </label>

                  {isEditing ? (
                    <>
                      <select
                        className={fieldClasses}
                        {...register("type")}
                      >
                        <option value="ONLINE">Online</option>
                        <option value="OFFLINE">Offline</option>
                        <option value="BOTH">Both</option>
                      </select>

                      {errors.type && (
                        <p className="text-red-500 text-[11px] mt-2">
                          {errors.type.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-white px-3.5 py-2.5 capitalize">
                      {details.type.toLowerCase()}
                    </p>
                  )}
                </div>
              </div>

              {/* Appointment status */}
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
                  onClick={() =>
                    isEditing &&
                    reset({
                      ...watch(),
                      isActive: !isActive,
                    })
                  }
                  className={cn(
                    "relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0",
                    isActive ? "bg-[#1dc465]" : "bg-white/10",
                    !isEditing
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200",
                      isActive
                        ? "translate-x-5"
                        : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {!clinicDetails.length && (
        <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-8 text-center">
          <Building className="w-8 h-8 text-[#5b6b80] mx-auto mb-3" />

          <p className="text-white font-medium text-sm">
            No clinics available
          </p>

          <p className="text-[#8b9ab0] text-xs mt-1">
            Clinic details will appear here once a clinic is associated.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorClinicDetails;