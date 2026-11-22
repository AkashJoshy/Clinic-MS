import React, { useEffect } from "react";
import { Globe } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import type { ConsulationDetailsSchema } from "@/schemas/doctor/doctor.schema";
import { LABEL_CLASSES, SETTING_FIELDS } from "./clinic-details.shared";

interface ConsultationDetailsProps {
  details: ConsulationDetailsSchema;
  isEditing: boolean;
  primaryColor: string;
  primaryStyle: React.CSSProperties;
  fieldClasses: string;
  errors: FieldErrors<ConsulationDetailsSchema>;
  register: UseFormRegister<ConsulationDetailsSchema>;
  watch: UseFormWatch<ConsulationDetailsSchema>;
  setValue: UseFormSetValue<ConsulationDetailsSchema>;
  consultationTypeIcon: React.ElementType;
}

const ConsultationDetails: React.FC<ConsultationDetailsProps> = ({
  details,
  isEditing,
  primaryColor,
  primaryStyle,
  fieldClasses,
  errors,
  register,
  watch,
  setValue,
  consultationTypeIcon,
}) => {
  const currentIsActive = watch("isActive");

  const displayedIsActive = isEditing ? currentIsActive : details.isActive;

  const handleToggleStatus = () => {
    if (!isEditing) return;

    setValue("isActive", !currentIsActive, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div>
      <h3 className="mb-5 text-base font-semibold text-white">
        Consultation settings
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SETTING_FIELDS.map((field) => {
          const Icon = field.icon;
          const value = details[field.key] as number;

          const error = errors[field.key as keyof ConsulationDetailsSchema];

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
                    {...register(field.key as keyof ConsulationDetailsSchema, {
                      valueAsNumber: true,
                    })}
                  />

                  {error && (
                    <p className="mt-2 text-[11px] text-red-500">
                      {error.message as string}
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
          onClick={handleToggleStatus}
          className={cn(
            "relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
            !isEditing ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          )}
          style={{
            backgroundColor: displayedIsActive
              ? primaryColor
              : "rgba(255,255,255,0.1)",
          }}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
              displayedIsActive ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default ConsultationDetails;
