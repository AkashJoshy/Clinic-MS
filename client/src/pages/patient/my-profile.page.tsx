import React, { useEffect, useRef, useState } from "react";
import { Camera, Calendar, Activity, Clock, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store";
import type {
  EmergencyContact,
  EmergencyContactDetails,
  Patient,
  PatientProfile,
  PersonalProfile,
  ProfileAddress,
  ProfileEmergency,
} from "@/types/patient";
import {
  updateAddressProfile,
  updateEmergencyContact,
  updatePatientProfile,
  updatePatientProfilePicture,
} from "@/services/patient.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePersonalProfilePictureSchema } from "@/schemas/patient/personal-details.schema";
import type { UpdatePersonalProfilePictureForm } from "@/schemas/patient/patient.schema";
import PersonalDetails from "@/components/shared/patient/profile/personal-details.shared";
import AddressDetails from "@/components/shared/patient/profile/address-details.shared";
import {
  emptyAddress,
  emptyEmergency,
  emptyProfile,
} from "@/constants/patient.constant";
import PatientInfo from "@/components/shared/patient/profile/patient-info.shared";
import EmergencyDetails from "@/components/shared/patient/profile/emergency-details.shared";
import type { CapitalRelations } from "@/constants/form-fields.constants";

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

const MyProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<PersonalProfile>(emptyProfile);
  const [address, setAddress] = useState<ProfileAddress>(emptyAddress);
  const [emergencyContact, setEmergencyContact] =
    useState<ProfileEmergency>(emptyEmergency);
  const [originalProfile, setOriginalProfile] =
    useState<PersonalProfile>(emptyProfile);
  const [originalAddress, setOriginalAddress] =
    useState<ProfileAddress>(emptyAddress);
  const [originalEmergencyContact, setOriginalEmergencyContact] =
    useState<ProfileEmergency>(emptyEmergency);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { patient: user } = useAuthStore((state) => state.users);
  const updateUser = useAuthStore((state) => state.updateUser);
  const activePatient = useAuthStore((store) => store.activePatient);
  const updateActivePatient = useAuthStore(
    (store) => store.updateActivePatient,
  );
  const patients = useAuthStore((store) => store.patients);
  const updatePatients = useAuthStore((store) => store.updatePatients);

  const { mutateAsync } = useMutate(updatePatientProfile, {
    onSuccess: () => {
      if (activePatient?.patient?.relation === "Self") {
        updateUser({
          fullName: profile.displayName,
        });
      }

      const updatedPatient: PatientProfile = {
        patient: {
          ...activePatient!.patient,
          displayName: profile.displayName,
          dateOfBirth: profile.dateOfBirth,
          gender: profile.gender,
          medicalInformation: {
            bloodGroup: profile.bloodGroup,
            allergies: profile.allergies,
            chronicConditions: profile.chronicConditions,
          },
        },
        address: activePatient?.address ?? null,
      };

      updateActivePatient(updatedPatient);
      updatePatients(updatedPatient);
    },
  });

  const { mutateAsync: addressMutate } = useMutate(updateAddressProfile, {
    onSuccess: () => {
      const updatedAddress = {
        patient: activePatient?.patient!,
        address: {
          id: activePatient?.address?.id ?? "",
          ownerId: activePatient?.patient?.id ?? "",
          addressLine: address.addressLine,
          country: address.country,
          state: address.state,
          city: address.city,
          pincode: address.pincode,
        },
      };

      updateActivePatient(updatedAddress);
      updatePatients(updatedAddress);
    },
  });

  const {
    mutateAsync: profilePictureMutate,
    isPending: profilePictureIsPending,
  } = useMutate(updatePatientProfilePicture, {
    onSuccess: (data) => {
      if (data.data) {
        const updatedPatientInfo: PatientProfile = {
          patient: {
            ...activePatient?.patient!,
            imageUrl: {
              url: data.data?.pictureUrl,
            },
          },
          address: activePatient?.address ?? null,
        };

        updateActivePatient(updatedPatientInfo);
        updatePatients(updatedPatientInfo);
      }
    },
  });

  const { mutateAsync: emergencyMutate } = useMutate(updateEmergencyContact, {
    onSuccess(data) {
      if (data.data) {
        const updatedPatientInfo: PatientProfile = {
          patient: {
            ...activePatient?.patient!,
            emergencyContact: {
              name: data.data?.name,
              phone: data.data?.phone,
              relationship: data.data?.relationship,
            },
          },
          address: activePatient?.address ?? null,
        };

        updateActivePatient(updatedPatientInfo);
        updatePatients(updatedPatientInfo);
      }
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<UpdatePersonalProfilePictureForm>({
    resolver: zodResolver(updatePersonalProfilePictureSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const prof: PersonalProfile = {
      id: activePatient?.patient?.id ?? "",
      displayName: activePatient?.patient.displayName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      dateOfBirth: toDateInputValue(activePatient?.patient?.dateOfBirth),
      gender: activePatient?.patient?.gender ?? "PREFER NOT TO SAY",
      bloodGroup: activePatient?.patient?.medicalInformation?.bloodGroup ?? "",
      allergies: activePatient?.patient?.medicalInformation?.allergies ?? [],
      chronicConditions:
        activePatient?.patient?.medicalInformation?.chronicConditions ?? [],
    };

    const addr: ProfileAddress = {
      ownerId: activePatient?.patient?.id ?? "",
      addressLine: activePatient?.address?.addressLine ?? "",
      country: activePatient?.address?.country ?? "",
      state: activePatient?.address?.state ?? "",
      city: activePatient?.address?.city ?? "",
      pincode: activePatient?.address?.pincode ?? "",
    };

    const emergencyContact: EmergencyContactDetails = {
      id: activePatient?.patient?.id ?? "",
      name: activePatient?.patient?.emergencyContact?.name ?? "",
      phone: activePatient?.patient?.emergencyContact?.phone ?? "",
      relationship: activePatient?.patient?.emergencyContact?.relationship!,
    };

    setProfile(prof);
    setAddress(addr);
    setEmergencyContact(emergencyContact);
    setOriginalProfile(prof);
    setOriginalAddress(addr);
    setOriginalEmergencyContact(emergencyContact);
  }, [activePatient, user]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data: UpdatePersonalProfilePictureForm) => {
    if (!activePatient?.patient?.id) return;

    const formData = new FormData();

    formData.append("patientId", activePatient.patient?.id);
    formData.append("profilePicture", data.profilePicture);

    await profilePictureMutate(formData);

    toast.success("Profile picture updated");
  };

  const handleProfileSave = (prof: PersonalProfile): boolean => {
    if (JSON.stringify(prof) === JSON.stringify(originalProfile)) {
      return false;
    }
    const patient = patients.find((p) => p.patient?.id === profile.id);
    if (!patient) return false;
    setOriginalProfile(prof);
    setProfile(prof);
    mutateAsync(prof);
    return true;
  };

  const handleAddressSave = (addr: ProfileAddress): boolean => {
    if (JSON.stringify(addr) === JSON.stringify(originalAddress)) {
      return false;
    }

    setOriginalAddress(addr);
    setAddress(addr);
    addressMutate(addr);
    return true;
  };

  const handleEmergencySave = (details: EmergencyContactDetails): boolean => {
    const isDetailesMatched =
      details.id === originalEmergencyContact.id &&
      details.name.trim() === originalEmergencyContact.name.trim() &&
      details.phone === originalEmergencyContact.phone &&
      details.relationship.toLowerCase() ===
        originalEmergencyContact.relationship.toLowerCase();

    if (isDetailesMatched) {
      return false;
    }

    details.name = details.name.trim();

    setOriginalEmergencyContact(details);
    setEmergencyContact(details);
    const payload = {
      ...details,
      name: details.name.trim(),
      relationship: details.relationship,
    };

    emergencyMutate(payload);
    return true;
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("profilePicture", file, {
      shouldValidate: true,
    });

    const valid = await trigger("profilePicture");
    if (!valid) return;

    const formData = new FormData();
    formData.append("patientId", activePatient?.patient?.id!);
    formData.append("profilePicture", file);

    await profilePictureMutate(formData);
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 ${
    isEditing
      ? "border-blue-200 bg-white text-gray-900 shadow-sm ring-1 ring-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
      : "border-gray-100 bg-gray-50 text-gray-700 cursor-default"
  }`;

  const displayClasses =
    "w-full px-4 py-2.5 rounded-lg border border-transparent bg-transparent text-gray-700";
  const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";

  const disabledInputClasses =
    "w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed opacity-100";

  const avatarSrc =
    avatarPreview ||
    activePatient?.patient?.imageUrl?.url ||
    "/" + import.meta.env.VITE_DEFAULT_USER_PROFILE_IMAGE;

  return (
    <div className="min-h-screen">
      <div className="space-y-6 bg-white p-6 border border-gray-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800">My Profile</h1>
          <p className="text-gray-500 mt-2">
            Manage your personal information and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-[5px] shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profilePicture")}
                ref={(el) => {
                  register("profilePicture").ref(el);
                  fileInputRef.current = el;
                }}
                onChange={handleFileChange}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={handleAvatarClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleAvatarClick();
                }}
                className="relative group cursor-pointer mb-4"
                aria-label="Change profile photo"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={avatarSrc}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-0 right-2 bg-blue-600 p-2 rounded-full text-white shadow-md border-2 border-white pointer-events-none">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              {errors?.profilePicture?.message && (
                <h2>{String(errors.profilePicture.message)}</h2>
              )}
              <h2 className="text-xl font-semibold text-gray-900">
                {activePatient?.patient?.displayName}
              </h2>
              <p className="text-gray-500 text-sm mb-4">Patient</p>
              <button
                type="button"
                disabled={profilePictureIsPending}
                onClick={handleAvatarClick}
                className={`px-4 py-2 cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors duration-200 text-sm w-full ${profilePictureIsPending ? "opacity-50 cursor-not-allowed" : ""} `}
              >
                {!profilePictureIsPending ? "Change Photo" : "Changing..."}
              </button>
            </form>

            <PatientInfo />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <PersonalDetails
              handleSave={handleProfileSave}
              handleChange={handleChange}
              displayClasses={displayClasses}
              inputClasses={inputClasses}
              labelClasses={labelClasses}
              patientProfile={profile}
              setProfile={setProfile}
              originalProfile={originalProfile}
              setOriginalProfile={setOriginalProfile}
            />

            <EmergencyDetails
              handleChange={handleChange}
              handleSave={handleEmergencySave}
              displayClasses={displayClasses}
              inputClasses={inputClasses}
              labelClasses={labelClasses}
              emergencyContact={emergencyContact}
              setEmergencyContact={setEmergencyContact}
              originalEmergencyContact={originalEmergencyContact}
              setOriginalEmergencyContact={setOriginalEmergencyContact}
            />

            <AddressDetails
              address={address}
              handleSave={handleAddressSave}
              disabledInputClasses={disabledInputClasses}
              inputClasses={inputClasses}
              labelClasses={labelClasses}
              handleChange={handleChange}
              originalAddress={originalAddress}
              setAddress={setAddress}
              setOriginalAddress={setOriginalAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
