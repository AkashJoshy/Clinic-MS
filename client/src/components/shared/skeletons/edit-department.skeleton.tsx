import { Skeleton } from "@/components/ui/skeleton";
import type { SkeletonCardProps } from "@/types/common";

const EditDepartmentSkeleton = ({ isDark }: SkeletonCardProps) => {
  const theme = {
    container: isDark
      ? "border-white/10 bg-white/2"
      : "border-gray-200 bg-white",

    card: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200 shadow-sm",

    skeleton: isDark ? "bg-white/10" : "bg-gray-200",
  };

  return (
    <div
      className={`min-h-full space-y-6 border p-4 shadow-2xs lg:p-18 ${theme.container}`}
    >
      <div className="flex items-center gap-4 xsxs:mt-0 xsxs:ml-0 lg:-mt-10 lg:-ml-10">
        <Skeleton className={`h-10 w-10 rounded-xl ${theme.skeleton}`} />

        <div className="flex items-center gap-3">
          <Skeleton className={`h-10 w-10 rounded-xl ${theme.skeleton}`} />

          <div className="space-y-2">
            <Skeleton className={`h-5 w-36 ${theme.skeleton}`} />
            <Skeleton className={`h-4 w-72 ${theme.skeleton}`} />
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 xsxs:mt-0">
        <div
          className={`w-full max-w-3xl rounded-2xl border p-6 md:p-8 ${theme.card}`}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className={`h-4 w-32 ${theme.skeleton}`} />
              <Skeleton
                className={`h-12 w-full rounded-xl ${theme.skeleton}`}
              />
            </div>

            <div className="space-y-2">
              <Skeleton className={`h-4 w-20 ${theme.skeleton}`} />
              <Skeleton
                className={`h-12 w-full rounded-xl ${theme.skeleton}`}
              />
            </div>

            <div className="space-y-2">
              <Skeleton className={`h-4 w-24 ${theme.skeleton}`} />
              <Skeleton
                className={`h-12 w-full rounded-xl ${theme.skeleton}`}
              />
            </div>

            <div className="space-y-2">
              <Skeleton className={`h-4 w-28 ${theme.skeleton}`} />
              <Skeleton
                className={`h-12 w-full rounded-xl ${theme.skeleton}`}
              />
            </div>

            <div className="items-center gap-3 pt-4 xsxs:block xxs:flex">
              <Skeleton
                className={`h-12 w-full flex-1 rounded-xl ${theme.skeleton}`}
              />
              <Skeleton
                className={`mt-2 h-12 w-full flex-1 rounded-xl xxs:mt-0 ${theme.skeleton}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartmentSkeleton;
