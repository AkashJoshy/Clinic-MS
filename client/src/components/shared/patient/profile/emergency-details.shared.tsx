import { RELATIONS } from "@/constants/form-fields.constants";
import { normalizeGender, normalizeRelation } from "@/helpers/profile.helper";
import type { EmergencyDetailsForm } from "@/schemas/patient/patient.schema";
import { EmergencyDetailsSchema } from "@/schemas/patient/personal-details.schema";
import type { EmergencyDetailsProps } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Pencil, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EmergencyDetails: React.FC<EmergencyDetailsProps> = ({
  displayClasses,
  inputClasses,
  labelClasses,
  handleChange,
  handleSave,
  emergencyContact,
  originalEmergencyContact,
  setEmergencyContact,
  setOriginalEmergencyContact,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<EmergencyDetailsForm>({
    resolver: zodResolver(EmergencyDetailsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const emergencyDetails = {
      id: emergencyContact.id,
      name: emergencyContact.name.trim(),
      phone: emergencyContact.phone,
      relationship: normalizeRelation(emergencyContact.relationship),
    };

    setValue("id", emergencyContact.id);
    reset(emergencyDetails);
  }, [emergencyContact]);

  const handleCancel = () => {
    reset();
    setEmergencyContact(originalEmergencyContact);
    setIsEditing(false);
  };

  const errorText = "text-xs text-red-600 mt-1";

  const UPDATED_RELATIONS = RELATIONS.filter((r) => r !== "");

  return (
    <div className="bg-white rounded-[7px] shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          EmergencyDetails
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
        onSubmit={handleSubmit(
          (data) => {
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
                );
              }
            } catch (e: any) {
              toast.error("Failed to update profile. Please try again.");
            } finally {
              setIsEditing(false);
            }
          },
          (error) => {
            console.log(watch());
          },
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>Full Name</label>

            {isEditing ? (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="text"
                    className={`${inputClasses} pl-10`}
                    placeholder="Enter your full name"
                    {...register("name")}
                  />
                </div>

                {errors.name && (
                  <p className={errorText}>{errors.name.message}</p>
                )}
              </>
            ) : (
              <div className={displayClasses}>
                {emergencyContact.name || "Not set"}
              </div>
            )}
          </div>

          <div>
            <label className={labelClasses}>Phone Number</label>

            {isEditing ? (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="tel"
                    className={`${inputClasses} pl-10`}
                    {...register("phone")}
                  />
                </div>

                {errors.phone && (
                  <p className={errorText}>{errors.phone.message}</p>
                )}
              </>
            ) : (
              <div className={displayClasses}>
                {emergencyContact.phone || "Not set"}
              </div>
            )}
          </div>

          <div>
            <label className={labelClasses}>Relation</label>
            {isEditing ? (
              <select {...register("relationship")} className={inputClasses}>
                <option value="">Select Relation</option>
                {UPDATED_RELATIONS.map((r) => {
                  return (
                    <option value={r}>{r[0] + r.toLowerCase().slice(1)}</option>
                  );
                })}
              </select>
            ) : (
              <div className={displayClasses}>
                {emergencyContact.relationship
                  ? normalizeRelation(emergencyContact.relationship)
                  : "Not set"}
              </div>
            )}
            {errors.relationship && (
              <p className={errorText}>{errors.relationship.message}</p>
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
  );
};

export default EmergencyDetails;
