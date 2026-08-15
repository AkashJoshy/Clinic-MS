import type { AddressDetailsProps } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Globe,
  Hash,
  Home,
  MapPin,
  Pencil,
  X,
  Check,
  Info,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addressSchema,
  type AddressForm,
} from "@/schemas/patient/address.schema";
import { emptyAddress } from "@/constants/patient.constant";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import { useAuthStore } from "@/store";
import { useAuthMutate } from "@/hooks/useAuthMutate";
import { updateDoctorAddress } from "@/services/doctor.service";
import toast from "react-hot-toast";

const fields = [
  { key: "addressLine", label: "Address Line" },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "pincode", label: "Pincode" },
] as const;

const DoctorAddressDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const doctorProfile = useAuthStore((state) => state.doctor);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);

  const { countries, states, cities, handleCountryChange, handleStateChange } =
    useLocationOptions();

  const {
    register,
    handleSubmit,
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

  const address = {
    ownerId: doctorProfile?.address?.ownerId,
    addressLine: doctorProfile?.address?.addressLine,
    country: doctorProfile?.address?.country,
    state: doctorProfile?.address?.state,
    city: doctorProfile?.address?.city,
    pincode: doctorProfile?.address?.pincode,
  };

  useEffect(() => {
    reset(address);
  }, [reset]);

  useEffect(() => {
    if (country) {
      handleCountryChange(country);
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      handleStateChange(country, state);
    }
  }, [country, state]);

  const startEdit = () => {
    reset(address);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    reset(address);
    setIsEditing(false);
  };

  const { mutate, isPending } = useAuthMutate(updateDoctorAddress, {
    onSuccess(data) {
      if (data?.data) {
        const updatedAddress = {
          ...doctorProfile,
          address: { ...data?.data },
        };
        updateDoctor(updatedAddress);
      }
    },
  });

  const inputClasses =
    "w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none " +
    "bg-[#101f2e] text-white placeholder:text-[#5b6b80] " +
    "border-[#1dc465]/40 focus:border-[#1dc465] focus:ring-1 focus:ring-[#1dc465]/40";

  const errorText = "text-xs text-red-500 mt-1";

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1dc465]" />
          Address
        </h3>

        {!isEditing ? (
          <button
            type="button"
            onClick={startEdit}
            className="flex items-center gap-1.5 text-xs font-medium text-[#1dc465] hover:text-[#15a050] cursor-pointer"
          >
            <Pencil size={13} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center gap-1 text-xs text-[#8b9ab0] hover:text-white cursor-pointer"
            >
              <X size={13} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              form="address-form"
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                isPending
                  ? "bg-[#1dc465]/50 text-primary-100 cursor-not-allowed"
                  : "bg-[#1dc465] text-[#0d1a27] hover:bg-[#15a050] cursor-pointer"
              }`}
            >
              <Check size={13} />
              Save
            </button>
          </div>
        )}
      </div>

      <form
        id="address-form"
        onSubmit={handleSubmit((data) => {
          const isSame =
            data.ownerId === doctorProfile?.address?.ownerId &&
            data.addressLine === doctorProfile?.address?.addressLine &&
            data.country === doctorProfile?.address?.country &&
            data.state === doctorProfile?.address?.state &&
            data.city === doctorProfile?.address?.city &&
            data.pincode === doctorProfile?.address?.pincode;

          if (isSame) {
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
            mutate(data);
            setIsEditing(false);
          }
        })}
      >
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label }) => (
              <div
                key={key}
                className={key === "addressLine" ? "sm:col-span-2" : ""}
              >
                <label className="block text-xs font-medium text-[#8b9ab0] mb-1.5">
                  {label}
                </label>

                <p className="text-sm text-white px-3.5 py-2.5">
                  {address?.[key] || "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#8b9ab0] mb-1.5">
                Address Line
              </label>

              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b9ab0]" />

                <input
                  className={`${inputClasses} pl-10`}
                  placeholder="House no, street, locality"
                  {...register("addressLine")}
                />
              </div>

              {errors.addressLine && (
                <p className={errorText}>{errors.addressLine.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b9ab0] mb-1.5">
                Country
              </label>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b9ab0]" />

                <select
                  {...register("country")}
                  className={`${inputClasses} pl-10 appearance-none`}
                >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.country && (
                <p className={errorText}>{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b9ab0] mb-1.5">
                State
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b9ab0]" />

                <select
                  {...register("state")}
                  disabled={!country}
                  className={`${inputClasses} pl-10 appearance-none ${
                    !country ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">Select State</option>

                  {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.state && (
                <p className={errorText}>{errors.state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b9ab0] mb-1.5">
                City
              </label>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b9ab0]" />

                <select
                  {...register("city")}
                  disabled={!state}
                  className={`${inputClasses} pl-10 appearance-none ${
                    !state ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">Select City</option>

                  {cities.map((city, index) => (
                    <option key={`${city.name}-${index}`} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.city && (
                <p className={errorText}>{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b9ab0] mb-1.5">
                Pincode
              </label>

              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b9ab0]" />

                <input
                  {...register("pincode")}
                  className={`${inputClasses} pl-10`}
                  placeholder="Postal / ZIP code"
                />
              </div>

              {errors.pincode && (
                <p className={errorText}>{errors.pincode.message}</p>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DoctorAddressDetails;
