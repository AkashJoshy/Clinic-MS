import React, { useState } from "react";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { newPasswordSchema, type NewPasswordData } from "@/schemas/auth.schema";
import FormFields from "../FormFields";
import { NEW_PASSWORD_INPUTS } from "@/data/authFormInputs.data";
import { useMutate } from "@/hooks/useMutate";
import { resetAdminPassword, resetClinicPassword, resetPassword } from "@/services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ResetPasswordDto, Role } from "@/types/auth";

const NewPasswordForm = ({ role }: { role: Role }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const resetPasswordHelper = role === "PATIENT" ? resetPassword : (role === "ADMIN" ? resetAdminPassword : resetClinicPassword)
  const backtoLoginPage = role === "PATIENT" ? "/login" : (role === "ADMIN" ? "/admin" :  "/doctor")

  const { mutate, isPending } = useMutate(resetPasswordHelper, {
    onSuccess: () => navigate(backtoLoginPage),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPasswordData>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });


  return (
    <div className="flex w-full min-h-screen items-center justify-center p-6 sm:p-12 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Icon */}
        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
          <MdLockOutline size={24} className="text-primary" />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Set New Password
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Your new password must be different from your previous password.
        </p>

        <form
          onSubmit={handleSubmit((data) => {
            if (!token) return;
            mutate({
              ...data, token, role
            } as ResetPasswordDto);
          })}
          className="space-y-4"
        >
          <FormFields<NewPasswordData>
            fields={NEW_PASSWORD_INPUTS}
            register={register}
            errors={errors}
            control={control}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <Link to={backtoLoginPage}>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6 hover:text-primary transition-colors cursor-pointer">
            <IoArrowBack size={16} />
            Back to Sign In
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NewPasswordForm;
