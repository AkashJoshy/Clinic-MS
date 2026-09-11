import { Skeleton } from "@/components/ui/skeleton";

const PersonalDetailsSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[7px] shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <Skeleton className="h-6 w-36 rounded" />
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div className="md:col-span-2">
          <Skeleton className="h-3.5 w-24 rounded mb-1.5" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3.5 w-28 rounded mb-1.5" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}

        <div className="md:col-span-2">
          <Skeleton className="h-3.5 w-20 rounded mb-1.5" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        <div className="md:col-span-2">
          <Skeleton className="h-3.5 w-36 rounded mb-1.5" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSkeleton;
