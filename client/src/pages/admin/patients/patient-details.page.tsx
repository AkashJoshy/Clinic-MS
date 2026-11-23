import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserCheck,
  AlertTriangle,
  ShieldAlert as BlockIcon,
} from "lucide-react";
import { getPatient, updatePatient } from "@/services/admin.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import toast from "react-hot-toast";
import type { PatientInfo } from "@/types/patient";
import DeleteConfirmationalModal from "@/components/shared/delete-confirmational-modal.shared";
import { PatientProfileCard } from "@/components/shared/admin/patients/patient-profile-card.shared";
import { PatientContactCard } from "@/components/shared/admin/patients/patient-contact.card.shared";
import { PersonalInformation } from "@/components/shared/admin/patients/personal-information.shared";
import { PATIENT_TABS } from "@/constants/admin.constant";
import { cn } from "@/lib/utils";
import type { PatientDetailsTab } from "@/types/admin";
import type { RouteRoleProps } from "@/types/auth";
import { useAuthStore } from "@/store";
import { getPatientDetailsTheme } from "@/helpers/admin/patients.helper";

export default function PatientDetailsPage({ role }: { role: RouteRoleProps }) {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<PatientDetailsTab>("overview");
  const [patientData, setPatientData] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<"DELETE" | "RESTORE">("DELETE");

  const userTheme = useAuthStore((state) => state.users[role]?.theme);

  const isDark = userTheme === "DARK";

  const theme = getPatientDetailsTheme(isDark);

  const fetchPatientDetails = async () => {
    if (!patientId) return;

    setLoading(true);

    try {
      const res = await getPatient(patientId);

      if (res.success && res.data) {
        setPatientData(res.data);
      } else {
        toast.error(res.message || "Failed to fetch patient details");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [patientId]);

  const { mutate: mutateStatus } = useMutate(updatePatient, {
    onSuccess: () => {
      setIsConfirmOpen(false);
      fetchPatientDetails();
    },
  });

  const handleStatusUpdate = () => {
    if (!patientId) return;

    mutateStatus({
      id: patientId,
      method: actionType,
    });
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-100 flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

        <p className={cn("animate-pulse text-sm", theme.mutedText)}>
          Loading patient details...
        </p>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <button
          onClick={() => navigate("/admin/patients")}
          className={cn(
            "mb-4 flex items-center gap-2 text-sm font-semibold transition-colors",
            theme.backButton,
          )}
        >
          <ArrowLeft size={16} />
          Back to Patient Management
        </button>

        <div
          className={cn(
            "mx-auto max-w-lg rounded-2xl border p-8 text-center",
            theme.card,
          )}
        >
          <AlertTriangle className="mx-auto mb-4 text-amber-500" size={48} />

          <h2 className={cn("mb-2 text-xl font-bold", theme.text)}>
            Patient Not Found
          </h2>

          <p className={cn("mb-6 text-sm", theme.mutedText)}>
            The patient you are looking for does not exist or has been deleted
            from the system.
          </p>

          <button
            onClick={() => navigate("/admin/patients")}
            className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Go Back to List
          </button>
        </div>
      </div>
    );
  }

  const { patient, address, user } = patientData;

  const patientTabsWithCount = PATIENT_TABS.map((tab) => ({
    ...tab,
    count:
      tab.key === "appointments"
        ? 12
        : tab.key === "medical-records"
          ? 8
          : tab.key === "overview"
            ? undefined
            : 12,
  }));

  return (
    <div
      className={cn(
        "mx-auto max-w-350 space-y-6 border p-6 shadow-2xs lg:p-8",
        theme.page,
      )}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <button
          onClick={() => navigate("/admin/patients")}
          className={cn(
            "flex w-fit items-center gap-2 text-sm font-semibold transition-colors",
            theme.backButton,
          )}
        >
          <ArrowLeft size={16} />
          Back to Patients
        </button>

        <div className="flex items-center gap-3">
          {!user?.isBlocked && user?.isActive ? (
            <button
              onClick={() => {
                setActionType("DELETE");
                setIsConfirmOpen(true);
              }}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all",
                theme.blockButton,
              )}
            >
              <BlockIcon size={16} />
              Block Patient
            </button>
          ) : !user?.isBlocked && !user?.isActive ? (
            ""
          ) : (
            <button
              onClick={() => {
                setActionType("RESTORE");
                setIsConfirmOpen(true);
              }}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all",
                theme.restoreButton,
              )}
            >
              <UserCheck size={16} />
              Restore Patient
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div
          className={cn(
            "flex min-w-max items-center gap-1 rounded-xl border p-1.5 shadow-inner",
            theme.tabContainer,
          )}
        >
          {patientTabsWithCount.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-selected={isActive}
                role="tab"
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive ? theme.tabActive : theme.tabInactive,
                )}
              >
                <span>{tab.label}</span>

                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[11px] font-bold transition-colors",
                      isActive ? theme.countActive : theme.countInactive,
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <PatientProfileCard
              patient={patient}
              isActive={user.isActive}
              isBlocked={user.isBlocked}
              isEmailVerified={user.isEmailVerified}
              isDark={isDark}
            />

            <PatientContactCard
              email={user?.email}
              phone={user?.phone}
              createdAt={user?.createdAt}
              isDark={isDark}
            />
          </div>

          <PersonalInformation
            address={address}
            patient={patient}
            isDark={isDark}
          />
        </div>
      )}

      {activeTab === "appointments" && (
        <div className="h-100 min-h-full space-y-6 p-6 lg:p-8" />
      )}

      {activeTab === "medical-records" && (
        <div className="h-100 min-h-full space-y-6 p-6 lg:p-8" />
      )}

      {activeTab === "reviews" && (
        <div className="h-100 min-h-full space-y-6 p-6 lg:p-8" />
      )}

      {isConfirmOpen && (
        <DeleteConfirmationalModal
          id={patientId || ""}
          name={patient.displayName}
          type="Patient"
          status={user.isActive ? "ACTIVE" : "INACTIVE"}
          action={actionType}
          service={handleStatusUpdate}
          closeDeleteBox={() => setIsConfirmOpen(false)}
          isDark={isDark}
        />
      )}
    </div>
  );
}
