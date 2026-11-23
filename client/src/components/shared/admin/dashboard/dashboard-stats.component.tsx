import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Users,
  Network,
  CreditCard,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import type { DashboardStatsData } from "@/types/admin/dashboard.types";
import { getDashboardStatsTheme } from "@/helpers/admin/dashboard.helper";

interface DashboardStatsProps {
  stats: DashboardStatsData;
  isDark: boolean;
}

interface StatItemProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  badge?: {
    text: string;
    variant: "success" | "warning" | "info" | "neutral" | "danger";
  };
  linkTo?: string;
  isDark: boolean;
  extraInfo?: React.ReactNode;
}


const StatItem: React.FC<StatItemProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  badge,
  linkTo,
  isDark,
  extraInfo,
}) => {
  const theme = getDashboardStatsTheme(isDark);

  const content = (
    <div
      className={`h-full flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 group ${theme.card}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconBg}`}
          >
            <Icon size={22} className={iconColor} />
          </div>

          {badge && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                badge.variant === "warning"
                  ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                  : badge.variant === "success"
                    ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                    : badge.variant === "info"
                      ? "bg-sky-500/15 text-sky-500 border border-sky-500/30"
                      : badge.variant === "danger"
                        ? "bg-red-500/15 text-red-400 border border-red-500/30"
                        : "bg-gray-500/15 text-gray-500 border border-gray-500/30"
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>

        <p
          className={`text-xs font-semibold uppercase tracking-wider mb-1 ${theme.title}`}
        >
          {title}
        </p>

        <p
          className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${theme.value}`}
        >
          {value}
        </p>
      </div>

      <div
        className={`mt-4 pt-3 border-t border-dashed ${theme.footer} flex items-center justify-between text-xs`}
      >
        <span className={theme.subtitle}>{subtitle}</span>

        {linkTo && (
          <span className="text-primary font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            View <ArrowUpRight size={14} />
          </span>
        )}
      </div>

      {extraInfo}
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  isDark,
}) => {
  const { doctors, patients, departments, subscriptionPlans } = stats;

  const theme = getDashboardStatsTheme(isDark);

  return (
    <div className="space-y-4">
      {doctors.pending > 0 && (
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border ${theme.pendingAlert}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-amber-500 animate-pulse" />
            </div>

            <div>
              <p className="font-semibold text-sm">
                {doctors.pending} Doctor Application
                {doctors.pending > 1 ? "s" : ""} Awaiting Review
              </p>

              <p className="text-xs opacity-80">
                Newly registered medical professionals need document
                verification.
              </p>
            </div>
          </div>

          <Link
            to="/admin/doctors"
            className="self-start sm:self-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Review Applications
          </Link>
        </div>
      )}

      {/* Main 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatItem
          title="Total Doctors"
          value={doctors.total}
          subtitle={`${doctors.approved} approved • ${doctors.pending} pending`}
          icon={Stethoscope}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/15"
          badge={
            doctors.rejected > 0
              ? { text: `${doctors.rejected} Rejected`, variant: "danger" }
              : { text: "All Verified", variant: "success" }
          }
          linkTo="/admin/doctors"
          isDark={isDark}
        />

        <StatItem
          title="Total Patients"
          value={patients.total}
          subtitle={`${patients.active} active accounts`}
          icon={Users}
          iconColor="text-sky-500"
          iconBg="bg-sky-500/15"
          badge={
            patients.inactive > 0
              ? { text: `${patients.inactive} Inactive`, variant: "warning" }
              : { text: "All Active", variant: "success" }
          }
          linkTo="/admin/patients"
          isDark={isDark}
        />

        <StatItem
          title="Departments"
          value={departments.total}
          subtitle={`${departments.active} active medical specialties`}
          icon={Network}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-500/15"
          badge={
            departments.inactive > 0
              ? { text: `${departments.inactive} Inactive`, variant: "warning" }
              : { text: "All Operational", variant: "success" }
          }
          linkTo="/admin/departments"
          isDark={isDark}
        />

        <StatItem
          title="Subscription Plans"
          value={subscriptionPlans.total}
          subtitle={`${subscriptionPlans.active} active plans available`}
          icon={CreditCard}
          iconColor="text-purple-500"
          iconBg="bg-purple-500/15"
          badge={
            subscriptionPlans.inactive > 0
              ? {
                  text: `${subscriptionPlans.inactive} Inactive`,
                  variant: "warning",
                }
              : { text: "All Available", variant: "success" }
          }
          linkTo="/admin/subscriptions"
          isDark={isDark}
        />
      </div>
    </div>
  );
};