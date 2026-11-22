
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Info } from "lucide-react";

import {
  addressSchema,
  type AddressForm,
} from "@/schemas/patient/address.schema";
import { emptyAddress } from "@/constants/patient.constant";
import { useLocationOptions } from "@/hooks/use-location-options.hook";
import { useAuthStore } from "@/store";
import { useAuthMutate } from "@/hooks/use-auth-mutate.hook";
import { updateDoctorAddress } from "@/services/doctor.service";

type DoctorProfile = NonNullable<
  ReturnType<typeof useAuthStore.getState>["doctor"]
>;

type DoctorClinicDetails = NonNullable<
  DoctorProfile["doctorClinicDetails"]
>[number];

interface UseDoctorAddressProps {
  doctorProfile: DoctorProfile;
  clinicDetails: DoctorClinicDetails;
}

export const useDoctorAddress = ({
  doctorProfile,
  clinicDetails,
}: UseDoctorAddressProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const updateDoctor = useAuthStore((state) => state.updateDoctor);
  const { primaryColor } = useAuthStore((state) => state.platform);

  const {
    countries,
    states,
    cities,
    handleCountryChange,
    handleStateChange,
  } = useLocationOptions();

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

  const address: AddressForm = {
    ownerId:
      clinicDetails.clinicAddress?.ownerId ??
      clinicDetails.clinic?.id ??
      "",
    addressLine: clinicDetails.clinicAddress?.addressLine ?? "",
    country: clinicDetails.clinicAddress?.country ?? "",
    state: clinicDetails.clinicAddress?.state ?? "",
    city: clinicDetails.clinicAddress?.city ?? "",
    pincode: clinicDetails.clinicAddress?.pincode ?? "",
  };

  const { mutate, isPending } = useAuthMutate(updateDoctorAddress, {
    onSuccess(data) {
      if (!data?.data) return;

      updateDoctor({
        ...doctorProfile,
        doctorClinicDetails: doctorProfile.doctorClinicDetails.map(
          (details) =>
            details.id === clinicDetails.id
              ? {
                  ...details,
                  clinicAddress: { ...data.data },
                }
              : details,
        ),
      });

      setIsEditing(false);
    },
  });

  // Sync form values with the selected clinic address.
  useEffect(() => {
    reset(address);
  }, [
    reset,
    clinicDetails.id,
    clinicDetails.clinicAddress?.ownerId,
    clinicDetails.clinicAddress?.addressLine,
    clinicDetails.clinicAddress?.country,
    clinicDetails.clinicAddress?.state,
    clinicDetails.clinicAddress?.city,
    clinicDetails.clinicAddress?.pincode,
  ]);

  // Load states when the country changes.
  useEffect(() => {
    if (country) {
      handleCountryChange(country);
    }
  }, [country, handleCountryChange]);

  // Load cities when the state changes.
  useEffect(() => {
    if (country && state) {
      handleStateChange(country, state);
    }
  }, [country, state, handleStateChange]);

  const startEdit = () => {
    reset(address);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    reset(address);
    setIsEditing(false);
  };

  const onSubmit = (data: AddressForm) => {
    const hasChanges =
      data.addressLine !== address.addressLine ||
      data.country !== address.country ||
      data.state !== address.state ||
      data.city !== address.city ||
      data.pincode !== address.pincode;

    if (!hasChanges) {
      toast.custom(
        () => (
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow-lg">
            <Info className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">
              No changes were made.
            </p>
          </div>
        ),
        { position: "bottom-right" },
      );

      return;
    }

    console.log(`Data from the Address Mutate: `);
    console.log(data);

    mutate(data);
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const hasAddress = Object.values(address).some(
    (value) => value && value.trim().length > 0,
  );

  return {
    // Form
    register,
    errors,
    handleFormSubmit,

    // Location options
    countries,
    states,
    cities,
    country,
    state,

    // Address
    address,
    hasAddress,

    // Editing
    isEditing,
    startEdit,
    cancelEdit,

    // Mutation
    isPending,

    // Theme
    primaryColor,
  };
};
