import { useAuthStore } from "@/store";
import { Activity, Calendar, Clock, ShieldCheck } from "lucide-react";

const PatientInfo = () => {
  const activePatient = useAuthStore((state) => state.activePatient);
  const { patient: user } = useAuthStore((state) => state.users);

  const diffInMs = activePatient?.patient?.updatedAt
    ? new Date().getTime() -
      new Date(activePatient.patient?.updatedAt).getTime()
    : null;

  const diffInDays =
    diffInMs !== null ? Math.floor(diffInMs / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="bg-white rounded-[7px] shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ShieldCheck className="w-5 h-5 text-blue-500 mr-2" />
        Account Info
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-50">
          <span className="text-gray-500 text-sm flex items-center">
            <Calendar className="w-4 h-4 mr-2" /> Member Since
          </span>
          <span className="text-gray-900 font-medium text-sm">
            {activePatient?.patient?.createdAt &&
              new Date(activePatient.patient?.createdAt).toLocaleDateString(
                "en-us",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-50">
          <span className="text-gray-500 text-sm flex items-center">
            <Activity className="w-4 h-4 mr-2" /> Status
          </span>
          <span
            className={`px-2.5 py-1 ${
              user?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } rounded-full text-xs font-medium`}
          >
            {user?.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Last Updated
          </span>
          <span className="text-gray-900 font-medium text-sm">
            {diffInDays !== null && diffInDays >= 0
              ? `${diffInDays} days ago`
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
