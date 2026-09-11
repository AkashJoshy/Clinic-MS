import AuthShowcase from "@/components/shared/auth/auth-showcase.shared";
import RegistrationForm from "@/components/layout/registration-form.layout";

const PatientRegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AuthShowcase />
      <RegistrationForm />
    </div>
  );
};

export default PatientRegisterPage;
