import { useDoctorRegistrationContext } from "@/hooks/useDoctorRegistrationContext";
import React, { useEffect } from "react";
import FormFields from "../FormFields";
import type { DoctorRegisterStep2FormData } from "@/schemas/doctor/doctor.schema";
import { DOCTOR_STEP2_INPUTS } from "@/data/doctor.data";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import ClinicMap from "./ClinicMap";
import useLocationStorage from "@/hooks/useLocationStorage";

const ClinicAddress = () => {
  const { step2Form } = useDoctorRegistrationContext();
  const { countries, states, cities, handleCountryChange, handleStateChange } =
    useLocationOptions();
  const [position, setPosition] = useLocationStorage("CLINIC_POSITION", {
    lat: 10.025569,
    lng: 76.311377,
  });

  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = step2Form;

  DOCTOR_STEP2_INPUTS[5].options = countries.map((c) => c.name);

  const country = watch("country");
  useEffect(() => {
    if (country) {
      handleCountryChange(country);
    }
  }, [country, countries]);
  DOCTOR_STEP2_INPUTS[6].options = states.map((s) => s.name);

  const state = watch("state");
  useEffect(() => {
    if (state && country) {
      handleStateChange(country, state);
      setValue("latitude", String(position.lat));
      setValue("longitude", String(position.lng));
    }
  }, [country, state, countries]);
  DOCTOR_STEP2_INPUTS[7].options = cities.map((c) => c.name);

  const city = watch("city");

  return (
    <section>
      <h2 className="text-lg font-bold mb-3">Clinic Address</h2>

      <form className="space-y-2">
      <FormFields<DoctorRegisterStep2FormData>
        fields={DOCTOR_STEP2_INPUTS.slice(4, 9)}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
        />
        </form>

      {city && <ClinicMap position={position} setPosition={setPosition} />}
    </section>
  );
};

export default ClinicAddress;
