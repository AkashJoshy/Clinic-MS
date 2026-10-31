import React from "react";
import {
  Users,
  UserCheck,
  HardDrive,
  Video,
  TrendingUp,
  AlertCircle,
  Layers,
} from "lucide-react";
import type { DoctorSubscriptionUsage } from "@/types/doctor-subscription";

interface SubscriptionUsageMetricsProps {
  usage: DoctorSubscriptionUsage | null;
}

export const SubscriptionUsageMetrics: React.FC<
  SubscriptionUsageMetricsProps
> = ({ usage }) => {
  if (!usage) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#1dc465]" />
          <h3 className="text-sm font-bold tracking-tight text-white uppercase">
            Resource Quota & Usage
          </h3>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0c141d]/80 p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#1dc465]/5 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Layers size={22} className="text-[#8b9ab0]" />
            </div>

            <h4 className="text-sm font-bold text-white">
              Usage Metrics Unavailable
            </h4>

            <p className="mt-2 max-w-md text-xs leading-5 text-[#8b9ab0] sm:text-sm">
              Resource usage and quota information will appear here once you
              have an active subscription.
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[11px] font-medium text-amber-400">
              <AlertCircle size={12} />
              No active subscription
            </div>
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      id: "consultations",
      title: "Patient Consultations",
      icon: Users,
      metric: usage.consultations,
      barClass: "bg-[#1dc465]",
      textClass: "text-[#1dc465]",
      bgClass: "bg-[#1dc465]/10",
      description: "Booked & completed clinic sessions",
    },
    {
      id: "staffAccounts",
      title: "Staff & Receptionists",
      icon: UserCheck,
      metric: usage.staffAccounts,
      barClass: "bg-blue-500",
      textClass: "text-blue-400",
      bgClass: "bg-blue-500/10",
      description: "Active delegated team members",
    },
    {
      id: "cloudStorageGb",
      title: "Cloud Records Storage",
      icon: HardDrive,
      metric: usage.cloudStorageGb,
      barClass: "bg-purple-500",
      textClass: "text-purple-400",
      bgClass: "bg-purple-500/10",
      description: "Patient prescriptions & lab uploads",
    },
    {
      id: "telehealthMinutes",
      title: "HD Video Telehealth",
      icon: Video,
      metric: usage.telehealthMinutes,
      barClass: "bg-amber-400",
      textClass: "text-amber-400",
      bgClass: "bg-amber-400/10",
      description: "Encrypted virtual consultations",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#1dc465]" />
          <h3 className="text-sm font-bold tracking-tight text-white uppercase">
            Resource Quota & Usage
          </h3>
        </div>

        <span className="text-[11px] font-medium text-[#8b9ab0]">
          Resets on next billing date
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;

          const percentage =
            m.metric.total > 0
              ? Math.min(
                  100,
                  Math.round((m.metric.used / m.metric.total) * 100),
                )
              : 0;

          const isHighUsage = percentage >= 85;

          return (
            <div
              key={m.id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0c141d]/80 p-4 transition-all hover:border-white/20 hover:bg-[#0c141d]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#8b9ab0]">
                    {m.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {m.description}
                  </p>
                </div>

                <div className={`rounded-lg p-2 ${m.bgClass}`}>
                  <Icon size={16} className={m.textClass} />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white">
                      {m.metric.used}
                    </span>

                    <span className="text-xs text-[#8b9ab0]">
                      / {m.metric.total} {m.metric.unit}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold ${
                      isHighUsage ? "text-amber-400" : m.textClass
                    }`}
                  >
                    {percentage}%
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHighUsage ? "bg-amber-400" : m.barClass
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
