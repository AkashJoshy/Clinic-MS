import { formatDateDisplay, normalizeGender } from "@/helpers/profile.helper";
import { usePatientProfile } from "@/hooks/usePatientProfile";
import type { PersonalDetailsProps } from "@/types/patient";
import { Info, Mail, Pencil, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  handleSave,
  displayClasses,
  labelClasses,
  inputClasses,
  patientProfile,
  originalProfile,
  setProfile,
  setOriginalProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    addAllergy,
    addChronic,
    allergies,
    allergyInput,
    chronicConditions,
    chronicInput,
    errors,
    handleSubmit,
    register,
    removeAllergy,
    removeChronic,
    reset,
    setAllergyInput,
    setChronicInput,
  } = usePatientProfile();

  const handleCancel = () => {
    reset();
    setProfile(originalProfile);
    setIsEditing(false);
  };

  useEffect(() => {
    reset(patientProfile);
    setProfile(patientProfile);
    setOriginalProfile(patientProfile);
  }, [patientProfile]);

  const errorText = "text-xs text-red-600 mt-1";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Personal Details
          </h3>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            try {
              const saved = handleSave(data);

              if (!saved) {
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
                )
              }
            } catch (e: any) {
              toast.error("Failed to update profile. Please try again.");
            } finally {
              setIsEditing(false);
            }
          })}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="md:col-span-2">
              <label className={labelClasses}>Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  readOnly={!isEditing}
                  className={`${inputClasses} pl-10`}
                  placeholder="Enter your full name"
                  {...register("displayName")}
                />
              </div>
              {errors.displayName && (
                <p className={errorText}>{errors.displayName.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  disabled
                  value={patientProfile.email}
                  readOnly={!isEditing}
                  className={`${inputClasses} pl-10 cursor-not-allowed`}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  disabled
                  value={patientProfile.phone}
                  type="tel"
                  readOnly={!isEditing}
                  className={`${inputClasses} pl-10 cursor-not-allowed`}
                />
              </div>
              {errors.phone && (
                <p className={errorText}>{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Date of Birth</label>
              {isEditing ? (
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className={inputClasses}
                />
              ) : (
                <div className={displayClasses}>
                  {formatDateDisplay(patientProfile.dateOfBirth)}
                </div>
              )}
              {errors.dateOfBirth && (
                <p className={errorText}>{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Gender</label>
              {isEditing ? (
                <select {...register("gender")} className={inputClasses}>
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                  <option value="PREFER NOT TO SAY">Prefer not to say</option>
                </select>
              ) : (
                <div className={displayClasses}>
                  {normalizeGender(patientProfile.gender) ?? "Not set"}
                </div>
              )}
              {errors.gender && (
                <p className={errorText}>{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Blood Group</label>
              {isEditing ? (
                <select {...register("bloodGroup")} className={inputClasses}>
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <div className={displayClasses}>
                  {patientProfile.bloodGroup || "Not set"}
                </div>
              )}
              {errors.bloodGroup && (
                <p className={errorText}>{errors.bloodGroup.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Allergies</label>
              {isEditing ? (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addAllergy();
                        }
                      }}
                      placeholder="Type an allergy and press Enter"
                      className={inputClasses}
                    />
                    <button
                      type="button"
                      onClick={addAllergy}
                      className="px-4 cursor-pointer py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  {allergies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {allergies.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeAllergy(item)}
                            className="hover:bg-emerald-100 rounded-full w-4 h-4 flex items-center justify-center text-emerald-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className={displayClasses}>
                  {patientProfile.allergies?.length
                    ? patientProfile.allergies.join(", ")
                    : "Not set"}
                </div>
              )}
              {errors.allergies && (
                <p className={errorText}>
                  {errors.allergies.message as string}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Chronic Conditions</label>
              {isEditing ? (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chronicInput}
                      onChange={(e) => setChronicInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addChronic();
                        }
                      }}
                      placeholder="Type a condition and press Enter"
                      className={inputClasses}
                    />
                    <button
                      type="button"
                      onClick={addChronic}
                      className="px-4 cursor-pointer py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  {chronicConditions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {chronicConditions.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeChronic(item)}
                            className="hover:bg-emerald-100 rounded-full w-4 h-4 flex items-center justify-center text-emerald-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className={displayClasses}>
                  {patientProfile.chronicConditions?.length
                    ? patientProfile.chronicConditions.join(", ")
                    : "Not set"}
                </div>
              )}
              {errors.chronicConditions && (
                <p className={errorText}>
                  {errors.chronicConditions.message as string}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 cursor-pointer py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 cursor-pointer py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full sm:w-auto shadow-sm"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default PersonalDetails;
