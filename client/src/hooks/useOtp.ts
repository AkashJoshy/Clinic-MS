import type { useOtpdetails } from "@/types/auth";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

function useOtp(length: number = 6, initialCooldown: number = 60): useOtpdetails {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [resendCooldown, setResendCooldown] = useState<number>(initialCooldown);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const otpValue = otp.join("");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.clipboardData.getData("text").replace(/\D/g, ""));
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  useEffect(() => {
    if (resendCooldown === 0) return;

    const timerId = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendCooldown]);

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
  };

  const isComplete = otp.every((d) => d !== "");

  return {
    otp,
    otpValue,
    handleChange,
    handleResend,
    handlePaste,
    inputs,
    handleKeyDown,
    resendCooldown,
    isComplete,
  };
}

export default useOtp