import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isDark,
}: PaginationProps) => {
  if (totalPages < 1) return null;

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

  const theme = {
    description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    // Result numbers adapt to the selected theme
    resultCount: isDark ? "text-white" : "text-black",

    button: isDark
      ? "border-white/10 text-[#8b9ab0] hover:bg-white/5 hover:border-white/20 hover:text-white"
      : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900",

    disabled: isDark
      ? "border-white/5 text-[#4a5568] cursor-not-allowed"
      : "border-gray-100 text-gray-300 cursor-not-allowed",

    ellipsis: isDark ? "text-[#4a5568]" : "text-gray-400",

    // Active page number always stays white
    active: "bg-[#1dc465] border-[#1dc465] !text-white",
  };

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      {/* Results information */}
      <p className={cn("text-sm", theme.description)}>
        Showing{" "}
        <span className={cn("font-semibold", theme.resultCount)}>
          {startItem}
        </span>{" "}
        –{" "}
        <span className={cn("font-semibold", theme.resultCount)}>
          {endItem}
        </span>{" "}
        of{" "}
        <span className={cn("font-semibold", theme.resultCount)}>
          {totalItems}
        </span>{" "}
        results
      </p>

      {/* Pagination controls */}
      <nav
        aria-label="Pagination"
        className="flex items-center justify-center gap-1"
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPreviousDisabled}
          aria-label="Previous page"
          className={cn(
            "flex items-center gap-1 px-3 h-8 rounded-lg text-xs font-medium border transition-all duration-200",
            isPreviousDisabled ? theme.disabled : theme.button,
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
                className={cn("px-2 text-xs select-none", theme.ellipsis)}
              >
                …
              </span>
            ) : (
              <button
                type="button"
                key={page}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-semibold border transition-all duration-200",
                  currentPage === page ? theme.active : theme.button,
                )}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
          aria-label="Next page"
          className={cn(
            "flex items-center gap-1 px-3 h-8 rounded-lg text-xs font-medium border transition-all duration-200",
            isNextDisabled ? theme.disabled : theme.button,
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </nav>
    </div>
  );
};