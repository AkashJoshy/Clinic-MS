import type { UnderConstructionProps } from "@/types/common";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UnderConstruction = ({
  title = "This page",
  backLabel,
  backTo,
}: UnderConstructionProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-150 text-center px-6 border border-white/10 bg-white/2 shadow-2xs">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-yellow-200 animate-ping opacity-40" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-yellow-50 border border-yellow-200">
          <Construction size={32} className="text-yellow-500" strokeWidth={1.75} />
        </div>
      </div>

      <span className="text-xs font-medium tracking-wide uppercase text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full mb-4">
        Coming Soon
      </span>

      <h2 className="text-2xl font-semibold text-primary mb-2">
        {title} section is under construction
      </h2>

      <p className="text-gray-500 max-w-md mb-8">
        We're building this feature to make your workflow even smoother. Check back soon.
      </p>

      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-400 border border-gray-200 hover:border-primary-300 rounded-lg px-4 py-2 transition-colors"
      >
        <ArrowLeft size={16} />
        {backLabel}
      </Link>
    </div>
  );
};

export default UnderConstruction;