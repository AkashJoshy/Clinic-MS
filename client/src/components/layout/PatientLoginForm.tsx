import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormData } from "@/schemas/auth.schema";
import { loginSchema } from "@/schemas/auth.schema";
import { LOGIN_FORM_INPUTS } from "@/data/authFormInputs.data";
import { FcGoogle } from "react-icons/fc";
import FormFields from "../shared/FormFields";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { initiateGoogleAuth, loginUser } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { useAuthMutate } from "@/hooks/useAuthMutate";
import { useAuthStore } from "@/store";
import type { GoogleAuthMode } from "@/types/auth";


const PatientLoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
    role: "PATIENT",
  },
  });
  const navigate = useNavigate()

  const { mutateAsync, isPending, setLoading } = useAuthMutate(loginUser, {
    onSuccess: () => {
      navigate("/patient/dashboard")
    }
  })

  const login = useAuthStore(state => state.login)
  const savedToken = useAuthStore(state => state.tokens)
  
  const handleGoogleLogin = async (mode: GoogleAuthMode) => {
    await initiateGoogleAuth(mode)
  }


  const [searchParams] = useSearchParams()
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const user = searchParams.get("user");
  const message = searchParams.get("message");

  useEffect(() => {
      if (message) {
        toast.error(message)
        navigate("/login", { replace: true })
        if (message === "Account not found. Redirecting to signup..." || message.includes("signup")) {
          navigate("/signup")
        }
      }
      if (token && role && user) {
      const parsedUser =
      typeof user === "string" ? JSON.parse(user) : user;
        login(token, parsedUser, parsedUser.role)
      }
  },  [message, user, token])


  return (
    <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Sign in to access your Health dashboard
        </p>

        <form
          onSubmit={handleSubmit(async (data) => { 
            try {
              await mutateAsync(data);
            } catch (error) {
            } 

          })}
          className="space-y-4"
        >
          <FormFields<LoginFormData>
            fields={LOGIN_FORM_INPUTS}
            register={register}
            errors={errors}
            control={control}
          />
          <input type="hidden" {...register("role")} />

          <p className="flex justify-between text-sm text-gray-500">
            <span>Remember me</span>
            <Link to={"/forgot-password"}>
              <span className="cursor-pointer">Forgot password?</span>
            </Link>
          </p>
          <Button type="submit" disabled={isPending} className="w-full">
            {!isPending ? "Sign In" : "Signing in..."}
          </Button>
        </form>

        <h4 className="text-sm text-gray-500 mt-6 text-center">Or</h4>

        <div className="flex items-center justify-center gap-2 w-full px-4 py-2 hover:bg-primary-50 border border-gray-300 rounded-lg cursor-pointer transition">
          <FcGoogle size={20} />
          <span onClick={() => {
            handleGoogleLogin("login")
          }
           } className="text-gray-700 font-medium">Sign in with Google</span>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          New to {import.meta.env.VITE_WEBSITE_NAME.toLowerCase()}?{" "}
          <Link to={"/signup"}>
            <span className="text-primary hover:underline cursor-pointer">
              Create Account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientLoginForm;
