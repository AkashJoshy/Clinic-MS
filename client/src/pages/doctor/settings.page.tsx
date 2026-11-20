import React from "react";
import { Settings, ChevronRight, Menu } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useAuthStore } from "@/store";
import { useDoctorSettings } from "@/hooks/use-doctor-settings.hook";
import { doctorSectionId } from "@/constants/doctor-settings.constant";
import type { DoctorNavItem } from "@/types/doctor-settings";
import { SettingsCard } from "@/components/shared/admin/settings";
import {
  DoctorSettingsNavigation,
  DoctorSettingsMobileDrawer,
  ProfileInfoSection,
  KycSection,
  SecuritySection,
  NotificationsSection,
  AppearanceSection,
  AccountManagementSection,
} from "@/components/shared/doctor/settings";
import FeatureUnderConstruction from "@/components/shared/feature-under-construction.shared";

const DoctorSettingsPage: React.FC = () => {
  const doctor = useAuthStore((state) => state.users.doctor);
  const { primaryColor } = useAuthStore((state) => state.platform);
  const isDark = doctor?.theme ? doctor.theme === "DARK" : true;

  const {
    activeSection,
    activeSetting,
    isDrawerOpen,
    setIsDrawerOpen,
    activeGroup,
    isChanged,
    handleNavigation,
    methods,
    mutate,
    isPending,
  } = useDoctorSettings();

  const renderSectionContent = (item: DoctorNavItem) => {
    switch (item.id) {
      case "PROFILE_INFO":
        return <ProfileInfoSection isDark={isDark} />;
      case "KYC":
        return <KycSection isDark={isDark} />;
      case "SECURITY":
        return (
          <SecuritySection
            isDark={isDark}
            role="doctor"
            mutateFn={mutate}
            isMutateFn={isPending}
          />
        );
      case "NOTIFICATIONS":
        return (
          <FeatureUnderConstruction>
            <NotificationsSection isDark={isDark} />;
          </FeatureUnderConstruction>
        )
      case "APPEARANCE":
        return <AppearanceSection isDark={isDark} />;
      case "ACCOUNT_MANAGEMENT":
        return <AccountManagementSection isDark={isDark} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div
        className={`relative min-h-full p-4 sm:p-6 lg:p-8 space-y-6 border shadow-2xs transition-colors ${
          isDark
            ? "border-white/10 bg-white/[0.02]"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl border"
            style={{
              backgroundColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)`,
              borderColor: `color-mix(in srgb, ${primaryColor} 25%, transparent)`,
            }}
          >
            <Settings size={22} style={{ color: primaryColor }} />
          </div>

          <div>
            <h1
              className={`text-xl sm:text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Doctor Settings
            </h1>
            <p
              className={`text-xs sm:text-sm mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Manage your profile preferences, identity KYC verification,
              security, and practice settings
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open settings navigation"
            aria-expanded={isDrawerOpen}
            className={`lg:hidden ml-auto shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? "bg-[#0d1a27] border-white/10 text-[#8b9ab0] hover:text-white"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-900"
            }`}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <DoctorSettingsMobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeSection={activeSection}
          activeSetting={activeSetting}
          isChanged={isChanged}
          onNavigate={handleNavigation}
          isDark={isDark}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] gap-6 items-start">
          <aside
            className={`hidden lg:block sticky top-6 self-start h-fit border rounded-2xl p-4 transition-colors ${
              isDark
                ? "bg-[#0d1a27] border-white/[0.08]"
                : "bg-white border-gray-200"
            }`}
          >
            <DoctorSettingsNavigation
              activeSection={activeSection}
              activeSetting={activeSetting}
              isChanged={isChanged}
              onNavigate={handleNavigation}
              isDark={isDark}
            />
          </aside>

          <div className="min-w-0 space-y-6">
            <div className="px-1">
              <nav
                aria-label="Breadcrumb"
                className={`flex items-center gap-1.5 text-xs ${
                  isDark ? "text-[#6b7c93]" : "text-gray-500"
                }`}
              >
                <span>Doctor Portal</span>
                <ChevronRight size={12} />
                <span>Settings</span>
                <ChevronRight size={12} />
                <span className="font-medium text-primary">
                  {activeGroup.label}
                </span>
              </nav>

              <h2
                className={`text-2xl font-bold mt-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {activeGroup.label}
              </h2>

              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-[#8b9ab0]" : "text-gray-500"
                }`}
              >
                {activeGroup.description}
              </p>
            </div>

            {activeGroup.items.map((item) => (
              <SettingsCard
                key={item.id}
                id={doctorSectionId(item.id)}
                icon={item.icon}
                title={item.label}
                description={item.description}
                changed={isChanged(item.id)}
                isDark={isDark}
              >
                {renderSectionContent(item)}
              </SettingsCard>
            ))}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default DoctorSettingsPage;
