import React from "react";
import OTPForm from "@/components/shared/auth/OTPForm";
import { TWO_FACTOR_VERIFICATION_DETAILS } from "@/data/otp.data";

const TwofactorAuthenticationPage = () => {
  return (
    <div>
      <OTPForm
        otpDetails={TWO_FACTOR_VERIFICATION_DETAILS}
        className="mt-10 lg:mt-30"
      />
    </div>
  );
};

export default TwofactorAuthenticationPage;
