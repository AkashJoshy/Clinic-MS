import AuthShowcase from "@/components/shared/auth/AuthShowcase";
import PatientLoginForm from "@/components/layout/PatientLoginForm";


const PatientLogin = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AuthShowcase />
      <PatientLoginForm />
    </div>
  );
};

export default PatientLogin;
