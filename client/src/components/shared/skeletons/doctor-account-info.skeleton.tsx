import { Skeleton } from "@/components/ui/skeleton";

const DoctorAccountInfoSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-5 h-5 rounded bg-white/8" />
        <Skeleton className="h-4 w-28 rounded bg-white/8" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded bg-white/8" />
            <Skeleton className="h-3.5 w-20 rounded bg-white/8" />
          </div>
          <Skeleton className="h-3.5 w-24 rounded bg-white/8" />
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded bg-white/8" />
            <Skeleton className="h-3.5 w-24 rounded bg-white/8" />
          </div>
          <Skeleton className="h-3.5 w-28 rounded bg-white/8" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded bg-white/8" />
            <Skeleton className="h-3.5 w-24 rounded bg-white/8" />
          </div>
          <Skeleton className="h-3.5 w-20 rounded bg-white/8" />
        </div>
      </div>
    </div>
  );
};

export default DoctorAccountInfoSkeleton;
