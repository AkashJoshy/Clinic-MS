
interface RadioCardProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  isDark: boolean;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  label,
  description,
  checked,
  onChange,
  isDark,
}) => {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
        checked
          ? "border-primary bg-primary/10"
          : isDark
            ? "border-[#263648] bg-[#080d14] hover:border-[#607086]"
            : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      {/* Custom radio indicator */}
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
          checked
            ? "border-primary bg-primary"
            : isDark
              ? "border-[#607086] bg-[#080d14]"
              : "border-gray-400 bg-white"
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            isDark ? "text-[#c1ccd9]" : "text-gray-800"
          }`}
        >
          {label}
        </p>

        {description && (
          <p
            className={`mt-0.5 text-xs ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </label>
  );
};
