import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import FormFields from "../FormFields";
import {
  type ForgotPasswordData,
  forgotPasswordSchema,
} from "@/schemas/auth.schema";
import { FORGOT_PASSWORD_INPUTS } from "@/data/authFormInputs.data";
import { forgotAdminPassword, forgotDoctorPassword, forgotPassword } from "@/services/auth.service";
import { useMutate } from "@/hooks/useMutate";
import type { Role } from "@/types/auth";

const ForgotPasswordForm = ({ role }: { role: Role }) => {
  const navigate = useNavigate()
  const forgotPasswordHelper = role === "PATIENT" ? forgotPassword : (role === "ADMIN" ? forgotAdminPassword : forgotDoctorPassword)
  const backtoLoginPage = role === "PATIENT" ? "/login" : (role === "ADMIN" ? "/admin" :  "/doctor")
  const { mutate, isPending } = useMutate(forgotPasswordHelper, {
    onSuccess: () => navigate(backtoLoginPage)
  });


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  return (
    <div className="flex w-full min-h-screen items-center justify-center p-6 sm:p-12 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
          <MdOutlineEmail size={24} className="text-primary" />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Forgot Password?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          No worries! Enter your email and we'll send you a reset link.
        </p>

        <form
          onSubmit={handleSubmit((data) => {
              mutate({...data, role})
          }
          )}
          className="space-y-4"
        >
          <FormFields<ForgotPasswordData>
            fields={FORGOT_PASSWORD_INPUTS}
            register={register}
            errors={errors}
            control={control}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordForm;
