import React from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  CreditCard,
  Settings,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface QuickActionsProps {
  isDark: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ isDark }) => {
  const actions = [
    {
      title: "Add Department",
      description: "Create medical branch or hospital specialty",
      icon: PlusCircle,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/15",
      link: "/admin/department/add",
    },
    {
      title: "Doctor Approvals",
      description: "Verify licenses & authorize doctor accounts",
      icon: ShieldCheck,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/15",
      link: "/admin/doctors",
    },
    {
      title: "Manage Subscriptions",
      description: "Configure doctor pricing tiers and color themes",
      icon: CreditCard,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/15",
      link: "/admin/subscriptions",
    },
    {
      title: "Platform Settings",
      description: "Update platform policies, theme and security",
      icon: Settings,
      iconColor: "text-sky-500",
      iconBg: "bg-sky-500/15",
      link: "/admin/settings",
    },
  ];

  return (
    <div
      className={`p-5 lg:p-6 rounded-2xl border transition-all ${
        isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200"
      }`}
    >
      <div className="mb-4">
        <h2
          className={`text-base font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Administrative Shortcuts
        </h2>
        <p
          className={`text-xs mt-0.5 ${
            isDark ? "text-[#8b9ab0]" : "text-gray-500"
          }`}
        >
          Quick navigation to frequently performed operations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              to={act.link}
              className={`group p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isDark
                  ? "bg-white/[0.02] border-white/5 hover:border-primary/40 hover:bg-primary/[0.04]"
                  : "bg-gray-50/70 border-gray-100 hover:border-primary/40 hover:bg-primary/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${act.iconBg}`}
                >
                  <Icon size={20} className={act.iconColor} />
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </div>

              <div>
                <p
                  className={`text-sm font-bold group-hover:text-primary transition-colors ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {act.title}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    isDark ? "text-[#8b9ab0]" : "text-gray-500"
                  }`}
                >
                  {act.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
