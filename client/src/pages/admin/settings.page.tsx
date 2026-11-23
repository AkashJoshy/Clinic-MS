import React from "react";
import { Settings, ChevronRight, Menu } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useSettings } from "../../hooks/use-settings.hook";
import { sectionId } from "../../constants/admin-settings.constant";
import type { NavItem } from "../../types/admin-settings";
import {
  SettingsCard,
  SettingsNavigation,
  SettingsMobileDrawer,
  SettingsSaveBar,
  GeneralSettingsSection,
  BusinessSettingsSection,
  SystemSettingsSection,
} from "../../components/shared/admin/settings";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";
import { getAdminSettingsPageTheme } from "@/helpers/admin/settings.helper";

const AdminSettingsPage: React.FC = () => {
  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  const theme = getAdminSettingsPageTheme(isDark);

  const {
    activeSection,
    activeSetting,
    isDrawerOpen,
    setIsDrawerOpen,
    general,
    business,
    system,
    activeGroup,
    changedCount,
    isChanged,
    updateBusiness,
    updateSystem,
    handleNavigation,
    handleReset,
    handleSectionSave,
    methods,
    isPending,
  } = useSettings();

  const {
    formState: { dirtyFields },
  } = methods;

  const hasDirtyFields = (value: unknown): boolean => {
    if (value === true) return true;

    if (value && typeof value === "object") {
      return Object.values(value).some(hasDirtyFields);
    }

    return false;
  };

  const sectionKey = activeSection.toLowerCase() as
    | "general"
    | "business"
    | "system";

  const isCurrentSectionDirty = hasDirtyFields(dirtyFields[sectionKey]);

  const renderSectionContent = (item: NavItem) => {
    if (activeSection === "GENERAL") {
      return <GeneralSettingsSection sectionKey={item.id} isDark={isDark} />;
    }

    if (activeSection === "BUSINESS") {
      return (
        <BusinessSettingsSection
          sectionKey={item.id}
          business={business}
          currency={general.currency}
          updateBusiness={updateBusiness}
          isDark={isDark}
        />
      );
    }

    return (
      <SystemSettingsSection
        sectionKey={item.id}
        system={system}
        updateSystem={updateSystem}
        isDark={isDark}
      />
    );
  };

  return (
    <FormProvider {...methods}>
      <div
        className={`relative min-h-full p-4 sm:p-6 lg:p-8 space-y-6 border shadow-2xs transition-colors ${theme.container}`}
      >
        <div className="flex items-center gap-3">
          <AdminPageHeader
            icon={Settings}
            title="Settings"
            description="Manage platform configuration and preferences"
            isDark={isDark}
          />

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open settings navigation"
            aria-expanded={isDrawerOpen}
            className={`lg:hidden ml-auto shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${theme.mobileNavigationButton}`}
          >
            <Menu size={20} />
          </button>
        </div>

        <SettingsMobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeSection={activeSection}
          activeSetting={activeSetting}
          isChanged={isChanged}
          onNavigate={handleNavigation}
          isDark={isDark}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
          <aside
            className={`hidden lg:block sticky top-6 border rounded-2xl p-3 transition-colors ${theme.desktopNavigation}`}
          >
            <SettingsNavigation
              activeSection={activeSection}
              activeSetting={activeSetting}
              isChanged={isChanged}
              onNavigate={handleNavigation}
              isDark={isDark}
            />
          </aside>

          <div className="min-w-0 space-y-5">
            <div className="px-1">
              <nav
                aria-label="Breadcrumb"
                className={`flex items-center gap-1.5 text-xs ${theme.breadcrumb}`}
              >
                <span>Settings</span>
                <ChevronRight size={12} />
                <span className="font-medium text-primary">
                  {activeGroup.label}
                </span>
              </nav>

              <h2 className={`text-2xl font-bold mt-2 ${theme.heading}`}>
                {activeGroup.label} settings
              </h2>

              <p className={`text-sm mt-1 ${theme.description}`}>
                {activeGroup.description}
              </p>
            </div>

            {activeGroup.items.map((item) => (
              <SettingsCard
                key={item.id}
                id={sectionId(item.id)}
                icon={item.icon}
                title={item.label}
                description={item.description}
                changed={isChanged(item.id)}
                isDark={isDark}
              >
                {renderSectionContent(item)}
              </SettingsCard>
            ))}

            <SettingsSaveBar
              isDirty={isCurrentSectionDirty}
              isPending={isPending}
              changedCount={changedCount}
              activeGroupLabel={activeGroup.label}
              onSave={handleSectionSave}
              onReset={handleReset}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AdminSettingsPage;
