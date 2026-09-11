
import { Skeleton } from "@/components/ui/skeleton";

const DoctorBioDetailsSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-4 w-44 rounded bg-white/8" />
        <Skeleton className="h-4 w-14 rounded bg-white/8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-3 w-16 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
        </div>
        <div>
          <Skeleton className="h-3 w-32 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-3 w-10 rounded mb-1.5 bg-white/8" />
        <Skeleton className="h-24 w-full rounded-lg bg-white/8" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-3 w-28 rounded mb-1.5 bg-white/8" />
        <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mt-4">
          <Skeleton className="h-3 w-24 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-3 w-24 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-3 w-32 rounded mb-2.5 bg-white/8" />
        <div className="flex flex-wrap gap-2 px-1">
          <Skeleton className="h-6 w-16 rounded-full bg-white/8" />
          <Skeleton className="h-6 w-20 rounded-full bg-white/8" />
          <Skeleton className="h-6 w-14 rounded-full bg-white/8" />
        </div>
      </div>
    </div>
  );
};

export default DoctorBioDetailsSkeleton;