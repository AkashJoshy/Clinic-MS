// DoctorEmptyState.tsx
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorEmptyStateProps {
  onClearFilters: () => void;
}

const DoctorEmptyState = ({ onClearFilters }: DoctorEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
        <SearchX size={22} className="text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        No doctors found
      </h3>
      <p className="text-sm text-gray-500 mb-5 max-w-xs">
        Try changing your search terms or adjusting your filters.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilters}
        className="border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      >
        Clear filters
      </Button>
    </div>
  );
};

export default DoctorEmptyState;
