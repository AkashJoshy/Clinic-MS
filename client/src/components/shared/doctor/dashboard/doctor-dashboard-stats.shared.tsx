import React from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  IndianRupee,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import type {
  DoctorDashboardStatsProps,
  StatCardProps,
} from "@/types/doctor-dashboard";
import { formatINR } from "@/helpers/wallet.helper";
import { StatCard } from "./stat-card.shared";

const DoctorDashboardStats: React.FC<DoctorDashboardStatsProps> = ({
  data,
}) => {
  if (!data?.appointments || !data?.schedule || !data?.earnings) {
    return null;
  }

  const stats: StatCardProps[] = [
    {
      title: "Appointments",
      value: String(data.appointments.today.total),
      icon: CalendarCheck,
      description: "Today's appointment overview",
      theme: {
        icon: "bg-blue-500/10 text-blue-400",
        value: "text-blue-400",
        border: "border-blue-500/15",
        glow: "bg-blue-500",
        background: "bg-blue-500/10",
        accent: "bg-blue-400",
      },
      details: [
        {
          label: "Completed",
          value: String(data.appointments.today.completed),
          icon: CheckCircle2,
          color: "text-emerald-400",
        },
        {
          label: "Upcoming",
          value: String(data.appointments.today.upcoming),
          icon: Clock3,
          color: "text-amber-400",
        },
        {
          label: "Cancelled",
          value: String(data.appointments.today.cancelled),
          icon: XCircle,
          color: "text-rose-400",
        },
      ],
      footer: (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-300">
            Overall Performance
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-slate-500">Total</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-blue-400">
                {data.appointments.overall.total.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Completed</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-emerald-400">
                {data.appointments.overall.completed.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Cancelled</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-rose-400">
                {data.appointments.overall.cancelled.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      ),
      index: 0,
    },

    {
      title: "Today's Schedule",
      value: String(data.schedule.today.availableSlots),
      icon: Clock3,
      description: "Available appointment slots",
      theme: {
        icon: "bg-emerald-500/10 text-emerald-400",
        value: "text-emerald-400",
        border: "border-emerald-500/15",
        glow: "bg-emerald-500",
        background: "bg-emerald-500/10",
        accent: "bg-emerald-400",
      },
      details: [
        {
          label: "Total",
          value: String(data.schedule.today.totalSlots),
          icon: CalendarCheck,
          color: "text-sky-400",
        },
        {
          label: "Booked",
          value: String(data.schedule.today.bookedSlots),
          icon: Users,
          color: "text-violet-400",
        },
      ],
      index: 1,
    },

    {
      title: "Total Earnings",
      value: formatINR(data.earnings.total),
      icon: IndianRupee,
      description: "Lifetime earnings",
      theme: {
        icon: "bg-violet-500/10 text-violet-400",
        value: "text-violet-400",
        border: "border-violet-500/15",
        glow: "bg-violet-500",
        background: "bg-violet-500/10",
        accent: "bg-violet-400",
      },
      details: [
        {
          label: "Today",
          value: formatINR(data.earnings.today),
          icon: TrendingUp,
          color: "text-emerald-400",
        },
        {
          label: "This month",
          value: formatINR(data.earnings.thisMonth),
          icon: IndianRupee,
          color: "text-violet-400",
        },
      ],
      footer: (
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-300">
            Earnings Overview
          </p>
          <p className="text-xs text-slate-500">
            Lifetime earnings from all recorded appointments
          </p>
        </div>
      ),
      index: 2,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DoctorDashboardStats;
