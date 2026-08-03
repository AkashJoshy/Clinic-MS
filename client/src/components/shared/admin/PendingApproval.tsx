import { CheckCircle } from "lucide-react";

export function PendingApproval(data: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-[#0d1a27]/50 border border-dashed border-white/8 rounded-3xl text-center">
      <div className="w-13 h-13 rounded-2xl bg-[#1dc465]/10 border border-[#1dc465]/20 flex items-center justify-center mb-6 shadow-lg shadow-[#1dc465]/5">
        <CheckCircle size={24} className="text-[#1dc465]" />
      </div>
      <h3 className="text-white text-xl font-bold mb-2">Excellent Work!</h3>
      <p className="text-[#8b9ab0] max-w-xs mx-auto">
        All {data.name} registration requests have been processed.
      </p>
    </div>
  );
}