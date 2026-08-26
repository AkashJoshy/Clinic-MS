import { Skeleton } from "@/components/ui/skeleton";

export const AllDoctorCardSkeleton = () => {
  return (
    <div className="group bg-[#0d1a27] border border-white/8 rounded-2xl overflow-hidden">

      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0 bg-white/10" />

            <div className="min-w-0 space-y-2">
              <Skeleton className="h-4 w-32 bg-white/10" />

              <Skeleton className="h-3 w-24 bg-white/10" />
            </div>
          </div>

          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
        </div>

        <div className="mt-4">
          <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="px-5">
        <div className="border-t border-white/5" />

        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 w-7 h-7 rounded-lg shrink-0 bg-white/10" />

            <div className="min-w-0 space-y-1.5">
              <Skeleton className="h-2.5 w-14 bg-white/10" />
              <Skeleton className="h-3 w-44 bg-white/10" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 w-7 h-7 rounded-lg shrink-0 bg-white/10" />

            <div className="min-w-0 space-y-1.5">
              <Skeleton className="h-2.5 w-20 bg-white/10" />
              <Skeleton className="h-3 w-24 bg-white/10" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 w-7 h-7 rounded-lg shrink-0 bg-white/10" />

            <div className="min-w-0 space-y-1.5">
              <Skeleton className="h-2.5 w-10 bg-white/10" />
              <Skeleton className="h-3 w-32 bg-white/10" />
            </div>
          </div>
        </div>
      </div>


      <div className="px-5 py-3.5 border-t border-white/5 bg-black/10">
        <div className="flex items-center justify-between gap-3">

          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-24 bg-white/10" />
            <Skeleton className="h-4 w-16 bg-white/10" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-16 rounded-lg bg-white/10" />
            <Skeleton className="h-9 w-24 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};