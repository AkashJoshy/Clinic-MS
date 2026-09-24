import RegistrationHeader from "@/components/shared/doctor-registration/header.shared";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  Image,
  Upload,
  ClipboardList,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  fetchDoctorReapplication,
  UpdateDoctorReapplication,
} from "@/services/doctor.service";
import type { FormState, GetReapplicationDetails } from "@/types/doctor";
import toast from "react-hot-toast";
import FormFields from "@/components/shared/form-fields.shared";
import { DOCTOR_STEP1_INPUTS, DOCTOR_STEP2_INPUTS } from "@/data/doctor.data";
import {
  type DoctorReapplicationSchemaFormData,
  type DoctorRegisterStep1FormData,
  type DoctorRegisterStep3FormData,
} from "@/schemas/doctor/doctor.schema";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorReapplicationSchema } from "@/schemas/doctor/register.schema";
import { useMutate } from "@/hooks/use-mutate.hook";
import DoctorPublicHeader from "@/components/layout/doctor-public-header.layout";
import PublicHeader from "@/components/layout/public-header.layout";
import { useLocationOptions } from "@/hooks/use-location-options.hook";

export default function DoctorReapplication() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [doctorReapplicationDetails, setDoctorReapplicationDetails] =
    useState<GetReapplicationDetails | null>(null);
  const [form, setForm] = useState<FormState>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { handleStateChange, cities } = useLocationOptions();

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const resolver: Resolver<DoctorReapplicationSchemaFormData> = async (
    values,
    context,
    options,
  ) => {
    const fieldsToReupload = doctorReapplicationDetails?.fieldsToReupload ?? [];

    if (fieldsToReupload.length === 0) {
      return { values, errors: {} };
    }

    const result = await zodResolver(doctorReapplicationSchema)(
      values,
      context,
      options,
    );

    const relevantErrors = Object.fromEntries(
      Object.entries(result.errors).filter(([field]) =>
        fieldsToReupload.includes(field as (typeof fieldsToReupload)[number]),
      ),
    );

    return {
      values,
      errors: relevantErrors,
    };
  };

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<DoctorReapplicationSchemaFormData>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      gender: "",
      doctorProfilePicture: null,
      clinicRegistrationDoc: null,
      establishmentLicenceDoc: null,
      medicalLicenceDoc: null,
      doctorRegistrationDoc: null,
    },
  });

  const getDoctorReapplicationDetails = async (token: string) => {
    try {
      const response = await fetchDoctorReapplication(token);
      if (response.data) {
        setDoctorReapplicationDetails(response.data);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "Unable to load your reapplication details. The link may be invalid or expired.",
      );
      toast.error("Error while fetching the data");
    }
  };

  useEffect(() => {
    if (doctorReapplicationDetails?.clinicAddress) {
      handleStateChange(
        doctorReapplicationDetails.clinicAddress.country!,
        doctorReapplicationDetails.clinicAddress.state!,
      );
      console.log(cities);
    }
  }, [doctorReapplicationDetails]);

  const { mutate, isPending } = useMutate(UpdateDoctorReapplication, {
    onSuccess: () => {
      setStatus("submitted");
    },
  });

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage(
        "Missing or invalid reapplication link. Please check your email for the correct link.",
      );
      return;
    }
    getDoctorReapplicationDetails(token);
  }, [token]);

  const onSubmit = (data: DoctorReapplicationSchemaFormData) => {
    if (!doctorReapplicationDetails || !token) return;

    setErrorMessage(null);

    const fieldsToReupload = doctorReapplicationDetails.fieldsToReupload;

    const formData = new FormData();

    fieldsToReupload.forEach((field) => {
      const value = data[field];

      if (value instanceof File) {
        formData.append(field, value);
      } else if (value instanceof FileList && value.length > 0) {
        formData.append(field, value[0]);
      } else {
        formData.append(field, String(value ?? ""));
      }
    });

    mutate({
      formData,
      token,
    });
  };

  const updatedStep2Inputs = useMemo(() => {
    return DOCTOR_STEP2_INPUTS.map((field) => {
      if (field.name === "city") {
        const cityNames = cities.map((c) => c.name);
        return {
          ...field,
          placeHolder: "Enter clinic city",
          options: cityNames,
        };
      }

      if (field.name === "registrationNumber") {
        return {
          ...field,
          placeHolder: "Enter clinic registration number, eg: MH-2023-00123",
        };
      }

      if (field.name === "country") {
        return {
          ...field,
          placeHolder: "Enter clinic country",
        };
      }
      if (field.name === "state") {
        return {
          ...field,
          placeHolder: "Enter clinic state",
        };
      }
      if (field.name === "pincode") {
        return {
          ...field,
          placeHolder: "Enter clinic pincode",
        };
      }
      if (field.name === "addressLine") {
        return {
          ...field,
          placeHolder: "Enter clinic address line",
        };
      }

      return field;
    });
  }, [doctorReapplicationDetails]);

  const updatedInputFields = [
    ...DOCTOR_STEP1_INPUTS,
    ...updatedStep2Inputs,
  ].filter(
    (input) =>
      doctorReapplicationDetails?.fieldsToReupload?.includes(input.name) ??
      false,
  );

  const doctorProfilePicture = watch("doctorProfilePicture") as File;
  const clinicRegistrationDoc = watch("clinicRegistrationDoc") as File;
  const establishmentLicenceDoc = watch("establishmentLicenceDoc") as File;
  const medicalLicenceDoc = watch("medicalLicenceDoc") as File;
  const doctorRegistrationDoc = watch("doctorRegistrationDoc") as File;

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

  const fileFieldConfigs: Array<{
    name: keyof DoctorRegisterStep3FormData;
    label: string;
    description: string;
    accept?: string;
    value?: File;
  }> = [
    {
      name: "doctorProfilePicture",
      label: "Doctor profile picture",
      description: "A recent, clear photo of yourself.",
      accept: "image/png,image/jpeg,image/jpg",
      value: doctorProfilePicture,
    },
    {
      name: "clinicRegistrationDoc",
      label: "Clinic registration document",
      description: "The official clinic registration certificate.",
      accept: ".pdf,image/png,image/jpeg",
      value: clinicRegistrationDoc,
    },
    {
      name: "establishmentLicenceDoc",
      label: "Establishment licence document",
      description: "The clinic's establishment licence.",
      accept: ".pdf,image/png,image/jpeg",
      value: establishmentLicenceDoc,
    },
    {
      name: "medicalLicenceDoc",
      label: "Medical licence document",
      description: "Your current medical licence.",
      accept: ".pdf,image/png,image/jpeg",
      value: medicalLicenceDoc,
    },
    {
      name: "doctorRegistrationDoc",
      label: "Doctor registration document",
      description: "Your doctor registration certificate.",
      accept: ".pdf,image/png,image/jpeg",
      value: doctorRegistrationDoc,
    },
  ];

  const visibleFileFields = fileFieldConfigs.filter((field) =>
    doctorReapplicationDetails?.fieldsToReupload?.includes(field.name),
  );

  const totalToUpdate = updatedInputFields.length + visibleFileFields.length;

  const renderFileField = ({
    name,
    label,
    description,
    accept,
    value,
  }: (typeof fileFieldConfigs)[number]) => {
    const error = errors[name];
    const isSelected = Boolean(value?.name);

    return (
      <div key={name} className="space-y-2">
        <label
          htmlFor={name}
          className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
            isSelected
              ? "border-primary-200 bg-primary-50/40"
              : "border-gray-200 bg-white hover:border-primary-200 hover:bg-gray-50"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
              isSelected
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600"
            }`}
          >
            {isSelected ? (
              <CheckCircle2 size={20} />
            ) : name === "doctorProfilePicture" ? (
              <Image size={20} />
            ) : (
              <FileText size={20} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <p className="mt-0.5 truncate text-xs text-gray-500">
              {value?.name ?? description}
            </p>
          </div>

          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
              isSelected
                ? "text-primary-700"
                : "bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-700"
            }`}
          >
            {!isSelected && <Upload size={14} />}
            {isSelected ? "Change" : "Upload"}
          </span>

          <input
            id={name}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange(name)}
          />
        </label>

        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle size={13} className="shrink-0" />
            {error.message?.toString()}
          </p>
        )}
      </div>
    );
  };

  if (status === "error" && !doctorReapplicationDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* <RegistrationHeader /> */}
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              Unable to load this link
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {errorMessage ??
                "Something went wrong. Please use the link from your email, or contact support."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "submitted") {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary-50 via-white to-cyan-50 flex flex-col">
        <PublicHeader />
        <div className="flex-1 mt-10 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 text-center border border-gray-100">
            <div className="mx-auto mb-2 h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              Application submitted
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Thanks for reapplying. Our credentialing team will review your
              details and follow up by email within 3–5 business days.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!doctorReapplicationDetails) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100 sm:p-8">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading your reapplication details…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-6 sm:p-10 border border-gray-100">
      <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <DoctorPublicHeader />
        <div className="space-y-4 border-b mt-15 border-gray-100 pb-6">
          {totalToUpdate > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              <ClipboardList size={13} />
              {totalToUpdate} item{totalToUpdate === 1 ? "" : "s"} need
              {totalToUpdate === 1 ? "s" : ""} your attention
            </span>
          )}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Complete your reapplication
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
              Update the details and documents flagged below, then resubmit for
              review.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {updatedInputFields.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-gray-800">
                  Personal &amp; professional details
                </h3>
              </div>
              <FormFields<DoctorRegisterStep1FormData>
                fields={updatedInputFields}
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
            </section>
          )}

          {visibleFileFields.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-gray-800">
                  Documents
                </h3>
              </div>
              <div className="space-y-3">
                {visibleFileFields.map((field) => renderFileField(field))}
              </div>
            </section>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-md shadow-primary-100 transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Submitting…" : "Submit application"}
            </button>
            {status === "error" && errorMessage && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-red-600">
                <AlertCircle size={13} className="shrink-0" />
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
