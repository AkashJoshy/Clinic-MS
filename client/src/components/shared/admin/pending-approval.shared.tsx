import { CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store";

interface PendingApprovalProps {
  name: string;
  isDark: boolean
}

export function PendingApproval({ name, isDark }: PendingApprovalProps) {

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed py-24 text-center ${
        isDark
          ? "border-white/8 bg-[#0d1a27]/50"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl border border-[#1dc465]/20 bg-[#1dc465]/10 shadow-lg shadow-[#1dc465]/5">
        <CheckCircle size={24} className="text-[#1dc465]" />
      </div>

      <h3
        className={`mb-2 text-xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Excellent Work!
      </h3>

      <p
        className={`mx-auto max-w-xs ${
          isDark ? "text-[#8b9ab0]" : "text-gray-500"
        }`}
      >
        All {name} registration requests have been processed.
      </p>
    </div>
  );
}