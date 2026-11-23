import React, { useEffect, useState } from "react";
import { Pencil, X, Check, Plus, Info } from "lucide-react";
import type {
  Doctor,
  DoctorInfo,
  DoctorProffesionalDetails,
} from "@/types/doctor";
import { useAuthStore } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENDER } from "@/constants/form-fields.constants";
import { professionalDetailsSchema } from "@/schemas/doctor/professional-details.schema";
import type { ProffessionalDetailsSchema } from "@/schemas/doctor/doctor.schema";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/use-mutate.hook";
import { updateDoctorProfessionalDetails } from "@/services/doctor.service";
import DoctorBioDetailsSkeleton from "../../skeletons/doctor-bio-details.skeleton";
import type { ThemeProps } from "@/types/common";

const DoctorBioDetails: React.FC<ThemeProps> = ({ isDark }) => {
  const doctorProfile = useAuthStore((state) => state.doctor);
  const { doctor: user } = useAuthStore((state) => state.users);
  const { primaryColor } = useAuthStore((state) => state.platform);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);

  const [isEditing, setIsEditing] = useState(false);
  const [languages, setLanguages] = useState<string[]>(
    doctorProfile?.doctor.languages ?? [],
  );
  const [languageInput, setLanguageInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProffessionalDetailsSchema>({
    resolver: zodResolver(professionalDetailsSchema),
    mode: "onSubmit",
    defaultValues: {
      languages: [],
      licenceNumber: "",
      qualification: "",
      specialization: "",
    },
  });

  const { mutate, isPending } = useMutate(updateDoctorProfessionalDetails, {
    onSuccess(data) {
      if (data?.data && doctorProfile) {
        const doctorData = data.data;
        const { userId, patientId, ...updatedData } = doctorData;

        const professionalDetails: DoctorInfo = {
          ...doctorProfile,
          doctor: {
            ...doctorProfile.doctor,
            ...updatedData,
          },
        };

        updateDoctor(professionalDetails);
        setIsEditing(false);
      }
    },
  });

  useEffect(() => {
    if (doctorProfile) {
      setLanguages(doctorProfile.doctor.languages ?? []);
    }
  }, [doctorProfile]);

  if (!doctorProfile) return <DoctorBioDetailsSkeleton />;

  const startEdit = () => {
    reset({
      id: doctorProfile.doctor.id!,
      userId: user?.id!,
      gender: doctorProfile.doctor.gender,
      experienceYears: doctorProfile.doctor.experienceYears,
      bio: doctorProfile.doctor.bio ?? "",
      licenceNumber: doctorProfile.doctor.licenceNumber,
      qualification: doctorProfile.doctor.qualification,
      specialization: doctorProfile.doctor.specialization,
      languages: doctorProfile.doctor.languages,
    });

    setLanguages(doctorProfile.doctor.languages);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setLanguages(doctorProfile.doctor.languages);
  };

  const addLanguage = () => {
    const value = languageInput.trim().toUpperCase();

    if (!value || languages.includes(value)) return;

    setLanguages((prev) => {
      const res = [...prev, value];
      setValue("languages", res);
      return res;
    });

    setLanguageInput("");
  };

  const removeLanguage = (lang: string) => {
    setLanguages((prev) => {
      const res = prev.filter((l) => l !== lang);
      setValue("languages", res);
      return res;
    });
  };

  const fieldClasses = `w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all duration-200 placeholder:opacity-100 ${
    isDark
      ? "bg-[#101f2e] text-white placeholder:text-[#5b6b80]"
      : "bg-white text-slate-900 placeholder:text-slate-400"
  } ${
    isEditing
      ? isDark
        ? "border-none focus:ring-1"
        : "border-none focus:ring-1"
      : isDark
        ? "border-none cursor-default"
        : "border-none cursor-default"
  }`;

  const labelClasses = `mb-1.5 block text-xs font-medium ${
    isDark ? "text-[#8b9ab0]" : "text-slate-600"
  }`;

  const valueClasses = `px-3.5 py-2.5 text-sm ${
    isDark ? "text-white" : "text-slate-900"
  }`;

  const mutedValueClasses = `px-3.5 py-2.5 text-sm leading-relaxed ${
    isDark ? "text-[#c3cddb]" : "text-slate-700"
  }`;

  const primaryTint = `color-mix(in srgb, ${primaryColor} 10%, transparent)`;
  const primaryBorder = `color-mix(in srgb, ${primaryColor} 40%, transparent)`;

  return (
    <div
      className={`rounded-2xl border p-6 shadow-lg transition-shadow duration-200 ${
        isDark
          ? "border-none bg-[#0d1a27] shadow-black/20"
          : "border-none bg-white shadow-slate-200/70"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3
          className={`text-base font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Professional details
        </h3>

        {!isEditing ? (
          <button
            type="button"
            onClick={startEdit}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: primaryColor }}
          >
            <Pencil size={13} /> Edit
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
              <X size={13} /> Cancel
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={handleSubmit(
                (data) => {
                  if (!user?.id) return;

                  const professionalData = {
                    id: doctorProfile.doctor.id,
                    userId: user.id,
                    bio: doctorProfile.doctor.bio,
                    experienceYears: doctorProfile.doctor.experienceYears,
                    gender: doctorProfile.doctor.gender,
                    licenceNumber: doctorProfile.doctor.licenceNumber,
                    qualification: doctorProfile.doctor.qualification,
                    specialization: doctorProfile.doctor.specialization,
                  };

                  const isSameData =
                    professionalData.id === data.id &&
                    professionalData.userId === data.userId &&
                    professionalData.bio === data.bio &&
                    professionalData.experienceYears === data.experienceYears &&
                    professionalData.gender === data.gender &&
                    professionalData.licenceNumber === data.licenceNumber &&
                    professionalData.qualification === data.qualification &&
                    professionalData.specialization === data.specialization;

                  const isSame =
                    doctorProfile.doctor.languages.length ===
                      data.languages.length &&
                    [...doctorProfile.doctor.languages]
                      .sort()
                      .every(
                        (value, index) =>
                          value === [...data.languages].sort()[index],
                      );

                  if (isSameData && isSame) {
                    setIsEditing(false);

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
                    mutate(data as DoctorProffesionalDetails);
                    setIsEditing(false);
                  }
                },
                () => {
                  toast.error("Data is incomplete for the updation");
                },
              )}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed"
              style={{
                backgroundColor: isPending ? primaryTint : primaryColor,
                color: isPending ? primaryColor : "#0d1a27",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              <Check aria-disabled={isPending} size={13} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Gender</label>

          {isEditing ? (
            <>
              <select
                className={fieldClasses}
                style={{
                  borderColor: errors.gender ? undefined : primaryBorder,
                }}
                {...register("gender")}
              >
                {GENDER.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0) + g.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              {errors.gender && (
                <h2 className="mt-2 text-[11px] text-red-500">
                  {errors.gender?.message}
                </h2>
              )}
            </>
          ) : (
            <p className={valueClasses}>
              {doctorProfile.doctor.gender.charAt(0) +
                doctorProfile.doctor.gender.slice(1).toLowerCase()}
            </p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Experience (years)</label>

          {isEditing ? (
            <>
              <input
                type="number"
                className={fieldClasses}
                {...register("experienceYears")}
              />

              {errors.experienceYears && (
                <h2 className="mt-2 text-[11px] text-red-500">
                  {errors.experienceYears?.message}
                </h2>
              )}
            </>
          ) : (
            <p className={valueClasses}>
              {doctorProfile.doctor.experienceYears} years
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClasses}>Bio</label>

        {isEditing ? (
          <>
            <textarea
              rows={4}
              placeholder="Tell patients a little about your practice and approach to care."
              className={`${fieldClasses} resize-none`}
              {...register("bio")}
            />

            {errors.bio && (
              <h2 className="mt-2 text-[11px] text-red-500">
                {errors.bio?.message}
              </h2>
            )}
          </>
        ) : (
          <p className={mutedValueClasses}>
            {doctorProfile.doctor.bio || "No bio added yet."}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label className={labelClasses}>Licence Number</label>

        {isEditing ? (
          <>
            <input
              placeholder="Enter your licence number"
              className={`${fieldClasses} resize-none`}
              {...register("licenceNumber")}
            />

            {errors.licenceNumber && (
              <h2 className="mt-2 text-[11px] text-red-500">
                {errors.licenceNumber?.message}
              </h2>
            )}
          </>
        ) : (
          <p className={mutedValueClasses}>
            {doctorProfile.doctor.licenceNumber ||
              "Licence Number not provided"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mt-4">
          <label className={labelClasses}>Qualification</label>

          {isEditing ? (
            <>
              <input
                placeholder="Enter your qualification"
                className={`${fieldClasses} resize-none`}
                {...register("qualification")}
              />

              {errors.qualification && (
                <h2 className="mt-2 text-[11px] text-red-500">
                  {errors.qualification?.message}
                </h2>
              )}
            </>
          ) : (
            <p className={mutedValueClasses}>
              {doctorProfile.doctor.qualification ||
                "Licence Number not provided"}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className={labelClasses}>Specialization</label>

          {isEditing ? (
            <>
              <input
                placeholder="Enter your specialization"
                className={`${fieldClasses} resize-none`}
                {...register("specialization")}
              />

              {errors.specialization && (
                <h2 className="mt-2 text-[11px] text-red-500">
                  {errors.specialization?.message}
                </h2>
              )}
            </>
          ) : (
            <p className={mutedValueClasses}>
              {doctorProfile.doctor.specialization ||
                "Licence Number not provided"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClasses}>Languages spoken</label>

        {isEditing && (
          <div className="mb-2.5 flex items-center gap-2">
            <input
              type="text"
              onChange={(e) => setLanguageInput(e.target.value)}
              value={languageInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLanguage();
                }
              }}
              placeholder="Add a language"
              className={fieldClasses}
            />

            <button
              type="button"
              onClick={addLanguage}
              className="shrink-0 cursor-pointer rounded-lg p-2.5 transition-colors"
              style={{
                backgroundColor: primaryTint,
                color: primaryColor,
              }}
              aria-label="Add language"
            >
              <Plus size={16} />
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 px-1">
          {(isEditing ? languages : doctorProfile.doctor.languages).length ===
            0 && (
            <span
              className={`text-sm ${
                isDark ? "text-[#5b6b80]" : "text-slate-400"
              }`}
            >
              No languages added
            </span>
          )}

          {(isEditing ? languages : doctorProfile.doctor.languages).map(
            (lang) => (
              <span
                key={lang}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isDark
                    ? "bg-white/5 text-[#c3cddb]"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {lang}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    aria-label={`Remove ${lang}`}
                    className="cursor-pointer hover:text-rose-400"
                  >
                    <X size={11} />
                  </button>
                )}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorBioDetails;
