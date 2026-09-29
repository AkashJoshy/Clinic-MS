// DoctorFilterLayout.tsx
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DoctorFilters from "./doctor-filters.shared";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FilterState } from "@/hooks/useDoctorSearch";

interface DoctorFilterLayoutProps {
  filters: FilterState;
  hasActiveFilters: boolean;
  onFilterChange: (f: Partial<FilterState>) => void;
  onClearFilters: () => void;
  children: React.ReactNode;
}

const DoctorFilterLayout = ({
  filters,
  hasActiveFilters,
  onFilterChange,
  onClearFilters,
  children,
}: DoctorFilterLayoutProps) => {
  return (
    <div className="flex gap-6 items-start">

      <aside className="hidden lg:block w-[260px] shrink-0">
        <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-6">
          <DoctorFilters
            filters={filters}
            onChange={onFilterChange}
            onClear={onClearFilters}
          />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-2"
              >
                <SlidersHorizontal size={14} />
                Filters
                {hasActiveFilters && (
                  <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-primary text-white rounded-full">
                    •
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100">
                <SheetTitle className="text-base">Filters</SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1 h-[calc(100vh-72px)]">
                <div className="px-5 py-4">
                  <DoctorFilters
                    filters={filters}
                    onChange={onFilterChange}
                    onClear={onClearFilters}
                  />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {children}
      </div>
    </div>
  );
};

export default DoctorFilterLayout;
