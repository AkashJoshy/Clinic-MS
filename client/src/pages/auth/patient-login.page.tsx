import AuthShowcase from "@/components/shared/auth/auth-showcase.shared";
import PatientLoginForm from "@/components/layout/patient-login-form.layout";

const PatientLogin = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AuthShowcase />
      <PatientLoginForm />
    </div>
  );
};

export default PatientLogin;
