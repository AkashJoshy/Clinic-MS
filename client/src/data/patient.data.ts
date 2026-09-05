import type { FormInputs } from "@/types/common";
import { createLocationFields, fieldGenerator } from "./base.data";
import type { RelativeFormData } from "@/schemas/patient/patient.schema";
import {
  BLOODGROUPS,
  GENDER_WITH_LABEL,
  RELATIONS,
} from "@/constants/form-fields.constants";

export const RELATIVE_REGISTER_FORM_INPUTS: FormInputs<RelativeFormData>[] = [
  fieldGenerator("Full Name", "text", "Enter full name", "name", true, false),
  fieldGenerator(
    "Relation",
    "select",
    "Select relation",
    "relation",
    true,
    false,
    undefined,
    RELATIONS.filter((r) => r !== "Self"),
  ),

  fieldGenerator(
    "Blood Group",
    "select",
    "Select blood group",
    "bloodGroup",
    true,
    false,
    undefined,
    BLOODGROUPS,
  ),

  fieldGenerator(
    "Date of Birth",
    "date",
    "Select date of birth",
    "dateOfBirth",
    true,
    false,
  ),

  fieldGenerator(
    "Gender",
    "select",
    "Select gender",
    "gender",
    true,
    false,
    undefined,
    [...GENDER_WITH_LABEL],
  ),

  fieldGenerator(
    "Allergies",
    "multiselect",
    "Select allergies",
    "allergies",
    false,
    false,
    undefined,
    [
      "Dust",
      "Pollen",
      "Food Allergy",
      "Drug Allergy",
      "Penicillin",
      "Latex",
      "Pet Allergy",
      "Skin Allergy",
      "Other",
    ],
  ),

  fieldGenerator(
    "Chronic Conditions",
    "multiselect",
    "Select chronic conditions",
    "chronicConditions",
    false,
    false,
    undefined,
    [
      "Diabetes",
      "Hypertension",
      "Asthma",
      "Heart Disease",
      "Thyroid Disorder",
      "Kidney Disease",
      "Arthritis",
      "Migraine",
      "Epilepsy",
      "Cancer",
      "Other",
    ],
  ),
  fieldGenerator("", "hidden", "", "userId", true, true),
];

export const PATIENT_LOCATION_FIELDS = createLocationFields<RelativeFormData>()