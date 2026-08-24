import type { AddressDetailsProps, ProfileAddress } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Hash, Home, Info, MapPin, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addressSchema, type AddressForm } from "@/schemas/patient/address.schema";
import { emptyAddress } from "@/constants/patient.constant";
import { useLocationOptions } from "@/hooks/useLocationOptions";



const AddressDetails: React.FC<AddressDetailsProps> = ({
  address,
  handleSave,
  disabledInputClasses,
  inputClasses,
  labelClasses,
  handleChange,
  originalAddress,
  setAddress,
  setOriginalAddress,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    countries,
    states,
    handleCountryChange,
    handleStateChange,
    cities
  } = useLocationOptions()

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyAddress,
    mode: "onChange",
  });

  const country = watch("country");
  const state = watch("state");

  useEffect(() => {
    reset(address);
    setAddress(address);
    setOriginalAddress(address);
  }, [address]);

  const handleCancel = () => {
    reset(address);
    setIsEditing(false);
  };
  
  useEffect(() => {
    handleCountryChange(country)
  }, [country, countries])

  useEffect(() => {
    handleStateChange(country, state)
  }, [country, state, countries])


  const errorText = "text-xs text-red-600 mt-1";

  return (
    <div className="bg-white rounded-[8px] shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          Address
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
                toast.custom(() => (
                  <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                    <p className="text-sm font-medium text-blue-800">
                      No changes were made.
                    </p>
                  </div>
                ), {
                  position:"bottom-right"
                });
              }
            } catch (e: any) {
              toast.error("Failed to update profile. Please try again.");
            } finally {
              setIsEditing(false);
            }
        })}
      >
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="md:col-span-2">
              <label className={labelClasses}>Address Line</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("addressLine")}
                  type="text"
                  className={`${inputClasses} pl-10`}
                  placeholder="House no, street, locality"
                />
              </div>
              {errors.addressLine && (
                <p className={errorText}>{errors.addressLine.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Country</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register("country")}
                  className={`${inputClasses} pl-10 appearance-none`}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <p className={errorText}>{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>State</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register("state")}
                  disabled={!country}
                  className={`${
                    !country ? disabledInputClasses : inputClasses
                  } pl-10 appearance-none`}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              {!country ? (
                <p className="text-xs text-gray-400 mt-1">
                  Select a country first
                </p>
              ) : (
                errors.state && (
                  <p className={errorText}>{errors.state.message}</p>
                )
              )}
            </div>

            <div>
              <label className={labelClasses}>City</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register("city")}
                  disabled={!state}
                  className={`${
                    !state ? disabledInputClasses : inputClasses
                  } pl-10 appearance-none`}
                >
                  <option value="">Select City</option>
                  {cities.map((c, idx) => (
                    <option key={`${c.name}-${idx}`} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {!state ? (
                <p className="text-xs text-gray-400 mt-1">
                  Select a state first
                </p>
              ) : (
                errors.city && (
                  <p className={errorText}>{errors.city.message}</p>
                )
              )}
            </div>

            <div>
              <label className={labelClasses}>Pincode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("pincode")}
                  type="text"
                  className={`${inputClasses} pl-10`}
                  placeholder="Postal / ZIP code"
                />
              </div>
              {errors.pincode && (
                <p className={errorText}>{errors.pincode.message}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {address.addressLine ||
            address.city ||
            address.state ||
            address.country ? (
              <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-gray-900">
                    {address.addressLine || "Address line not set"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {[address.city, address.state].filter(Boolean).join(", ") ||
                      "—"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {[address.country, address.pincode]
                      .filter(Boolean)
                      .join(" - ") || "—"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 p-4 text-gray-500">
                <MapPin className="h-5 w-5 text-gray-300" />
                <p className="text-sm italic">No address on file.</p>
              </div>
            )}
          </>
        )}

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

export default AddressDetails;