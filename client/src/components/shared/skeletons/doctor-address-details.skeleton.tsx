import { Skeleton } from "@/components/ui/skeleton";

const DoctorAddressDetailsSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded bg-white/8" />
          <Skeleton className="h-4 w-20 rounded bg-white/8" />
        </div>
        <Skeleton className="h-4 w-14 rounded bg-white/8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Skeleton className="h-3 w-24 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
        </div>

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-16 rounded mb-1.5 bg-white/8" />
            <Skeleton className="h-9 w-full rounded-lg bg-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAddressDetailsSkeleton;
