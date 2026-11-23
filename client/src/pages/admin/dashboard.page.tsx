import React, { useEffect, useState, useCallback } from "react";
import {
  LayoutDashboard,
  RefreshCw,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "@/components/shared/page-header.shared";
import {
  dashboardStats,
  departmentDistribution,
  getAllDoctors,
  getAllPatients,
  getAllSubscriptionPlans,
} from "@/services/admin.service";
import { useAuthStore } from "@/store";

import type { DoctorDetailsCardInfo } from "@/types/doctor";
import type { PatientBasicInfo } from "@/types/patient";
import type {
  DepartmentDistributtonData,
  DashboardStatsData,
} from "@/types/admin/dashboard.types";
import type { SubscriptionPlan } from "@/types/subscription";

import {
  DashboardStats,
  PlatformGrowthChart,
  DepartmentDistributionChart,
  RecentActivities,
  RegisteredDoctorsWidget,
  RegisteredPatientsWidget,
  QuickActions,
  DashboardSkeleton,
} from "@/components/shared/admin/dashboard";
import FeatureUnderConstruction from "@/components/shared/feature-under-construction.shared";
import { getAdminDashboardTheme } from "@/helpers/admin/dashboard.helper";

const AdminDashboardPage: React.FC = () => {
  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const theme = getAdminDashboardTheme(isDark);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const [doctors, setDoctors] = useState<DoctorDetailsCardInfo[]>([]);
  const [patients, setPatients] = useState<PatientBasicInfo[]>([]);
  const [departments, setDepartments] = useState<DepartmentDistributtonData>({
    totalDoctors: 0,
    departments: [],
  });
  const [stats, setStats] = useState<DashboardStatsData>();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      const [docsRes, ptsRes, plansRes, departRes, statsRes] =
        await Promise.allSettled([
          getAllDoctors(),
          getAllPatients(),
          getAllSubscriptionPlans(),
          departmentDistribution(),
          dashboardStats(),
        ]);

      if (docsRes.status === "fulfilled" && docsRes.value?.data) {
        setDoctors(docsRes.value.data);
      } else if (docsRes.status === "rejected") {
        console.warn("Doctors fetch warning:", docsRes.reason);
      }

      if (departRes.status === "fulfilled" && departRes.value?.data) {
        console.log(departRes.value.data);

        setDepartments({
          totalDoctors: departRes.value.data.totalDoctors,
          departments: departRes.value.data.departments,
        });
      } else if (departRes.status === "rejected") {
        console.warn("Departments fetch warning:", departRes.reason);
      }

      if (ptsRes.status === "fulfilled" && ptsRes.value?.data) {
        setPatients(ptsRes.value.data);
      } else if (ptsRes.status === "rejected") {
        console.warn("Patients fetch warning:", ptsRes.reason);
      }

      if (statsRes.status === "fulfilled" && statsRes.value?.data) {
        setStats(statsRes.value.data);
      } else if (statsRes.status === "rejected") {
        console.warn("Dashboard stats fetch warning:", statsRes.reason);
      }

      if (plansRes.status === "fulfilled" && plansRes.value?.data) {
        setPlans(plansRes.value.data);
      } else if (plansRes.status === "rejected") {
        console.warn("Plans fetch warning:", plansRes.reason);
      }

      setLastUpdated(new Date());

      if (isRefresh) {
        toast.success("Dashboard metrics refreshed");
      }
    } catch (err: any) {
      console.error("Dashboard data load error:", err);
      setError("Failed to synchronize latest administrative metrics.");
      toast.error("Could not sync dashboard data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const currentDateDisplay = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(lastUpdated);

  return (
    <div
      className={`min-h-full p-5 lg:p-8 space-y-6 border shadow-2xs ${theme.container}`}
    >
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b ${theme.headerDivider}`}
      >
        <PageHeader
          icon={LayoutDashboard}
          title="Dashboard"
          description={`Welcome back, ${
            admin?.fullName || "Administrator"
          } • Healthcare System Management & Monitoring`}
          isDark={isDark}
        />

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${theme.dateBadge}`}
          >
            <Calendar size={14} className="text-primary" />
            <span>{currentDateDisplay}</span>
          </div>

          <button
            onClick={() => fetchDashboardData(true)}
            disabled={isRefreshing || isLoading}
            title="Refresh dashboard metrics"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${theme.refreshButton}`}
          >
            <RefreshCw
              size={14}
              className={`text-primary ${
                isRefreshing
                  ? "animate-spin"
                  : "group-hover:rotate-180 transition-transform"
              }`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border ${theme.errorContainer}`}
        >
          <div className="flex items-center gap-2.5 text-xs font-medium">
            <AlertTriangle size={16} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>

          <button
            onClick={() => fetchDashboardData()}
            className="text-xs font-bold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <DashboardSkeleton isDark={isDark} />
      ) : (
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          {stats && <DashboardStats stats={stats} isDark={isDark} />}

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 min-w-0">
            <div className="lg:col-span-7 min-w-0">
              <PlatformGrowthChart
                doctors={doctors}
                patients={patients}
                isDark={isDark}
              />
            </div>

            <div className="lg:col-span-7 xl:col-span-5 min-w-0">
              <DepartmentDistributionChart
                departmentsDetails={departments}
                isDark={isDark}
              />
            </div>
          </div>

          <QuickActions isDark={isDark} />

          <FeatureUnderConstruction isDark={isDark}>
            <RecentActivities
              doctors={doctors}
              patients={patients}
              isDark={isDark}
            />
          </FeatureUnderConstruction>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 min-w-0">
            <RegisteredDoctorsWidget doctors={doctors} isDark={isDark} />

            <RegisteredPatientsWidget patients={patients} isDark={isDark} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
