import { Skeleton } from "@/components/ui/skeleton";

const DoctorClinicDetailsSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Skeleton className="w-4 h-4 rounded bg-white/8" />
          <Skeleton className="h-4 w-28 rounded bg-white/8" />
        </div>

        <div className="flex items-start gap-4">
          <Skeleton className="w-12 h-12 rounded-xl shrink-0 bg-white/8" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40 rounded bg-white/8" />
            <Skeleton className="h-3.5 w-full max-w-sm rounded bg-white/8" />
            <Skeleton className="h-3.5 w-2/3 max-w-xs rounded bg-white/8" />
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4 pt-4 border-t border-white/8">
          <Skeleton className="w-4 h-4 rounded shrink-0 bg-white/8" />
          <Skeleton className="h-3.5 w-3/4 rounded bg-white/8" />
        </div>
      </div>

      <div className="my-6 border-t border-white/8" />

      <div>
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="h-4 w-44 rounded bg-white/8" />
          <Skeleton className="h-4 w-14 rounded bg-white/8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-28 rounded mb-1.5 bg-white/8" />
              <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/8">
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-36 rounded bg-white/8" />
            <Skeleton className="h-3 w-52 rounded bg-white/8" />
          </div>
          <Skeleton className="w-11 h-6 rounded-full shrink-0 bg-white/8" />
        </div>
      </div>
    </div>
  );
};

export default DoctorClinicDetailsSkeleton;