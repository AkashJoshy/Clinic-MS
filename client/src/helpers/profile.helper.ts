import { GENDER_API_TO_LABEL, RELATION_API_TO_LABEL } from "@/constants/patient.constant";
import type { Gender, RelationToPatient } from "@/types/patient";

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

export const normalizeRelation = (value?: RelationToPatient | undefined): RelationToPatient => {
  if (!value) return ""
  return (
    (RELATION_API_TO_LABEL[value.toUpperCase()] as RelationToPatient ?? "")
  );
}

