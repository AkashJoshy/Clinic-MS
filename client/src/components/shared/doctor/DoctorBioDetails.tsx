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
import { useMutate } from "@/hooks/useMutate";
import { updateDoctorProfessionalDetails } from "@/services/doctor.service";

const DoctorBioDetails: React.FC = () => {
  const doctorProfile = useAuthStore((state) => state.doctor);
  const user = useAuthStore((state) => state.user);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);

  if (!doctorProfile) return <h2>Loading...</h2>;

  const [isEditing, setIsEditing] = useState(false);

  const [languages, setLanguages] = useState<string[]>(
    doctorProfile.doctor.languages,
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

    setIsEditing(true);
  };

  const { mutate, isPending } = useMutate(updateDoctorProfessionalDetails, {
    onSuccess(data) {
      if (data?.data) {
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

  const cancelEdit = () => setIsEditing(false);

  const addLanguage = () => {
    const value = languageInput.trim().toUpperCase();
    console.log(value);
    if (!value || languages.includes(value)) return;
    console.log(value);
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

  const fieldClasses = `w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 bg-[#101f2e] text-white placeholder:text-[#5b6b80] ${
    isEditing
      ? "border-[#1dc465]/40 focus:border-[#1dc465] focus:ring-1 focus:ring-[#1dc465]/40"
      : "border-white/8 cursor-default"
  }`;
  const labelClasses = "block text-xs font-medium text-[#8b9ab0] mb-1.5";

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold text-base">
          Professional details
        </h3>
        {!isEditing ? (
          <button
            type="button"
            onClick={startEdit}
            className="flex items-center gap-1.5 text-xs font-medium text-[#1dc465] hover:text-[#15a050] transition-colors cursor-pointer"
          >
            <Pencil size={13} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center gap-1 text-xs font-medium text-[#8b9ab0] hover:text-white px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X size={13} /> Cancel
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={handleSubmit(
                (data) => {
                  console.log(data);

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
                (error) => {
                  toast.error("Data is incomplete for the updation");
                },
              )}
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                isPending
                  ? "bg-[#1dc465]/50 text-primary-100 cursor-not-allowed"
                  : "bg-[#1dc465] text-[#0d1a27] hover:bg-[#15a050] cursor-pointer"
              }`}
            >
              <Check aria-disabled={isPending} size={13} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Gender</label>
          {isEditing ? (
            <>
              <select className={fieldClasses} {...register("gender")}>
                {GENDER.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0) + g.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors && errors.gender && (
                <h2 className="text-red-500 text-[11px] mt-2">
                  {errors.gender?.message}
                </h2>
              )}
            </>
          ) : (
            <p className="text-sm text-white px-3.5 py-2.5">
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
              {errors && errors.experienceYears && (
                <h2 className="text-red-500 text-[11px] mt-2">
                  {errors.experienceYears?.message}
                </h2>
              )}
            </>
          ) : (
            <p className="text-sm text-white px-3.5 py-2.5">
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
            {errors && errors.bio && (
              <h2 className="text-red-500 text-[11px] mt-2">
                {errors.bio?.message}
              </h2>
            )}
          </>
        ) : (
          <p className="text-sm text-[#c3cddb] px-3.5 py-2.5 leading-relaxed">
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
            {errors && errors.licenceNumber && (
              <h2 className="text-red-500 text-[11px] mt-2">
                {errors.licenceNumber?.message}
              </h2>
            )}
          </>
        ) : (
          <p className="text-sm text-[#c3cddb] px-3.5 py-2.5 leading-relaxed">
            {doctorProfile.doctor.licenceNumber ||
              "Licence Number not provided"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mt-4">
          <label className={labelClasses}>Qualification</label>
          {isEditing ? (
            <>
              <input
                placeholder="Enter your qualification"
                className={`${fieldClasses} resize-none`}
                {...register("qualification")}
              />
              {errors && errors.qualification && (
                <h2 className="text-red-500 text-[11px] mt-2">
                  {errors.qualification?.message}
                </h2>
              )}
            </>
          ) : (
            <p className="text-sm text-[#c3cddb] px-3.5 py-2.5 leading-relaxed">
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
              {errors && errors.specialization && (
                <h2 className="text-red-500 text-[11px] mt-2">
                  {errors.specialization?.message}
                </h2>
              )}
            </>
          ) : (
            <p className="text-sm text-[#c3cddb] px-3.5 py-2.5 leading-relaxed">
              {doctorProfile.doctor.specialization ||
                "Licence Number not provided"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClasses}>Languages spoken</label>
        {isEditing && (
          <div className="flex items-center gap-2 mb-2.5">
            <input
              type="text"
              onChange={(e) => {
                setLanguageInput(e.target.value);
              }}
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
              className="p-2.5 rounded-lg bg-[#1dc465]/10 text-[#1dc465] hover:bg-[#1dc465]/15 transition-colors cursor-pointer shrink-0"
              aria-label="Add language"
            >
              <Plus size={16} />
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 px-1">
          {(isEditing ? languages : doctorProfile.doctor.languages).length ===
            0 && (
            <span className="text-sm text-[#5b6b80]">No languages added</span>
          )}
          {(isEditing ? languages : doctorProfile.doctor.languages).map(
            (lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#c3cddb]"
              >
                {lang}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    aria-label={`Remove ${lang}`}
                    className="hover:text-rose-400 cursor-pointer"
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
