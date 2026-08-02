import type { ChangeEvent } from "react";
import { Upload, FileText, Image } from "lucide-react";
import { useDoctorRegistrationContext } from "@/hooks/useDoctorRegistrationContext";
import type { DoctorRegisterStep3FormData } from "@/schemas/doctor/doctor.schema";

const VerificationDocs = () => {
  const { step3Form } = useDoctorRegistrationContext();

  const {
    setValue,
    watch,
    formState: { errors },
  } = step3Form;

  const doctorProfilePicture = watch("doctorProfilePicture");
  const clinicRegistrationDoc = watch("clinicRegistrationDoc");
  const establishmentLicenceDoc = watch("establishmentLicenceDoc");
  const medicalLicenceDoc = watch("medicalLicenceDoc");
  const doctorRegistrationDoc = watch("doctorRegistrationDoc");

  const handleFileChange =
    (field: keyof DoctorRegisterStep3FormData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;



      setValue(field, file as never, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    };

  const renderFileField = (
    name: keyof DoctorRegisterStep3FormData,
    label: string,
    description: string,
    accept?: string,
  ) => {
    const error = errors[name];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>

        <label
          htmlFor={name}
          className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-primary-300 hover:bg-primary-50"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
            {name === "doctorProfilePicture" ? (
              <Image size={20} />
            ) : (
              <FileText size={20} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-700">
              {name === "doctorProfilePicture"
                ? doctorProfilePicture?.name || "Choose profile picture"
                : name === "clinicRegistrationDoc"
                  ? clinicRegistrationDoc?.name ||
                    "Choose clinic registration document"
                  : name === "establishmentLicenceDoc"
                    ? establishmentLicenceDoc?.name ||
                      "Choose establishment licence document"
                    : name === "medicalLicenceDoc"
                      ? medicalLicenceDoc?.name ||
                        "Choose medical licence document"
                      : doctorRegistrationDoc?.name ||
                        "Choose doctor registration document"}
            </p>

            <p className="mt-1 text-xs text-gray-500">{description}</p>
          </div>

          <Upload size={18} className="shrink-0 text-gray-500" />

          <input
            id={name}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange(name)}
          />
        </label>

        {error && (
          <p className="text-xs text-red-500">
            {error.message?.toString()}
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-700">
          Verification Documents
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload the required documents for verification.
        </p>
      </div>

      <div className="space-y-5">
        {renderFileField(
          "doctorProfilePicture",
          "Doctor Profile Picture",
          "Upload your profile picture.",
          "image/png,image/jpeg,image/jpg",
        )}

        {renderFileField(
          "clinicRegistrationDoc",
          "Clinic Registration Document",
          "Upload the official clinic registration document.",
          ".pdf,image/png,image/jpeg",
        )}

        {renderFileField(
          "establishmentLicenceDoc",
          "Establishment Licence Document",
          "Upload the clinic establishment licence.",
          ".pdf,image/png,image/jpeg",
        )}

        {renderFileField(
          "medicalLicenceDoc",
          "Medical Licence Document",
          "Upload your medical licence document.",
          ".pdf,image/png,image/jpeg",
        )}

        {renderFileField(
          "doctorRegistrationDoc",
          "Doctor Registration Document",
          "Upload your doctor registration certificate.",
          ".pdf,image/png,image/jpeg",
        )}
      </div>
    </section>
  );
};

export default VerificationDocs;