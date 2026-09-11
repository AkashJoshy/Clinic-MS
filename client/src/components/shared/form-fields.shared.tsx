import React, { useState, useRef } from "react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import type { Control } from "react-hook-form"
import type { FormFieldsProps, OptionItem } from "@/types/common";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Upload, FileText } from "lucide-react";
import Select from "react-select";

const normalizeOptions = (
  options: string[] | OptionItem[] | undefined,
): { label: string; value: string }[] => {
  if (!options) return [];
  return options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );
};


function DocUploadBox<T extends FieldValues>({
  name,
  label,
  hasError,
  setValue,
  watch,
}: {
  name: string;
  label: string;
  hasError: boolean;
  setValue: FormFieldsProps<T>["setValue"];
  watch?: File | null;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(watch ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setValue?.(name as unknown as Path<T>, selected as any, {
      shouldValidate: true,
    });
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-6 cursor-pointer transition
        ${
          hasError
            ? "border-red-400 bg-red-50"
            : "border-gray-200 hover:border-primary hover:bg-primary/5"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleChange}
      />
      {file ? (
        <>
          <FileText size={28} className="text-teal-500" />
          <p className="text-xs font-semibold text-teal-600 text-center">
            {file.name}
          </p>
          <p className="text-xs text-gray-400">Click to replace</p>
        </>
      ) : (
        <>
          <Upload size={28} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-600 text-center">
            {label}
          </p>
          <p className="text-xs text-gray-400">PDF, JPG, PNG — max 5 MB</p>
        </>
      )}
    </div>
  );
}

function DayToggleGroup<T extends FieldValues>({
  name,
  options,
  control,
  hasError,
  isDark,
}: {
  name: Path<T>;
  options: string[];
  control: Control<T, any>;
  hasError: boolean;
  isDark?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[] as any}
      render={({ field }) => {
        const selected: string[] = Array.isArray(field.value) ? field.value : [];

        const toggle = (day: string) => {
          const next = selected.includes(day)
            ? selected.filter((d) => d !== day)
            : [...selected, day];
          field.onChange(next);
        };

        return (
          <div className="flex flex-wrap gap-2">
            {options.map((day) => {
              const active = selected.includes(day);
              // Show short label: MON, TUE, etc.
              const short = day.slice(0, 3);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggle(day)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-150
                    ${
                      active
                        ? "bg-[#1dc465] text-[#080d14] border-[#1dc465] shadow-sm"
                        : isDark
                          ? `border-white/10 text-[#8b9ab0] hover:border-[#1dc465]/50 hover:text-[#1dc465] ${hasError ? "border-red-400/50" : ""}`
                          : `border-gray-200 text-gray-500 hover:border-primary hover:text-primary ${hasError ? "border-red-300" : ""}`
                    }`}
                >
                  {isDark ? short : day}
                </button>
              );
            })}
          </div>
        );
      }}
    />
  );
}


export function TimeSlotGrid<T extends FieldValues>({
  name,
  options,
  control,
  hasError,
  isDark,
}: {
  name: Path<T>;
  options: string[];
  control: Control<T, any>;
  hasError: boolean;
  isDark?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[] as any}
      render={({ field }) => {
        const selected: string[] = Array.isArray(field.value) ? field.value : [];

        const toggle = (slot: string) => {
          const next = selected.includes(slot)
            ? selected.filter((s) => s !== slot)
            : [...selected, slot];
          field.onChange(next);
        };

        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1.5">
            {options.map((slot) => {
              const active = selected.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggle(slot)}
                  className={`py-1.5 px-1 rounded-lg text-[11px] font-medium border text-center transition-all duration-150 leading-tight
                    ${
                      active
                        ? "bg-[#1dc465] text-[#080d14] border-[#1dc465] shadow-sm"
                        : isDark
                          ? `bg-white/[0.03] border-white/8 text-[#8b9ab0] hover:border-[#1dc465]/50 hover:text-[#1dc465] hover:bg-[#1dc465]/5 ${hasError ? "border-red-400/50" : ""}`
                          : `border-gray-200 text-gray-500 hover:border-primary hover:text-primary ${hasError ? "border-red-300" : ""}`
                    }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        );
      }}
    />
  );
}


function StatusToggle<T extends FieldValues>({
  name,
  options,
  control,
  hasError,
}: {
  name: Path<T>;
  options: string[];
  control: Control<T, any>;
  hasError: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-3">
          {options.map((opt) => {
            const active = field.value === opt;
            const isActive = opt === "Active";
            return (
              <button
                key={opt}
                type="button"
                onClick={() => field.onChange(opt)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-150
                  ${
                    active
                      ? isActive
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "bg-red-50 border-red-400 text-red-600"
                      : `border-gray-200 text-gray-400 hover:border-gray-300
                         ${hasError ? "border-red-300" : ""}`
                  }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    />
  );
}

function FormFields<T extends FieldValues>({
  fields,
  register,
  errors,
  setValue,
  control,
  containerClass = "",
}: FormFieldsProps<T>) {
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>(
    {},
  );

  const toggleVisibility = (fieldName: string) =>
    setVisibleFields((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));

  const inputClass = (name: string) => {

    const hasError = !!(errors as any)[name]

    return(
      `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200
      ${
         hasError
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 bg-gray-50 focus:border-primary focus:ring-4 focus:ring-primary/10"
        }
        `
    )
  }

  const isDark = containerClass !== "";

  return (
    <>
      {fields.map((inp) => {
        const name = inp.name as string;
        const hasError = !!(errors as any)[name];

        return (
          <div key={name} className={inp.hidden ? "hidden" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {inp.title}
              {inp.isRequired && (
                <span className="text-red-500 ml-0.5">*</span>
              )}
            </label>

            {/* Password */}
            {inp.type === "password" && (
              <div className="relative">
                <input
                  {...register(inp.name as unknown as Path<T>)}
                  type={visibleFields[name] ? "text" : "password"}
                  placeholder={inp.placeHolder}
                  className={`${inputClass(name)} ${containerClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(name)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {visibleFields[name] ? (
                    <AiOutlineEyeInvisible size={18} />
                  ) : (
                    <AiOutlineEye size={18} />
                  )}
                </button>
              </div>
            )}

            {/* Select */}
            {inp.type === "select" && (
              <Controller
                name={inp.name as Path<T>}
                control={control}
                render={({ field }) => {
                  const options = (inp.options ?? []).map((opt) => 
                    typeof opt === "string" 
                      ? { value: opt, label: opt } 
                      : { value: opt.value, label: opt.label }
                  );
                  return (
                    <Select
                      options={options}
                      placeholder={inp.placeHolder}
                      value={
                        options.find((o) => o.value === field.value) ?? null
                      }
                      onChange={(sel) =>
                        field.onChange(sel?.value ?? undefined)
                      }
                      onBlur={field.onBlur}
                      unstyled
                      classNames={{
                        control: ({ isFocused }) =>
                          `w-full px-3 py-2 rounded-lg border text-sm transition-all duration-200 cursor-pointer
                           ${isDark ? "bg-[#0d1a27]" : "bg-white"}
                           ${
                             hasError
                               ? "border-red-400"
                               : isFocused
                                 ? "border-primary ring-4 ring-primary/10"
                                 : isDark
                                   ? "border-gray-600"
                                   : "border-gray-200"
                           }`,
                        placeholder: () => "text-gray-400 text-sm",
                        singleValue: () =>
                          isDark ? "text-white text-sm" : "text-gray-900 text-sm",
                        input: () =>
                          isDark ? "text-white text-sm" : "text-gray-900 text-sm",
                        menu: () =>
                          `mt-1 border rounded-lg shadow-lg overflow-hidden z-50
                           ${isDark ? "bg-[#0d1a27] border-gray-700" : "bg-white border-gray-200"}`,
                        option: ({ isFocused, isSelected }) =>
                          `px-4 py-2.5 text-sm cursor-pointer transition-colors
                           ${
                             isSelected
                               ? "bg-primary text-white"
                               : isFocused
                                 ? isDark
                                   ? "bg-gray-700 text-white"
                                   : "bg-gray-100 text-gray-900"
                                 : isDark
                                   ? "text-gray-300"
                                   : "text-gray-700"
                           }`,
                        indicatorsContainer: () =>
                          isDark ? "text-gray-400" : "text-gray-500",
                        indicatorSeparator: () => "hidden",
                      }}
                    />
                  );
                }}
              />
            )}

            {/* Textarea */}
            {inp.type === "textarea" && (
              <textarea
                {...register(inp.name as unknown as Path<T>)}
                placeholder={inp.placeHolder}
                rows={4}
                className={`${inputClass(name)} ${containerClass}`}
              />
            )}

            {/* File */}
            {inp.type === "file" && (
              <DocUploadBox<T>
                name={name}
                label={inp.placeHolder ?? "Upload file"}
                hasError={hasError}
                setValue={setValue}
              />
            )}

            {/* Day multi-select */}
            {inp.type === "multi-select-days" && (
              <DayToggleGroup<T>
                name={inp.name as unknown as Path<T>}
                options={
                  (inp.options ?? []).filter(
                    (o): o is string => typeof o === "string",
                  )
                }
                control={control}
                hasError={hasError}
              />
            )}

            {/* Time slot grid */}
            {inp.type === "multi-select-slots" && (
              <TimeSlotGrid<T>
                name={inp.name as unknown as Path<T>}
                options={
                  (inp.options ?? []).filter(
                    (o): o is string => typeof o === "string",
                  )
                }
                control={control}
                hasError={hasError}
              />
            )}

            {/* Status toggle */}
            {inp.type === "status-toggle" && (
              <StatusToggle<T>
                name={inp.name as unknown as Path<T>}
                options={
                  (inp.options ?? []).filter(
                    (o): o is string => typeof o === "string",
                  )
                }
                control={control}
                hasError={hasError}
              />
            )}

            {![
              "password",
              "select",
              "textarea",
              "file",
              "multi-select-days",
              "multi-select-slots",
              "status-toggle",
            ].includes(inp.type) && (
              <input
                type={inp.type}
                placeholder={inp.placeHolder}
                disabled={inp?.isDisabled}
                defaultValue={inp.isValue as string}
                 max={inp.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                {...register(inp.name as unknown as Path<T>)}
                className={`${inputClass(name)} ${containerClass} ${inp?.isDisabled ? `cursor-not-allowed` : ''}`}
              />
            )}

            {hasError && (
              <p className="mt-1 text-xs text-red-500">
                {(errors as any)[name]?.message as string}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}

export default FormFields;