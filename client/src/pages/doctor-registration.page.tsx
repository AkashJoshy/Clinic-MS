import PublicHeader from "@/components/layout/public-header.layout";
import DoctorRegistration from "@/components/shared/doctor-registration/doctor-registration.shared";
import DoctorRegistrationProvider from "@/components/shared/doctor-registration/doctor-registration-provider.shared";
import { usePlatformConfig } from "@/hooks/use-platform-config.hook";

const DoctorRegistrationPage = () => {
  const { websiteName, primaryColor } = usePlatformConfig()

  return (
    <div>
      <PublicHeader primaryColor={primaryColor} websiteName={websiteName} />
      <DoctorRegistrationProvider>
        <DoctorRegistration />
      </DoctorRegistrationProvider>
    </div>
  );
};

export default DoctorRegistrationPage;
