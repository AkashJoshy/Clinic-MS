import { Skeleton } from "@/components/ui/skeleton";
import type { SkeletonCardProps } from "@/types/common";

const DepartmentCardSkeleton = ({
  isDark,
}: SkeletonCardProps) => {
  const skeletonColor = isDark ? "bg-white/10" : "bg-gray-200";

  const cardTheme = isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200";

  const dividerTheme = isDark ? "border-white/8" : "border-gray-200";

  return (
    <div
      className={`${cardTheme} border rounded-2xl p-4 flex flex-col gap-3`}
    >
      <div className="flex items-center gap-3">
        <Skeleton
          className={`w-10 h-10 rounded-xl shrink-0 ${skeletonColor}`}
        />

        <Skeleton className={`h-4 w-32 ${skeletonColor}`} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Skeleton
          className={`h-6 w-20 rounded-full ${skeletonColor}`}
        />

        <Skeleton
          className={`h-6 w-24 rounded-full ${skeletonColor}`}
        />
      </div>

      <div className={`border-t ${dividerTheme}`} />

      <div className="flex items-center justify-between">
        <Skeleton className={`h-3 w-24 ${skeletonColor}`} />

        <div className="flex items-center gap-2">
          <Skeleton
            className={`w-8 h-8 rounded-lg ${skeletonColor}`}
          />

          <Skeleton
            className={`w-8 h-8 rounded-lg ${skeletonColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCardSkeleton;