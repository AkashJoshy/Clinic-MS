
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
import { useLocationOptions } from "@/hooks/use-location-options.hook";
import { useAuthStore } from "@/store";
import { useAuthMutate } from "@/hooks/use-auth-mutate.hook";
import { updateDoctorAddress } from "@/services/doctor.service";
import toast from "react-hot-toast";
import DoctorAddressDetailsSkeleton from "../../skeletons/doctor-address-details.skeleton";

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
  const { primaryColor } = useAuthStore((state) => state.platform);

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

  const { mutate, isPending } = useAuthMutate(updateDoctorAddress, {
    onSuccess(data) {
      if (data?.data && doctorProfile) {
        const updatedAddress = {
          ...doctorProfile,
          address: { ...data.data },
        };

        updateDoctor(updatedAddress);
      }
    },
  });

  useEffect(() => {
    reset(address);
  }, [reset, doctorProfile]);

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

  if (!doctorProfile) {
    return <DoctorAddressDetailsSkeleton />;
  }

  const startEdit = () => {
    reset(address);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    reset(address);
    setIsEditing(false);
  };

  const inputClasses =
    "w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 " +
    "bg-[#101f2e] text-white placeholder:text-[#5b6b80] " +
    "border-white/10 focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]";

  const errorText = "mt-1 text-xs text-red-500";

  const primaryStyle = {
    "--primary-color": primaryColor,
  } as React.CSSProperties;

  const primaryTint = `color-mix(in srgb, ${primaryColor} 10%, transparent)`;

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1a27] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <MapPin
            className="h-4 w-4"
            style={{ color: primaryColor }}
          />
          Address
        </h3>

        {!isEditing ? (
          <button
            type="button"
            onClick={startEdit}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80"
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
              className="flex cursor-pointer items-center gap-1 text-xs text-[#8b9ab0] transition-colors hover:text-white"
            >
              <X size={13} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              form="address-form"
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
              }
            );
          } else {
            mutate(data);
            setIsEditing(false);
          }
        })}
      >
        {!isEditing ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map(({ key, label }) => (
              <div
                key={key}
                className={key === "addressLine" ? "sm:col-span-2" : ""}
              >
                <label className="mb-1.5 block text-xs font-medium text-[#8b9ab0]">
                  {label}
                </label>

                <p className="px-3.5 py-2.5 text-sm text-white">
                  {address?.[key] || "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-[#8b9ab0]">
                Address Line
              </label>

              <div className="relative">
                <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b9ab0]" />

                <input
                  className={`${inputClasses} pl-10`}
                  style={primaryStyle}
                  placeholder="House no, street, locality"
                  {...register("addressLine")}
                />
              </div>

              {errors.addressLine && (
                <p className={errorText}>
                  {errors.addressLine.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8b9ab0]">
                Country
              </label>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b9ab0]" />

                <select
                  {...register("country")}
                  className={`${inputClasses} appearance-none pl-10`}
                  style={primaryStyle}
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
                <p className={errorText}>
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8b9ab0]">
                State
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b9ab0]" />

                <select
                  {...register("state")}
                  disabled={!country}
                  className={`${inputClasses} appearance-none pl-10 ${
                    !country ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  style={primaryStyle}
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
                <p className={errorText}>
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8b9ab0]">
                City
              </label>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b9ab0]" />

                <select
                  {...register("city")}
                  disabled={!state}
                  className={`${inputClasses} appearance-none pl-10 ${
                    !state ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  style={primaryStyle}
                >
                  <option value="">Select City</option>

                  {cities.map((city, index) => (
                    <option
                      key={`${city.name}-${index}`}
                      value={city.name}
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.city && (
                <p className={errorText}>
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#8b9ab0]">
                Pincode
              </label>

              <div className="relative">
                <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b9ab0]" />

                <input
                  {...register("pincode")}
                  className={`${inputClasses} pl-10`}
                  style={primaryStyle}
                  placeholder="Postal / ZIP code"
                />
              </div>

              {errors.pincode && (
                <p className={errorText}>
                  {errors.pincode.message}
                </p>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DoctorAddressDetails;
