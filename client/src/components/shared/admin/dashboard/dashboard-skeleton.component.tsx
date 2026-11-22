import React from "react";

interface DashboardSkeletonProps {
  isDark: boolean;
}

export const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({ isDark }) => {
  const cardClass = isDark
    ? "bg-[#0d1a27] border-white/8"
    : "bg-white border-gray-200";

  const shimmer = isDark ? "bg-white/5" : "bg-gray-200";

  return (
    <div className="space-y-6 animate-pulse">
      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`p-5 rounded-2xl border ${cardClass}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${shimmer}`} />
              <div className={`w-16 h-5 rounded-full ${shimmer}`} />
            </div>
            <div className={`w-24 h-4 rounded mb-2 ${shimmer}`} />
            <div className={`w-16 h-8 rounded mb-4 ${shimmer}`} />
            <div className={`w-full h-4 rounded ${shimmer}`} />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-7 p-6 rounded-2xl border ${cardClass}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <div className={`w-40 h-5 rounded ${shimmer}`} />
              <div className={`w-56 h-3 rounded ${shimmer}`} />
            </div>
            <div className={`w-32 h-8 rounded-xl ${shimmer}`} />
          </div>
          <div className={`w-full h-56 rounded-xl ${shimmer}`} />
        </div>

        <div className={`lg:col-span-5 p-6 rounded-2xl border ${cardClass}`}>
          <div className="space-y-2 mb-6">
            <div className={`w-36 h-5 rounded ${shimmer}`} />
            <div className={`w-48 h-3 rounded ${shimmer}`} />
          </div>
          <div className="flex items-center justify-center py-6">
            <div className={`w-40 h-40 rounded-full ${shimmer}`} />
          </div>
          <div className="space-y-2 mt-4">
            <div className={`w-full h-8 rounded-xl ${shimmer}`} />
            <div className={`w-full h-8 rounded-xl ${shimmer}`} />
          </div>
        </div>
      </div>

      {/* Widgets skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl border ${cardClass} space-y-4`}>
          <div className={`w-44 h-5 rounded ${shimmer}`} />
          {[1, 2, 3].map((j) => (
            <div key={j} className={`w-full h-16 rounded-xl ${shimmer}`} />
          ))}
        </div>
        <div className={`p-6 rounded-2xl border ${cardClass} space-y-4`}>
          <div className={`w-44 h-5 rounded ${shimmer}`} />
          {[1, 2, 3].map((j) => (
            <div key={j} className={`w-full h-16 rounded-xl ${shimmer}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
