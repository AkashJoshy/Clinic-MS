import { Clock } from "lucide-react";

interface DoctorScheduleCardProps {
  isDark: boolean;
  schedule?: any[];
}

export const DoctorScheduleCard = ({
  isDark,
  schedule,
}: DoctorScheduleCardProps) => {
  const theme = {
    container: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    heading: isDark ? "text-white" : "text-gray-900",
    divider: isDark ? "border-white/5" : "border-gray-200",

    dayCard: isDark
      ? "bg-white/[0.02] border-white/5"
      : "bg-gray-50 border-gray-200",

    session: isDark
      ? "bg-[#080d14] border-white/10 text-white"
      : "bg-white border-gray-200 text-gray-700",

    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    empty: isDark
      ? "border-white/10 bg-white/[0.02]"
      : "border-gray-300 bg-gray-50",
  };

  return (
    <div
      className={`m-4 rounded-2xl border p-6 ${theme.container}`}
    >
      <h3
        className={`mb-4 flex items-center gap-2 border-b pb-3 text-base font-semibold ${theme.heading} ${theme.divider}`}
      >
        <Clock size={18} className="text-[#1dc465]" />
        Weekly Consulting Hours
      </h3>

      {schedule && schedule.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {schedule.map((sch, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 rounded-xl border p-4 ${theme.dayCard}`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#1dc465]">
                {sch.dayOfWeek}
              </span>

              <div className="flex flex-wrap gap-2">
                {sch.sessions && sch.sessions.length > 0 ? (
                  sch.sessions.map((sess: any, j: number) => (
                    <span
                      key={j}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${theme.session}`}
                    >
                      {sess.startTime} - {sess.endTime}
                    </span>
                  ))
                ) : (
                  <span className={`text-xs ${theme.muted}`}>
                    No active sessions
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center ${theme.empty} ${theme.muted}`}
        >
          <Clock size={24} className="mb-2 opacity-40" />

          <p className="text-xs font-semibold">
            No schedule consultation slots defined
          </p>
        </div>
      )}
    </div>
  );
};