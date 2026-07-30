import React, { useEffect } from "react";
import AuthBackButton from "./AuthBackButton";
import type { otpDetails, Role } from "@/types/auth";
import AuthLockLogo from "./AuthLockLogo";
import useOtp from "@/hooks/useOtp";
import { otpSchema, type OTPFormData } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resendOtp, verifyEmail } from "@/services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthMutate } from "@/hooks/useAuthMutate";

const OTPForm = ({
  otpDetails,
  className,
  role,
  backRoute
}: {
  otpDetails: otpDetails;
  otpEmail?: string,
  className?: string;
  role: Role;
  backRoute: string
}) => {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { 
    register,
    handleSubmit,
    setValue,
    formState: { errors }
   } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange"
   })
  
  const { mutateAsync, isPending } = useAuthMutate(verifyEmail, {
    onSuccess:() => navigate(backRoute)
  })
  
  const {
    handleChange,
    handleKeyDown,
    handlePaste,
    handleResend,
    inputs,
    isComplete,
    otp,
    otpValue,
    resendCooldown,
  } = useOtp(6);

  useEffect(() => {
    setValue("otp", otpValue, { shouldValidate: true });
  }, [otpValue, setValue]);

  return (
    <div className={`flex flex-1 items-center justify-center p-4 ${className}`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_40px_rgba(29,196,101,0.12),0_2px_12px_rgba(0,0,0,0.08)] px-8 py-10 relative">
        {otpDetails.isResend && (
          <>
            <AuthBackButton role={role} />
          </>
        )}

        <AuthLockLogo />

        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
          {otpDetails.title}
        </h1>
        <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
          {otpDetails.description}
        </p>

        <form onSubmit={handleSubmit(async data => {
          try {
            const token = searchParams.get('token')
            
            if (!token) return
            mutateAsync({ ...data, token })
          } catch (error) {
            return
          }
        })} >
          <input type="hidden" {...register("otp")} />
          <div className="flex gap-1 md:justify-between mb-12">
            {otp.map((digit: string, i: number) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className={`
                w-9 h-13 min-[375px]:w-11 min-[375px]:h-14 min-[425px]:w-13 min-[425px]:h-14 md:w-12 md:h-14 text-center text-xl font-semibold rounded-xl border-2 outline-none
                transition-all duration-200 caret-primary
                ${
                  digit
                    ? "border-primary bg-primary-50 text-primary"
                    : "border-gray-200 bg-gray-50 text-gray-900"
                }
                focus:border-primary focus:bg-primary-50 focus:ring-4 focus:ring-primary/10
                hover:border-gray-300
              `}
              />
            ))}
          </div>

          <button
            disabled={!isComplete}
            className={`
            w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer
            ${
              isComplete
                ? "bg-primary text-white hover:bg-primary-600 shadow-[0_4px_14px_rgba(29,196,101,0.35)] hover:shadow-[0_6px_20px_rgba(29,196,101,0.45)] hover:-translate-y-0.5 active:translate-y-0"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
          >
            Verify and Continue
          </button>
        </form>

        {otpDetails.isResend ? (
          <div className="mt-5 text-center text-sm text-muted-foreground">
            {resendCooldown > 0 ? (
              <p className="flex items-center justify-center gap-1">
                Resend code in{" "}
                <span className="font-semibold text-primary tabular-nums">
                  00:{resendCooldown.toString().padStart(2, "0")}
                </span>
              </p>
            ) : (
              <>
                Didn't receive the code?{" "}
                <button
                  onClick={async () => {
                    handleResend();
                    const token = searchParams.get("token");
                    if (!token) return;
                    await resendOtp({ token });
                  }}
                  className="font-semibold text-primary hover:text-primary-600 underline underline-offset-2 transition-colors duration-200"
                >
                  Resend Code
                </button>
              </>
            )}
          </div>
        ) : (
          <AuthBackButton role={role} className="mt-10 -mb-2.5" />
        )}
      </div>
    </div>
  );
};

export default OTPForm;
