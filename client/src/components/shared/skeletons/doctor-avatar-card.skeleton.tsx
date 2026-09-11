import { Skeleton } from "@/components/ui/skeleton";

const DoctorAvatarCardSkeleton = () => {
  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 flex flex-col items-center text-center">
      <Skeleton className="w-28 h-28 rounded-full mb-4 bg-white/8" />

      <Skeleton className="h-5 w-40 rounded mb-2 bg-white/8" />
      <Skeleton className="h-3.5 w-28 rounded bg-white/8" />

      <div className="flex items-center gap-2 mt-3">
        <Skeleton className="h-6 w-24 rounded-full bg-white/8" />
        <Skeleton className="h-6 w-16 rounded-full bg-white/8" />
      </div>

      <div className="border-t border-white/8 w-full my-5" />

      <div className="grid grid-cols-2 gap-3 w-full text-left">
        <div>
          <Skeleton className="h-3 w-16 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-4 w-20 rounded bg-white/8" />
        </div>
        <div>
          <Skeleton className="h-3 w-20 rounded mb-1.5 bg-white/8" />
          <Skeleton className="h-4 w-24 rounded bg-white/8" />
        </div>
      </div>

      <Skeleton className="h-9 w-full rounded-lg mt-5 bg-white/8" />
    </div>
  );
};

export default DoctorAvatarCardSkeleton;
