import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  colorCode: "BLACK" | "WHITE";
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  colorCode,
}: PaginationProps) => {
  if (totalPages < 1) return null;

  const isBlack = colorCode === "BLACK";

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  const borderClass = isBlack
    ? "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
    : "border-white/10 text-[#8b9ab0] hover:bg-white/5 hover:border-white/20";

  const disabledClass = isBlack
    ? "border-gray-100 text-gray-300 cursor-not-allowed"
    : "border-white/5 text-[#4a5568] cursor-not-allowed";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p
        className={cn(
          "text-sm",
          isBlack ? "text-slate-500" : "text-[#8b9ab0]"
        )}
      >
        Showing{" "}
        <span
          className={cn(
            "font-medium",
            isBlack ? "text-black" : "text-white"
          )}
        >
          {startItem}
        </span>{" "}
        –{" "}
        <span
          className={cn(
            "font-medium",
            isBlack ? "text-black" : "text-white"
          )}
        >
          {endItem}
        </span>{" "}
        of{" "}
        <span
          className={cn(
            "font-medium",
            isBlack ? "text-black" : "text-white"
          )}
        >
          {totalItems}
        </span>{" "}
        results
      </p>

      <nav
        aria-label="Pagination"
        className="flex items-center justify-center gap-1"
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={cn(
            "flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium border transition-colors",
            currentPage === 1 ? disabledClass : borderClass
          )}
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className={cn(
                  "px-2 text-xs",
                  isBlack ? "text-gray-400" : "text-[#4a5568]"
                )}
              >
                …
              </span>
            ) : (
              <button
                type="button"
                key={page}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={
                  currentPage === page ? "page" : undefined
                }
                className={cn(
                  "w-8 h-8 rounded-md text-xs font-medium border transition-colors cursor-pointer",
                  currentPage === page
                    ? "bg-[#1dc465] border-[#1dc465] text-[#080d14]"
                    : borderClass
                )}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={cn(
            "flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium border transition-colors",
            currentPage === totalPages ? disabledClass : borderClass
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>

      </nav>
    </div>
  );
};