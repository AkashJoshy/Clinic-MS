import { Skeleton } from "@/components/ui/skeleton";

export const PatientListItemSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-xl p-4">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <Skeleton className="w-14 h-14 rounded-xl shrink-0 bg-white/10" />

          <div className="min-w-0 flex-1">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-white/10" />

              <Skeleton className="h-6 w-28 rounded-md bg-white/10" />
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="flex items-center gap-1.5">
                <Skeleton className="w-[13px] h-[13px] rounded-full bg-white/10" />
                <Skeleton className="h-3 w-40 bg-white/10" />
              </div>

              <div className="flex items-center gap-1.5">
                <Skeleton className="w-[13px] h-[13px] rounded-full bg-white/10" />
                <Skeleton className="h-3 w-28 bg-white/10" />
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="w-[13px] h-[13px] rounded-full bg-white/10" />
                  <Skeleton className="h-3 w-8 bg-white/10" />
                </div>

                <Skeleton className="h-3 w-12 bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row xl:flex-col gap-2 shrink-0">
          <Skeleton className="xsxs:w-full md:w-35 h-9 rounded-lg bg-white/10" />

          <Skeleton className="xsxs:w-full md:w-35 h-9 rounded-lg bg-white/10" />

          <Skeleton className="xsxs:w-full md:w-35 h-9 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
};
