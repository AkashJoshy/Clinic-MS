import React, { useEffect, useState } from "react";
import {
  Building,
  Pencil,
  X,
  Check,
  Wallet,
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
import { updateDoctorConsultationDetails } from "@/services/doctor.service";
import type { DoctorConsultationDetails } from "@/types/doctor";
import DoctorClinicDetailsSkeleton from "../../skeletons/doctor-clinic-details.skeleton";
import ConsultationDetails from "./consulations-details.shared";
import type { ConsulationDetailsSchema } from "@/schemas/doctor/doctor.schema";
import DoctorAddressDetails from "./address-details.shared";
import type { ThemeProps } from "@/types/common";

const FIELD_CLASSES =
  "w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]";

export const LABEL_CLASSES = "block text-xs font-medium mb-1.5";

export const SETTING_FIELDS = [
  {
    key: "consultationFee",
    label: "Consultation fee",
    icon: Wallet,
    display: (value: number) => `₹${value.toLocaleString("en-IN")}`,
    input: "number",
    min: 10,
    step: 10,
  },
] as const;

const DoctorClinicDetails: React.FC<ThemeProps> = ({ isDark }) => {
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
    setValue,
    formState: { errors },
  } = useForm<ConsulationDetailsSchema>({
    resolver: zodResolver(consultationDetailsSchema),
    mode: "onSubmit",
  });

  const isActive = watch("isActive");

  const { mutate, isPending } = useMutate(updateDoctorConsultationDetails, {
    onSuccess(data) {
      if (!data.data || !editingClinicId || !doctorProfile) return;

      const { isActive, timeZone, consultationFee, type } = data.data;

      if (data.data)
        updateDoctor({
          ...doctorProfile,
          doctorClinicDetails: doctorProfile.doctorClinicDetails.map(
            (clinicDetails) =>
              clinicDetails.id === editingClinicId
                ? {
                    ...clinicDetails,
                    isActive,
                    timeZone,
                    consultationFee,
                    type,
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
      userId: user.id,
      doctorId: doctorProfile.doctor.id,
      clinicId: details.clinic.id,
      consultationFee: details.consultationFee,
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
      timeZone: currentClinic.timeZone,
      type: currentClinic.type,
      isActive: currentClinic.isActive,
    };

    const hasChanges =
      currentData.consultationFee !== data.consultationFee ||
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
    isDark
      ? "bg-[#101f2e] text-white placeholder:text-[#5b6b80]"
      : "bg-white text-slate-900 placeholder:text-slate-400",
    editingClinicId
      ? isDark
        ? "border-white/10"
        : "border-slate-300"
      : isDark
        ? "border-white/8 cursor-default"
        : "border-slate-200 cursor-default",
  );

  return (
    <div className="space-y-6">
      {clinicDetails.map((details) => {
        const isEditing = editingClinicId === details.id;

        const consultationTypeIcon =
          details.type === "ONLINE" ? Video : Building2;

        return (
          <div
            key={details.id}
            className={`rounded-2xl border p-6 shadow-lg transition-shadow duration-200 ${
              isDark
                ? "border-white/10 bg-[#0d1a27] shadow-black/20"
                : "border-slate-200 bg-white shadow-slate-200/70"
            }`}
          >
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3
                  className={`flex items-center gap-2 text-base font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
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
                      className={`flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        isDark
                          ? "text-[#8b9ab0] hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
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
                  <p
                    className={`text-sm font-medium ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {details.clinic?.name}
                  </p>

                  <p
                    className={`mt-1 text-sm leading-relaxed ${
                      isDark ? "text-[#8b9ab0]" : "text-slate-600"
                    }`}
                  >
                    {details.clinic?.about || "No description available."}
                  </p>
                </div>
              </div>
            </div>

            <ConsultationDetails
              details={{
                clinicId: details.clinic?.id!,
                doctorId: doctorProfile.doctor.id!,
                consultationFee: details.consultationFee,
                id: details.id!,
                isActive: details.isActive,
                timeZone: details.timeZone,
                type: details.type,
                userId: user?.id!,
              }}
              isEditing={isEditing}
              primaryColor={primaryColor}
              primaryStyle={primaryStyle}
              fieldClasses={fieldClasses}
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
              consultationTypeIcon={consultationTypeIcon}
              isDark={isDark}
            />

            <DoctorAddressDetails
              doctorProfile={doctorProfile}
              clinicDetails={details}
              isDark={isDark}
            />
          </div>
        );
      })}

      {!clinicDetails.length && (
        <div
          className={`rounded-2xl border p-8 text-center shadow-lg ${
            isDark
              ? "border-white/10 bg-[#0d1a27] shadow-black/20"
              : "border-slate-200 bg-white shadow-slate-200/70"
          }`}
        >
          <Building
            className={`mx-auto mb-3 h-8 w-8 ${
              isDark ? "text-[#5b6b80]" : "text-slate-400"
            }`}
          />

          <p
            className={`text-sm font-medium ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            No clinics available
          </p>

          <p
            className={`mt-1 text-xs ${
              isDark ? "text-[#8b9ab0]" : "text-slate-600"
            }`}
          >
            Clinic details will appear here once a clinic is associated.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorClinicDetails;
