import type { FieldValues, Path } from "react-hook-form";
import type { FormInputs, Type, OptionItem } from "@/types/common";
import type { Role } from "@/types/auth";
import { GENDER } from "@/constants/form-fields.constants";

export const fieldGenerator = <T extends FieldValues>(
  title: string,
  type: Type,
  placeHolder: string,
  name: Path<T>,
  isRequired: boolean,
  hidden?: boolean,
  isValue?: Role,
  options?: string[] | OptionItem[],
  isDisabled?: boolean,
): FormInputs<T> => ({
  title,
  type,
  placeHolder,
  name,
  isRequired,
  hidden,
  isValue,
  options,
  isDisabled
});

export function createLocationFields<T extends FieldValues>(): FormInputs<T>[] {
  return [
    fieldGenerator<T>(
      "Address Line",
      "text",
      "Full address",
      "addressLine" as Path<T>,
      true,
    ),
    fieldGenerator<T>(
      "Country",
      "select",
      "Select country",
      "country" as Path<T>,
      true,
    ),
    fieldGenerator<T>(
      "State",
      "select",
      "Select state",
      "state" as Path<T>,
      true,
    ),
    fieldGenerator<T>("City", "select", "Select city", "city" as Path<T>, true),
    fieldGenerator<T>(
      "Pincode",
      "text",
      "Enter pincode",
      "pincode" as Path<T>,
      true,
    ),
  ];
}

export function createDepartmentFields<
  T extends FieldValues,
>(): FormInputs<T>[] {
  return [
    fieldGenerator<T>(
      "Department Name",
      "text",
      "Enter department name (e.g. Cardiology)",
      "name" as Path<T>,
      true,
      false,
    ),
    fieldGenerator<T>(
      "Status",
      "select",
      "Select department status",
      "status" as Path<T>,
      true,
      false,
      undefined,
      ["ACTIVE", "INACTIVE"],
    ),
    fieldGenerator<T>(
      "Mode",
      "select",
      "Select consultation mode",
      "mode" as Path<T>,
      true,
      false,
      undefined,
      ["ONLINE", "OFFLINE", "BOTH"],
    ),
  ];
}

export function createDoctorPersonalDetailsFields<
  T extends FieldValues,
>(): FormInputs<T>[] {
  return [
    fieldGenerator<T>(
      "Full Name",
      "text",
      "John Doe",
      "fullName" as Path<T>,
      true,
    ),
    fieldGenerator<T>(
      "Gender",
      "select",
      "Select gender",
      "gender" as Path<T>,
      true,
      false,
      undefined,
      [...GENDER],
    ),
    fieldGenerator<T>(
      "Email Address",
      "email",
      "doctor@hospital.com",
      "email" as Path<T>,
      true,
    ),
    fieldGenerator<T>(
      "Phone Number",
      "tel",
      "+91 98765 43210",
      "phone" as Path<T>,
      true,
    ),
    fieldGenerator(
      "Password",
      "password",
      "Min. 8 characters",
      "password" as Path<T>,
      true,
    ),
  ];
}
