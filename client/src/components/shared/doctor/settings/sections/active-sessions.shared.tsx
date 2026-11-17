import { ghostButton } from "@/constants/admin-settings.constant";
import { Laptop, LogOut, Smartphone } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export interface ActiveSessionsProps {
  isDark: boolean;
}

const ActiveSessions = ({ isDark }: ActiveSessionsProps) => {
  const handleTerminateOtherSessions = () => {
    console.log("[Doctor Security] Terminating all other active sessions");
    toast.success("All other active device sessions have been logged out");
  };

  return (
    <>
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
          isDark
            ? "bg-[#091420]/70 border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit mb-4">
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Active Devices & Sessions
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Currently authorized sessions with access to your doctor
              dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTerminateOtherSessions}
            className={`${ghostButton} text-xs text-rose-400 hover:text-rose-300 border-rose-500/20 hover:bg-rose-500/10 cursor-pointer`}
          >
            <LogOut size={14} /> Log out all other sessions
          </button>
        </div>

        <div className="space-y-3">
          <div
            className={`flex items-center justify-between p-3.5 rounded-xl border ${
              isDark
                ? "bg-[#060c13] border-white/5"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Laptop size={18} className="text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Windows PC • Chrome 124.0
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Current Session
                  </span>
                </div>
                <span
                  className={`text-[11px] ${
                    isDark ? "text-[#6b7c93]" : "text-gray-500"
                  }`}
                >
                  IP 152.58.20.12 • Mumbai, India • Active Now
                </span>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-between p-3.5 rounded-xl border ${
              isDark
                ? "bg-[#060c13] border-white/5"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-[#8b9ab0]" />
              <div>
                <span
                  className={`text-xs font-semibold block ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Doctor iOS App • iPhone 15 Pro
                </span>
                <span
                  className={`text-[11px] ${
                    isDark ? "text-[#6b7c93]" : "text-gray-500"
                  }`}
                >
                  IP 152.58.22.41 • Mumbai, India • Last active 3 hours ago
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                console.log("[Doctor Security] Revoking iPhone session");
                toast.success("iPhone session revoked");
              }}
              className="text-xs text-rose-400 hover:underline cursor-pointer"
            >
              Revoke
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveSessions;
