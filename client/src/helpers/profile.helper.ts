import { GENDER_API_TO_LABEL } from "@/constants/patient.constant";
import type { Gender } from "@/types/patient";

export const formatDateDisplay = (value?: string) => {
  if (!value) return "Not set";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Not set";
  return d.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const normalizeGender = (value?: Gender): Gender => {
  if (!value) return "Prefer Not To Say" as Gender;
  return (
    (GENDER_API_TO_LABEL[value.toUpperCase()] as Gender) ??
    ("Prefer Not To Say" as Gender)
  );
};

