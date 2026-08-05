import React from "react";
import { Clock } from "lucide-react";

interface DoctorScheduleCardProps {
  schedule?: any[];
}

export const DoctorScheduleCard = ({ schedule }: DoctorScheduleCardProps) => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
        <Clock size={18} className="text-[#1dc465]" />
        Weekly Consulting Hours
      </h3>

      {schedule && schedule.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schedule.map((sch, i) => (
            <div key={i} className="bg-white/2 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#1dc465] tracking-wider uppercase">
                {sch.dayOfWeek}
              </span>
              <div className="flex flex-wrap gap-2">
                {sch.sessions && sch.sessions.length > 0 ? (
                  sch.sessions.map((sess, j) => (
                    <span
                      key={j}
                      className="text-xs bg-[#080d14] border border-white/10 px-3 py-1.5 rounded-lg text-white font-medium"
                    >
                      {sess.startTime} - {sess.endTime}
                    </span>
                  ))
                ) : (
                  <span className="text-[#8b9ab0] text-xs">No active sessions</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 border border-dashed border-white/10 rounded-xl bg-white/2 text-[#8b9ab0] text-center">
          <Clock size={24} className="opacity-40 mb-2" />
          <p className="text-xs font-semibold">No schedule consultation slots defined</p>
        </div>
      )}
    </div>
  );
};
