// DoctorCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const DoctorCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
      {/* Avatar */}
      <Skeleton className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-xl shrink-0" />

      {/* Info */}
      <div className="flex-1 space-y-2.5">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
        <Skeleton className="h-3 w-32 rounded" />
        <Skeleton className="h-3 w-48 rounded" />
        <Skeleton className="h-3 w-36 rounded" />
        <Skeleton className="h-3 w-28 rounded" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
      </div>

      {/* CTA */}
      <div className="flex sm:flex-col sm:items-end sm:justify-end shrink-0">
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
    </div>
  );
};

const DoctorSkeletonList = () => (
  <div className="space-y-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <DoctorCardSkeleton key={i} />
    ))}
  </div>
);

export { DoctorCardSkeleton, DoctorSkeletonList };
