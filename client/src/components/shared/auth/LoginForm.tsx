import { Button } from "../../ui/button";
import FormFields from "../FormFields";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { LOGIN_FORM_INPUTS } from "@/data/authFormInputs.data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutate } from "@/hooks/useAuthMutate";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { loginFormProps } from "@/types/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";

const LoginForm = ({ portal, role, fn, to }: loginFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      role: role,
    },
  });

  const navigateToForgotPasswordPage =
    role === "PATIENT"
      ? "/forgot-password"
      : role === "ADMIN"
        ? "/admin/forgot-password"
        : "/doctor/forgot-password";

  const { isPending, mutateAsync } = useAuthMutate(fn, {
    onSuccess: () => {
      navigate(to);
    },
  });

  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  useEffect(() => {
    if (message) {
      toast.error(message);
      navigate(window.location.pathname, { replace: true });
      if (
        message === "Account not found. Redirecting to signup..." ||
        message.includes("signup")
      ) {
        navigate("/admin");
      }
    }
   
  }, [message]);

  return (
    <div>
      <span className="font-bold text-white mt-5 bg-primary p-1 flex justify-end w-35 rounded ml-auto mr-2 px-4 py-1.5">
        {portal}
        {" Portal"}
      </span>
      <div className="flex w-full items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <div className="w-8.5 h-8.5 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-lg">✦</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary">
            Healthixia Care
          </h2>

          <form
            onSubmit={handleSubmit(async (data) => {
              await mutateAsync(data);
            })}
            className="space-y-4 mt-10"
          >
            <FormFields<LoginFormData>
              fields={LOGIN_FORM_INPUTS}
              register={register}
              errors={errors}
              control={control}
            />

            <p className="flex justify-between text-sm text-gray-500">
              <span>Remember me</span>
              <span>
                <Link to={navigateToForgotPasswordPage}>Forgot password?</Link>
              </span>
            </p>

            <Button type="submit" disabled={isPending} className="w-full">
              {!isPending ? "Sign In" : "Signing in..."}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
