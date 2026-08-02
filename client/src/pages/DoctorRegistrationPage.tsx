import PublicHeader from "@/components/layout/PublicHeader";
import DoctorRegistration from "@/components/shared/doctor-registration/DoctorRegistration";
import DoctorRegistrationProvider from "@/components/shared/doctor-registration/DoctorRegistrationProvider";


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
