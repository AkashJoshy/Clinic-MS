import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormData } from "@/schemas/auth.schema";
import { registerSchema } from "@/schemas/auth.schema";
import { REGISTER_FORM_INPUTS } from "@/data/authFormInputs.data";
import FormFields from "../shared/FormFields";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { initiateGoogleAuth, registerUser } from "@/services/auth.service";
import type { RegisterUserDto } from "@/types/auth";
import { FcGoogle } from "react-icons/fc";
import type { GoogleAuthMode } from "@/types/auth";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      role: "PATIENT",
    },
  });

  const handleGoogleSignup = async (mode: GoogleAuthMode) => {
      initiateGoogleAuth(mode)
  }

  const [searchParams] = useSearchParams()
  const message = searchParams.get("message")

  useEffect(() => {
    if (message) {
      toast.error(message)
      navigate("/signup", { replace: true })
      navigate("/login")
    }
  }, [message])


  return (
    <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Create Account
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Fill in the details below to get started.
        </p>

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              setIsPending(true);
              const { email, fullName, password, phone, role } =
                data as RegisterUserDto;
              const res = await registerUser({
                email,
                fullName,
                password,
                phone,
                role,
                provider: "LOCAL",
              });
              if (res.data.token) {
                const expiryTime = Date.now() + import.meta.env.VITE_COOLDOWN_SECOND * 1000
                localStorage.setItem("otpResendExpiry", expiryTime.toString())
                navigate(`/verify-email?token=${res.data.token}`);
              }
            } catch {
              return;
            }
          })}
          className="space-y-4"
        >
          <FormFields<RegisterFormData>
            fields={REGISTER_FORM_INPUTS}
            register={register}
            errors={errors}
            control={control}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {!isPending ? "Register" : "Registering..."}
          </Button>
        </form>

        <h4 className="text-sm text-gray-500 mt-6 text-center">Or</h4>

        <div className="flex items-center justify-center gap-2 w-full px-4 py-2 hover:bg-primary-50 border border-gray-300 rounded-lg cursor-pointer transition">
          <FcGoogle size={20} />
          <span
            onClick={() => {
              handleGoogleSignup("signup");
            }}
            className="text-gray-700 font-medium"
          >
            Sign up with Google
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-primary hover:underline cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
