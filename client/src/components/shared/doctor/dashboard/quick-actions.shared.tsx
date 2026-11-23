import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bell, ClipboardList } from "lucide-react";
import type { ThemeProps } from "@/types/common";

export const QuickActions: React.FC<ThemeProps> = ({ isDark }) => {
  const headingClass = isDark ? "text-white" : "text-gray-900";

  const descriptionClass = isDark ? "text-slate-400" : "text-gray-500";

  const cardClass = isDark
    ? "border-slate-700/50 bg-slate-800/40 hover:border-primary/40 hover:bg-slate-800/70"
    : "border-gray-200 bg-white hover:border-primary/40 hover:shadow-md";

  const iconWrapperClass = isDark ? "bg-primary/10" : "bg-primary/10";

  const arrowClass = isDark ? "text-slate-500" : "text-gray-400";

  return (
    <section className="space-y-4">
      <div>
        <h2 className={`text-lg font-semibold ${headingClass}`}>
          Quick Actions
        </h2>

        <p className={`mt-1 text-sm ${descriptionClass}`}>
          Quickly access your frequently used features
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/doctor/session-management"
          className={`group flex items-center justify-between rounded-2xl border p-5 transition-all ${cardClass}`}
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-xl p-3 ${iconWrapperClass}`}>
              <ClipboardList className="size-6 text-primary" />
            </div>

            <div>
              <h3 className={`font-semibold ${headingClass}`}>
                Manage Sessions
              </h3>

              <p className={`mt-1 text-sm ${descriptionClass}`}>
                Manage your weekly schedule and slots
              </p>
            </div>
          </div>

          <ArrowRight
            className={`size-5 transition-transform group-hover:translate-x-1 group-hover:text-primary ${arrowClass}`}
          />
        </Link>

        <Link
          to="/doctor/notifications"
          className={`group flex items-center justify-between rounded-2xl border p-5 transition-all ${cardClass}`}
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-xl p-3 ${iconWrapperClass}`}>
              <Bell className="size-6 text-primary" />
            </div>

            <div>
              <h3 className={`font-semibold ${headingClass}`}>Notifications</h3>

              <p className={`mt-1 text-sm ${descriptionClass}`}>
                Check your latest updates and alerts
              </p>
            </div>
          </div>

          <ArrowRight
            className={`size-5 transition-transform group-hover:translate-x-1 group-hover:text-primary ${arrowClass}`}
          />
        </Link>
      </div>
    </section>
  );
};
