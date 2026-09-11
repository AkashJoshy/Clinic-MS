import PublicHeader from "@/components/layout/public-header.layout";
import DoctorRegistration from "@/components/shared/doctor-registration/doctor-registration.shared";
import DoctorRegistrationProvider from "@/components/shared/doctor-registration/doctor-registration-provider.shared";

const DoctorRegistrationPage = () => {
  return (
    <div>
      <PublicHeader />
      <DoctorRegistrationProvider>
        <DoctorRegistration />
      </DoctorRegistrationProvider>
    </div>
  );
};

export default DoctorRegistrationPage;
