import type { AllApprovalsProps } from "@/types/admin";
import { Building } from "lucide-react";

export function AllApprovals({ icon: Icon = Building, name }: AllApprovalsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-[#0d1a27]/50 border border-dashed border-white/8 rounded-3xl">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Icon size={32} className="text-[#4a5568]" />
      </div>
          <h2 className="text-white text-lg font-bold">No {name} Found</h2>
      <p className="text-[#8b9ab0] xsxs:px-9 xxs:px-0 md:text-sm mt-1">
        Try adjusting your search or filters
      </p>
    </div>
  );
}