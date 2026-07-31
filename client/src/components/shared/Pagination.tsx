import { ChevronLeft, ChevronRight } from "lucide-react";

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

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  }

  const buttonBaseClass = isBlack
    ? `
     
      text-slate-700
      hover:text-black
      hover:bg-slate-100
    `
    : `
      text-[#8b9ab0]
      hover:text-white
      hover:bg-white/8
    `;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p
        className={`text-sm ${
          isBlack ? "text-slate-500" : "text-[#8b9ab0]"
        }`}
      >
        Showing{" "}
        <span
          className={`font-medium ${
            isBlack ? "text-black" : "text-white"
          }`}
        >
          {startItem}
        </span>
        {" – "}
        <span
          className={`font-medium ${
            isBlack ? "text-black" : "text-white"
          }`}
        >
          {endItem}
        </span>
        {" of "}
        <span
          className={`font-medium ${
            isBlack ? "text-black" : "text-white"
          }`}
        >
          {totalItems}
        </span>{" "}
        results
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none ${buttonBaseClass}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className={`w-9 h-9 flex items-center justify-center text-sm ${
                isBlack ? "text-slate-400" : "text-[#4a5568]"
              }`}
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 ${
                currentPage === page
                  ? "bg-[#1dc465] text-[#080d14] shadow-sm shadow-[#1dc465]/25"
                  : buttonBaseClass
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none ${buttonBaseClass}`}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};