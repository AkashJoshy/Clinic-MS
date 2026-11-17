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
  "w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 bg-[#101f2e] text-white placeholder:text-[#5b6b80] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]";

const LABEL_CLASSES = "block text-xs font-medium text-[#8b9ab0] mb-1.5";

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
  const { primaryColor } = useAuthStore((state) => state.platform);

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
      if (!data.data || !editingClinicId || !doctorProfile) return;

      updateDoctor({
        ...doctorProfile,
        doctorClinicDetails: doctorProfile.doctorClinicDetails.map(
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

  const primaryTint = `color-mix(in srgb, ${primaryColor} 10%, transparent)`;
  const primaryBorder = `color-mix(in srgb, ${primaryColor} 25%, transparent)`;

  const primaryStyle = {
    "--primary-color": primaryColor,
  } as React.CSSProperties;

  const startEdit = (details: (typeof clinicDetails)[number]) => {
    if (!user?.id || !doctorProfile.doctor.id || !details.clinic?.id) {
      return;
    }

    reset({
      id: details.id!,
      userId: user.id!,
      doctorId: doctorProfile.doctor.id,
      clinicId: details.clinic.id,
      consultationFee: details.consultationFee,
      slotDuration: details.slotRules.sessionDuration,
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

    const currentClinic = clinicDetails.find((clinic) => clinic.id === data.id);

    if (!currentClinic) return;

    const currentData = {
      id: currentClinic.id,
      userId: user.id,
      doctorId: doctorProfile.doctor.id,
      clinicId: currentClinic.clinic?.id,
      consultationFee: currentClinic.consultationFee,
      slotDuration: currentClinic.slotRules.sessionDuration,
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
    editingClinicId ? "border-white/10" : "border-white/8 cursor-default",
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
            className="rounded-2xl border border-white/8 bg-[#0d1a27] p-6"
          >
            {/* Clinic */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Building
                    className="h-4 w-4"
                    style={{ color: primaryColor }}
                  />
                  Clinic details
                </h3>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => startEdit(details)}
                    className="flex cursor-pointer items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
                    style={{ color: primaryColor }}
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#8b9ab0] transition-colors hover:text-white"
                    >
                      <X size={13} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={handleSubmit(onSubmit)}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: isPending ? primaryTint : primaryColor,
                        color: isPending ? primaryColor : "#0d1a27",
                        opacity: isPending ? 0.6 : 1,
                      }}
                    >
                      <Check size={13} />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    backgroundColor: primaryTint,
                    borderColor: primaryBorder,
                  }}
                >
                  <span
                    className="text-base font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {details.clinic?.name?.[0]?.toUpperCase() ?? "C"}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">
                    {details.clinic?.name}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-[#8b9ab0]">
                    {details.clinic?.about || "No description available."}
                  </p>
                </div>
              </div>

              {addressParts.length > 0 && (
                <div className="mt-4 flex items-start gap-2 border-t border-white/8 pt-4">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-[#8b9ab0]" />

                  <p className="text-sm text-[#c3cddb]">
                    {addressParts.join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="my-6 border-t border-white/8" />

            {/* Consultation */}
            <div>
              <h3 className="mb-5 text-base font-semibold text-white">
                Consultation settings
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {SETTING_FIELDS.map((field) => {
                  const Icon = field.icon;
                  const value = details[field.key] as number;

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
                            style={primaryStyle}
                            {...register(
                              field.key as keyof ConsulationDetailsSchema,
                              {
                                valueAsNumber: true,
                              },
                            )}
                          />

                          {error && (
                            <p className="mt-2 text-[11px] text-red-500">
                              {error.message}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="px-3.5 py-2.5 text-sm text-white">
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
                      className={cn(fieldClasses, "cursor-not-allowed")}
                    />
                  ) : (
                    <p className="px-3.5 py-2.5 text-sm text-white">
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
                        style={primaryStyle}
                        {...register("type")}
                      >
                        <option value="ONLINE">Online</option>
                        <option value="OFFLINE">Offline</option>
                        <option value="BOTH">Both</option>
                      </select>

                      {errors.type && (
                        <p className="mt-2 text-[11px] text-red-500">
                          {errors.type.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="px-3.5 py-2.5 text-sm capitalize text-white">
                      {details.type.toLowerCase()}
                    </p>
                  )}
                </div>
              </div>

              {/* Appointment status */}
              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    Accepting appointments
                  </p>

                  <p className="mt-0.5 text-xs text-[#8b9ab0]">
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
                    "relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
                    !isEditing
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer",
                  )}
                  style={{
                    backgroundColor: isActive
                      ? primaryColor
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    className={cn(
                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
                      isActive ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {!clinicDetails.length && (
        <div className="rounded-2xl border border-white/8 bg-[#0d1a27] p-8 text-center">
          <Building className="mx-auto mb-3 h-8 w-8 text-[#5b6b80]" />

          <p className="text-sm font-medium text-white">No clinics available</p>

          <p className="mt-1 text-xs text-[#8b9ab0]">
            Clinic details will appear here once a clinic is associated.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorClinicDetails;
