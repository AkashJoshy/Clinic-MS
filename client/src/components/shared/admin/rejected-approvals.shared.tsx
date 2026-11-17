import { XCircle } from "lucide-react";

export function RejectedApprovals({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed py-24 ${
        isDark ? "border-white/8 bg-[#0d1a27]/50" : "border-gray-200 bg-gray-50"
      }`}
    >
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
          isDark ? "bg-white/5" : "bg-gray-100"
        }`}
      >
        <XCircle
          size={32}
          className={isDark ? "text-[#4a5568]" : "text-gray-400"}
        />
      </div>

      <h2
        className={`text-lg font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        No Rejected Approvals Found
      </h2>

      <p
        className={`mt-1 text-sm xs:px-9 xxs:px-0 ${
          isDark ? "text-[#8b9ab0]" : "text-gray-500"
        }`}
      >
        Rejected approvals will appear here
      </p>
    </div>
  );
}
