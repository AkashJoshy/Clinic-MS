// AddProfile.tsx
import React, { useEffect } from "react";
import FormFields from "../FormFields";
import type { RelativeFormData } from "@/schemas/patient/patient.schema";
import { useAuthStore } from "@/store";
import {
  PATIENT_LOCATION_FIELDS,
  RELATIVE_REGISTER_FORM_INPUTS,
} from "@/data/patient.data";
import toast from "react-hot-toast";
import type { AddProfileProps, PatientProfile } from "@/types/patient";
import { usePatientForm } from "@/hooks/usePatientForm";
import { createPatientProfile } from "@/services/patient.service";
import { useLocationOptions } from "@/hooks/useLocationOptions";


const AddProfile: React.FC<AddProfileProps> = ({
  isSubmit,
  onClose,
  formInstance,
}) => {
  const patients = useAuthStore((state) => state.patients);
  const setPatients = useAuthStore((state) => state.setPatients);
  const activePatient = useAuthStore((state) => state.activePatient);
  const user = useAuthStore((state) => state.user);
  const { countries, states, cities, handleCountryChange, handleStateChange } =
    useLocationOptions();

  const internalForm = usePatientForm();
  const {
    addAllergy,
    addChronic,
    allergies,
    allergyInput,
    chronicConditions,
    chronicInput,
    form,
    removeAllergy,
    removeChronic,
    setAllergyInput,
    setChronicInput,
  } = formInstance ?? internalForm;

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = form;

  const addressOption = watch("addressOption");

  useEffect(() => {
    const relations = patients.map(
      (p) =>
        p.patient?.relation[0] + p.patient?.relation.slice(1).toLowerCase(),
    );
    const allUniqueRelations = [
      "Father",
      "Mother",
      "Grandfather",
      "Grandmother",
      "Father_In_Law",
      "Mother_In_Law",
      "Husband",
      "Wife",
      "Spouse",
    ];

    const options = RELATIVE_REGISTER_FORM_INPUTS[1].options as string[];
    const sortedRelations = relations.filter((r) =>
      allUniqueRelations.includes(r),
    );
    const allAvailableRelations = options?.filter(
      (r) => !sortedRelations.includes(r),
    ) as string[];
    RELATIVE_REGISTER_FORM_INPUTS[1].options = allAvailableRelations;
  }, []);

  const isAddressComplete =
    !!activePatient?.address &&
    !!activePatient.address.addressLine &&
    !!activePatient.address.city &&
    !!activePatient.address.country &&
    !!activePatient.address.state &&
    !!activePatient.address.pincode;

  PATIENT_LOCATION_FIELDS[1].options = countries.map((c) => c.name);

  const country = watch("country");
  useEffect(() => {
    if (country) {
      handleCountryChange(country);
    }
  }, [country, countries]);

  PATIENT_LOCATION_FIELDS[2].options = states.map((s) => s.name);

  const state = watch("state");
  useEffect(() => {
    if (state && country) {
      handleStateChange(country, state);
    }
  }, [country, state, countries]);

  PATIENT_LOCATION_FIELDS[3].options = cities.map((c) => c.name);

  useEffect(() => {
    if (addressOption === "PRIMARY") {
      if (isAddressComplete) {
        if (activePatient?.address?.addressLine)
          setValue("addressLine", activePatient.address.addressLine);
        if (activePatient?.address?.country)
          setValue("country", activePatient.address.country);
        if (activePatient?.address?.state)
          setValue("state", activePatient.address.state);
        if (activePatient?.address?.city)
          setValue("city", activePatient.address.city);
        if (activePatient?.address?.pincode)
          setValue("pincode", activePatient.address.pincode);
      }
    } else if (addressOption === "NEW") {
      setValue("addressLine", "");
      setValue("country", "");
      setValue("state", "");
      setValue("city", "");
      setValue("pincode", "");
    }
  }, [addressOption]);

  const handleSubmit = async () => {
    setValue("userId", user?.id || "");

    const isValid = await trigger();
    if (!isValid) return;
    try {
      const data = watch();

      const result = await createPatientProfile({
        ...data,
        allergies: data.allergies ?? [],
        chronicConditions: data.chronicConditions ?? [],
      });

      if (result.success && result.data) {
        toast.success("Profile created successfully!");
        const updated = [...patients, result.data];
        setPatients(updated as PatientProfile[]);
        reset();
        if (onClose) onClose();
      } else {
        toast.error(result.message || "Failed to create profile.");
      }
    } catch (e) {
      toast.error("Error creating profile.");
    }
  };

  const standardFields = RELATIVE_REGISTER_FORM_INPUTS.filter(
    (f) => f.name !== "allergies" && f.name !== "chronicConditions",
  );

  return (
    <>
      <div className="grid gap-4">
        <FormFields<RelativeFormData>
          fields={standardFields}
          register={register}
          errors={errors}
          control={control}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Allergies
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAllergy()}
              placeholder="Type an allergy and press Enter"
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={addAllergy}
              className="px-4 cursor-pointer py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg"
            >
              Add
            </button>
          </div>
          {allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {allergies.map((item: string) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeAllergy(item)}
                    className="hover:bg-emerald-100 rounded-full w-4 h-4 flex items-center justify-center text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 italic">
              No allergies added.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Chronic Conditions
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={chronicInput}
              onChange={(e) => setChronicInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addChronic()}
              placeholder="Type a condition and press Enter"
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={addChronic}
              className="px-4 py-2 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg"
            >
              Add
            </button>
          </div>
          {chronicConditions.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {chronicConditions.map((item: string) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeChronic(item)}
                    className="hover:bg-emerald-100 rounded-full w-4 h-4 flex items-center justify-center text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 italic">
              No chronic conditions added.
            </p>
          )}
        </div>

        <label className="block text-sm font-medium text-slate-700">
          Address
        </label>
        {isAddressComplete && (
          <div className="flex gap-6">
            <label className=" text-sm font-medium text-slate-700">
              <input
                type="radio"
                value="PRIMARY"
                {...register("addressOption")}
              />
              Use primary address
            </label>
            <label className="text-sm font-medium text-slate-700">
              <input type="radio" value="NEW" {...register("addressOption")} />
              Add a different address
            </label>
          </div>
        )}

        {errors.addressOption && (
          <p className="text-[12px] text-red-500 -mt-3">
            {errors.addressOption.message}
          </p>
        )}

        {addressOption === "PRIMARY" && activePatient?.address && (
          <div className="mt-4 rounded-lg border bg-slate-50 p-4">
            <h3 className="mb-2 font-medium text-slate-700">Primary Address</h3>
            <p>{activePatient.address.addressLine}</p>
            <p>
              {activePatient.address.city}, {activePatient.address.state}
            </p>
            <p>
              {activePatient.address.country} - {activePatient.address.pincode}
            </p>
          </div>
        )}

        {addressOption === "NEW" && (
          <div className="">
            <FormFields<RelativeFormData>
              fields={PATIENT_LOCATION_FIELDS}
              register={register}
              errors={errors}
              control={control}
            />
          </div>
        )}
      </div>
      {isSubmit && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            Save Profile
          </button>
        </div>
      )}
    </>
  );
};

export default AddProfile;
