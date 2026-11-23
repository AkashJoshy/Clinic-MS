import React from "react";
import {
  Building2,
  Globe,
  Hash,
  Home,
  MapPin,
  Pencil,
  X,
  Check,
  Navigation,
} from "lucide-react";
import { useDoctorAddress } from "@/hooks/use-doctor-address.hook";
import type { DoctorAddressDetailsProps } from "@/types/doctor-clinic";

const fields = [
  { key: "country", label: "Country", icon: Globe },
  { key: "state", label: "State", icon: MapPin },
  { key: "city", label: "City", icon: Building2 },
  { key: "pincode", label: "Pincode", icon: Hash },
] as const;

const DoctorAddressDetails: React.FC<DoctorAddressDetailsProps> = ({
  doctorProfile,
  clinicDetails,
  isDark,
}) => {
  const {
    register,
    errors,
    handleFormSubmit,
    countries,
    states,
    cities,
    country,
    state,
    address,
    hasAddress,
    isEditing,
    startEdit,
    cancelEdit,
    isPending,
    primaryColor,
  } = useDoctorAddress({ doctorProfile, clinicDetails });

  const inputClasses =
    "w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all duration-200 focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] " +
    (isDark
      ? "bg-[#101f2e] text-white placeholder:text-[#5b6b80] border-white/10"
      : "bg-white text-slate-900 placeholder:text-slate-400 border-slate-300");

  const errorText = "mt-1 text-xs text-red-500";

  const labelClasses = `mb-1.5 block text-xs font-medium ${
    isDark ? "text-[#8b9ab0]" : "text-slate-600"
  }`;

  const primaryStyle = {
    "--primary-color": primaryColor,
  } as React.CSSProperties;

  const primaryTint = `color-mix(in srgb, ${primaryColor} 10%, transparent)`;
  const primaryBorder = `color-mix(in srgb, ${primaryColor} 25%, transparent)`;

  return (
    <div
      className={`mt-5 border-t pt-5 ${
        isDark ? "border-white/8" : "border-slate-200"
      }`}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3
          className={`flex items-center gap-2 text-base font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
          Clinic address
        </h3>

        {!isEditing ? (
          <button
            type="button"
            onClick={startEdit}
            className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              isDark ? "hover:bg-white/5" : "hover:bg-slate-100"
            }`}
            style={{ color: primaryColor }}
          >
            <Pencil size={13} />
            Edit address
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                isDark
                  ? "text-[#8b9ab0] hover:bg-white/5 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <X size={13} />
              Cancel
            </button>

            <button
              type="submit"
              form={`address-form-${clinicDetails.id}`}
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all disabled:cursor-not-allowed"
              style={{
                backgroundColor: isPending ? primaryTint : primaryColor,
                color: isPending ? primaryColor : "#0d1a27",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              <Check size={13} />
              {isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </div>

      <form id={`address-form-${clinicDetails.id}`} onSubmit={handleFormSubmit}>
        {!isEditing ? (
          /* Address display */
          <div className="space-y-4">
            {hasAddress ? (
              <>
                {/* Primary address block */}
                <div
                  className="relative overflow-hidden rounded-xl border p-4 sm:p-5"
                  style={{
                    backgroundColor: primaryTint,
                    borderColor: primaryBorder,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        backgroundColor: `${primaryColor}18`,
                        borderColor: primaryBorder,
                      }}
                    >
                      <Navigation
                        className="h-5 w-5"
                        style={{ color: primaryColor }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`mb-1 text-[11px] font-semibold uppercase tracking-wider ${
                          isDark ? "text-[#8b9ab0]" : "text-slate-600"
                        }`}
                      >
                        Street address
                      </p>

                      <p
                        className={`break-words text-sm font-medium leading-relaxed ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {address.addressLine || "Address line not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location details */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {fields.map(({ key, label, icon: Icon }) => {
                    const value = address[key];

                    return (
                      <div
                        key={key}
                        className={`group flex min-w-0 items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                          isDark
                            ? "border-white/6 bg-[#101f2e]/70 hover:border-white/12 hover:bg-[#142638]"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isDark ? "bg-white/5" : "bg-white"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              isDark ? "text-[#8b9ab0]" : "text-slate-500"
                            }`}
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`text-[11px] font-medium ${
                              isDark ? "text-[#718198]" : "text-slate-500"
                            }`}
                          >
                            {label}
                          </p>

                          <p
                            className={`mt-0.5 truncate text-sm font-medium ${
                              isDark ? "text-[#e2e8f0]" : "text-slate-900"
                            }`}
                          >
                            {value || "Not provided"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Empty address state */
              <div
                className={`rounded-xl border border-dashed px-5 py-8 text-center ${
                  isDark
                    ? "border-white/10 bg-[#101f2e]/50"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border ${
                    isDark
                      ? "border-white/8 bg-white/5"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <MapPin
                    className={`h-5 w-5 ${
                      isDark ? "text-[#718198]" : "text-slate-400"
                    }`}
                  />
                </div>

                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  No clinic address added
                </p>

                <p
                  className={`mt-1 text-xs ${
                    isDark ? "text-[#8b9ab0]" : "text-slate-600"
                  }`}
                >
                  Add this clinic's location to help patients find it easily.
                </p>

                <button
                  type="button"
                  onClick={startEdit}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: primaryTint,
                    color: primaryColor,
                    border: `1px solid ${primaryBorder}`,
                  }}
                >
                  <Pencil size={12} />
                  Add address
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Address edit form */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Address Line */}
            <div className="sm:col-span-2">
              <label className={labelClasses}>Address Line</label>

              <div className="relative">
                <Home
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    isDark ? "text-[#8b9ab0]" : "text-slate-500"
                  }`}
                />

                <input
                  className={`${inputClasses} pl-10`}
                  style={primaryStyle}
                  placeholder="House no, street, locality"
                  {...register("addressLine")}
                />
              </div>

              {errors.addressLine && (
                <p className={errorText}>{errors.addressLine.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className={labelClasses}>Country</label>

              <div className="relative">
                <Globe
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    isDark ? "text-[#8b9ab0]" : "text-slate-500"
                  }`}
                />

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
                <p className={errorText}>{errors.country.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className={labelClasses}>State</label>

              <div className="relative">
                <MapPin
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    isDark ? "text-[#8b9ab0]" : "text-slate-500"
                  }`}
                />

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
                <p className={errorText}>{errors.state.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className={labelClasses}>City</label>

              <div className="relative">
                <Building2
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    isDark ? "text-[#8b9ab0]" : "text-slate-500"
                  }`}
                />

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

            {/* Pincode */}
            <div>
              <label className={labelClasses}>Pincode</label>

              <div className="relative">
                <Hash
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    isDark ? "text-[#8b9ab0]" : "text-slate-500"
                  }`}
                />

                <input
                  {...register("pincode")}
                  className={`${inputClasses} pl-10`}
                  style={primaryStyle}
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
