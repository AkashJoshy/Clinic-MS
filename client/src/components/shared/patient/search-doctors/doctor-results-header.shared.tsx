// DoctorResultsHeader.tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "../../../../mocks/mockDoctors";
import type { SortState } from "@/hooks/useDoctorSearch";

interface DoctorResultsHeaderProps {
  count: number;
  sort: SortState;
  onSortChange: (value: SortState["value"]) => void;
}

const DoctorResultsHeader = ({
  count,
  sort,
  onSortChange,
}: DoctorResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
      {/* Results count */}
      <p className="text-sm font-medium text-gray-700">
        <span className="font-semibold text-gray-900">{count}</span>{" "}
        {count === 1 ? "doctor" : "doctors"} found
      </p>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 hidden sm:inline">Sort by</span>
        <Select
          value={sort.value}
          onValueChange={(v) => onSortChange(v as SortState["value"])}
        >
          <SelectTrigger size="sm" className="w-40 text-xs bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DoctorResultsHeader;
