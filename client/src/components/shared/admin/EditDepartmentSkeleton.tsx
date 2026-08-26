import { Skeleton } from "@/components/ui/skeleton";

const EditDepartmentSkeleton = () => {
  return (
    <div className="min-h-full p-4 lg:p-18 space-y-6 border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex items-center gap-4 xsxs:mt-0 xsxs:ml-0 lg:-mt-10 lg:-ml-10">
        <Skeleton className="w-10 h-10 rounded-xl bg-white/10" />

        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl bg-white/10" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-36 bg-white/10" />

            <Skeleton className="h-4 w-72 bg-white/10" />
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 xsxs:mt-0">
        <div className="w-full max-w-3xl bg-[#0d1a27] border border-white/8 rounded-2xl p-6 md:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
            </div>

            <div className="xsxs:block xxs:flex items-center gap-3 pt-4">
              <Skeleton className="h-12 flex-1 w-full rounded-xl bg-white/10" />
              <Skeleton className="h-12 flex-1 w-full xsxs:mt-2 xxs:mt-0 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartmentSkeleton;