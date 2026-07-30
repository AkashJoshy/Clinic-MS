import React from "react";
import AuthShowcase from "@/components/shared/auth/AuthShowcase";
import RegistrationForm from "@/components/layout/RegistrationForm";

const PatientRegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <AuthShowcase />
      <RegistrationForm />
    </div>
  );
};

export default PatientRegisterPage;
