import React, { useMemo, useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import type {
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  value: File | string | null | undefined;
  setValue: UseFormSetValue<T>;
  error?: boolean;
};

function DocUploadBox<T extends FieldValues>({
  name,
  label,
  value,
  setValue,
  error,
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    if (typeof value === "string") {
      return value;
    }

    return "";
  }, [value]);

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          setValue(name, file as any, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className={`
          cursor-pointer rounded-2xl border-2 border-dashed
          transition-all duration-200 overflow-hidden
          ${
            error
              ? "border-red-500 bg-red-500/5"
              : "border-white/10 hover:border-[#1dc465]/60 bg-white/5"
          }
        `}
      >
        {preview ? (
          <>
            <div className="h-56 flex items-center justify-center bg-[#09111b]">
              <img
                src={preview}
                alt="Licence"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="border-t border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-[#1dc465]" />

                <div>
                  <p className="text-white text-sm font-medium">
                    Licence Uploaded
                  </p>

                  <p className="text-xs text-[#8b9ab0]">
                    Click anywhere to replace
                  </p>
                </div>
              </div>

              <Upload size={18} className="text-[#1dc465]" />
            </div>
          </>
        ) : (
          <div className="py-10 px-6 flex flex-col items-center text-center">
            <Upload
              size={34}
              className="text-[#1dc465] mb-3"
            />

            <h3 className="text-white font-medium">
              {label}
            </h3>

            <p className="text-xs text-[#8b9ab0] mt-2">
              JPG, PNG or PDF
            </p>

            <p className="text-xs text-[#8b9ab0]">
              Maximum 5 MB
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default DocUploadBox;