import { Skeleton } from "@/components/ui/skeleton";
import type { SkeletonCardProps } from "@/types/common";

export const AllDoctorCardSkeleton = ({
  isDark,
}: SkeletonCardProps) => {
  const skeletonColor = isDark ? "bg-white/10" : "bg-gray-200";
  const cardTheme = isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200";
  const dividerTheme = isDark ? "border-white/5" : "border-gray-100";
  const footerTheme = isDark ? "bg-black/10" : "bg-gray-50";

  return (
    <div
      className={`group ${cardTheme} border rounded-2xl overflow-hidden`}
    >
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Skeleton
              className={`w-12 h-12 rounded-xl shrink-0 ${skeletonColor}`}
            />

            <div className="min-w-0 space-y-2">
              <Skeleton className={`h-4 w-32 ${skeletonColor}`} />
              <Skeleton className={`h-3 w-24 ${skeletonColor}`} />
            </div>
          </div>

          <Skeleton
            className={`h-6 w-16 rounded-full ${skeletonColor}`}
          />
        </div>

        <div className="mt-4">
          <Skeleton
            className={`h-6 w-20 rounded-full ${skeletonColor}`}
          />
        </div>
      </div>

      <div className="px-5">
        <div className={`border-t ${dividerTheme}`} />

        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton
              className={`mt-0.5 w-7 h-7 rounded-lg shrink-0 ${skeletonColor}`}
            />

            <div className="min-w-0 space-y-1.5">
              <Skeleton className={`h-2.5 w-14 ${skeletonColor}`} />
              <Skeleton className={`h-3 w-44 ${skeletonColor}`} />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton
              className={`mt-0.5 w-7 h-7 rounded-lg shrink-0 ${skeletonColor}`}
            />

            <div className="min-w-0 space-y-1.5">
              <Skeleton className={`h-2.5 w-20 ${skeletonColor}`} />
              <Skeleton className={`h-3 w-24 ${skeletonColor}`} />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton
              className={`mt-0.5 w-7 h-7 rounded-lg shrink-0 ${skeletonColor}`}
            />

            <div className="min-w-0 space-y-1.5">
              <Skeleton className={`h-2.5 w-10 ${skeletonColor}`} />
              <Skeleton className={`h-3 w-32 ${skeletonColor}`} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`px-5 py-3.5 border-t ${dividerTheme} ${footerTheme}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1.5">
            <Skeleton className={`h-2.5 w-24 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-16 ${skeletonColor}`} />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton
              className={`h-9 w-16 rounded-lg ${skeletonColor}`}
            />
            <Skeleton
              className={`h-9 w-24 rounded-lg ${skeletonColor}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};