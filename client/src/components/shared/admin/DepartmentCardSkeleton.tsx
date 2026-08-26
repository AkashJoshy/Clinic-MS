import { Skeleton } from "@/components/ui/skeleton";

const DepartmentCardSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl bg-white/10 shrink-0" />

        <Skeleton className="h-4 w-32 bg-white/10" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Skeleton className="h-6 w-20 rounded-full bg-white/10" />

        <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
      </div>

      <div className="border-t border-white/8" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24 bg-white/10" />

        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-lg bg-white/10" />

          <Skeleton className="w-8 h-8 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCardSkeleton;
