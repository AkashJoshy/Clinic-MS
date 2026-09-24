import { XCircle } from "lucide-react";

export function RejectedApprovals() {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-[#0d1a27]/50 border border-dashed border-white/8 rounded-3xl">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <XCircle size={32} className="text-[#4a5568]" />
      </div>

      <h2 className="text-white text-lg font-bold">
        No Rejected Approvals Found
      </h2>

      <p className="text-[#8b9ab0] xs:px-9 xxs:px-0 md:text-sm mt-1">
        Rejected approvals will appear here
      </p>
    </div>
  );
}