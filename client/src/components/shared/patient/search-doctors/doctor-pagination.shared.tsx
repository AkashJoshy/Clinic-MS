import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoctorPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DoctorPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: DoctorPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <nav
      aria-label="Doctor results pagination"
      className="flex items-center justify-center gap-1 mt-8"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          "flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium border transition-colors",
          currentPage === 1
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
        )}
      >
        <ChevronLeft size={14} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-xs text-gray-400">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={cn(
                "w-8 h-8 rounded-md text-xs font-medium border transition-colors cursor-pointer",
                currentPage === page
                  ? "bg-primary border-primary text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={cn(
          "flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium border transition-colors",
          currentPage === totalPages
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </nav>
  );
};

export default DoctorPagination;
