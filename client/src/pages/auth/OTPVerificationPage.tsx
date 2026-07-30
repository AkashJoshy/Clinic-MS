import OTPForm from "@/components/shared/auth/OTPForm";
import { OTP_VERIFICATION_DETAILS } from "@/data/otp.data";
import type { Role } from "@/types/auth";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification = ({ role }: { role: Role }) => {
  const location = useLocation();
  let backRoute = role === "ADMIN" ? "/admin" : role === "DOCTOR" ? "/doctor" : "/login" 

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <OTPForm otpDetails={OTP_VERIFICATION_DETAILS} otpEmail={location.state?.email} role={role} />
    </div>
  );
};

export default OTPVerification;
