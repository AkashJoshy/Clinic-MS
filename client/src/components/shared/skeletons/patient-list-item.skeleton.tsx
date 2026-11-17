import { Skeleton } from "@/components/ui/skeleton";
import type { SkeletonCardProps } from "@/types/common";

export const PatientListItemSkeleton = ({ isDark }: SkeletonCardProps) => {
  const skeletonColor = isDark ? "bg-white/10" : "bg-gray-200";
  const cardTheme = isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200";

  return (
    <div className={`${cardTheme} border rounded-xl p-4`}>
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <Skeleton
            className={`w-14 h-14 rounded-xl shrink-0 ${skeletonColor}`}
          />

          <div className="min-w-0 flex-1">
            <div className="space-y-2">
              <Skeleton className={`h-4 w-32 ${skeletonColor}`} />

              <Skeleton className={`h-6 w-28 rounded-md ${skeletonColor}`} />
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="flex items-center gap-1.5">
                <Skeleton
                  className={`w-[13px] h-[13px] rounded-full ${skeletonColor}`}
                />
                <Skeleton className={`h-3 w-40 ${skeletonColor}`} />
              </div>

              <div className="flex items-center gap-1.5">
                <Skeleton
                  className={`w-[13px] h-[13px] rounded-full ${skeletonColor}`}
                />
                <Skeleton className={`h-3 w-28 ${skeletonColor}`} />
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1.5">
                  <Skeleton
                    className={`w-[13px] h-[13px] rounded-full ${skeletonColor}`}
                  />
                  <Skeleton className={`h-3 w-8 ${skeletonColor}`} />
                </div>

                <Skeleton className={`h-3 w-12 ${skeletonColor}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row xl:flex-col gap-2 shrink-0">
          <Skeleton
            className={`xsxs:w-full md:w-35 h-9 rounded-lg ${skeletonColor}`}
          />

          <Skeleton
            className={`xsxs:w-full md:w-35 h-9 rounded-lg ${skeletonColor}`}
          />

          <Skeleton
            className={`xsxs:w-full md:w-35 h-9 rounded-lg ${skeletonColor}`}
          />
        </div>
      </div>
    </div>
  );
};
