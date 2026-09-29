// DoctorFilters.tsx
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  SPECIALIZATIONS,
  AVAILABILITY_OPTIONS,
  CONSULTATION_TYPES,
  EXPERIENCE_OPTIONS,
  RATING_OPTIONS,
  type AvailabilityType,
  type ConsultationMode,
} from "../../../../mocks/mockDoctors";
import type { FilterState } from "@/hooks/useDoctorSearch";

interface DoctorFiltersProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onClear: () => void;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </p>
      {children}
    </div>
  );
}

interface FilterOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function FilterOption({ id, label, checked, onChange }: FilterOptionProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onChange(Boolean(v))}
      />
      <Label
        htmlFor={id}
        className="text-sm text-gray-700 cursor-pointer font-normal leading-none"
      >
        {label}
      </Label>
    </div>
  );
}

const DoctorFilters = ({ filters, onChange, onClear }: DoctorFiltersProps) => {
  function toggleSpecialization(spec: string) {
    const next = filters.specializations.includes(spec)
      ? filters.specializations.filter((s) => s !== spec)
      : [...filters.specializations, spec];
    onChange({ specializations: next });
  }

  function toggleAvailability(value: AvailabilityType) {
    const next = filters.availability.includes(value)
      ? filters.availability.filter((a) => a !== value)
      : [...filters.availability, value];
    onChange({ availability: next });
  }

  function toggleConsultationMode(mode: string) {
    const next = filters.consultationModes.includes(mode)
      ? filters.consultationModes.filter((m) => m !== mode)
      : [...filters.consultationModes, mode];
    onChange({ consultationModes: next });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">Filters</p>
        <button
          onClick={onClear}
          className="text-xs text-primary hover:underline font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      <Separator />

      {/* Specialization */}
      <FilterSection title="Departments">
        <div className="space-y-2">
          {SPECIALIZATIONS.map((spec) => (
            <FilterOption
              key={spec}
              id={`spec-${spec}`}
              label={spec}
              checked={filters.specializations.includes(spec)}
              onChange={() => toggleSpecialization(spec)}
            />
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Availability */}
      <FilterSection title="Availability">
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <FilterOption
              key={opt.value}
              id={`avail-${opt.value}`}
              label={opt.label}
              checked={filters.availability.includes(
                opt.value as AvailabilityType,
              )}
              onChange={() => toggleAvailability(opt.value as AvailabilityType)}
            />
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Consultation type */}
      <FilterSection title="Consultation type">
        <div className="space-y-2">
          {CONSULTATION_TYPES.map((opt) => (
            <FilterOption
              key={opt.value}
              id={`consult-${opt.value}`}
              label={opt.label}
              checked={filters.consultationModes.includes(opt.value)}
              onChange={() => toggleConsultationMode(opt.value)}
            />
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Gender */}
      <FilterSection title="Gender">
        <RadioGroup
          value={filters.gender}
          onValueChange={(v) =>
            onChange({ gender: v as FilterState["gender"] })
          }
          className="gap-2"
        >
          {(["any", "male", "female"] as const).map((g) => (
            <div key={g} className="flex items-center gap-2.5">
              <RadioGroupItem value={g} id={`gender-${g}`} />
              <Label
                htmlFor={`gender-${g}`}
                className="text-sm text-gray-700 cursor-pointer font-normal capitalize"
              >
                {g === "any" ? "Any" : g.charAt(0).toUpperCase() + g.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      <Separator />

      {/* Experience */}
      <FilterSection title="Experience">
        <RadioGroup
          value={filters.experience}
          onValueChange={(v) =>
            onChange({ experience: v === filters.experience ? "" : v })
          }
          className="gap-2"
        >
          {EXPERIENCE_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2.5">
              <RadioGroupItem value={opt.value} id={`exp-${opt.value}`} />
              <Label
                htmlFor={`exp-${opt.value}`}
                className="text-sm text-gray-700 cursor-pointer font-normal"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      <Separator />

      {/* Rating */}
      <FilterSection title="Rating">
        <RadioGroup
          value={filters.rating}
          onValueChange={(v) =>
            onChange({ rating: v === filters.rating ? "" : v })
          }
          className="gap-2"
        >
          {RATING_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2.5">
              <RadioGroupItem value={opt.value} id={`rating-${opt.value}`} />
              <Label
                htmlFor={`rating-${opt.value}`}
                className="text-sm text-gray-700 cursor-pointer font-normal"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>
    </div>
  );
};

export default DoctorFilters;
