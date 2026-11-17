
interface SegmentedControlProps {
  options: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  isDark,
}) => (
  <div className="flex gap-2">
    {options.map((opt) => {
      const active = value === opt.value;

      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-[10px] border py-2 text-[13px] transition-all ${
            active
              ? "border-primary/40 bg-primary/10 font-semibold text-primary"
              : isDark
                ? "border-white/8 bg-[#080d14] text-[#8b9ab0] hover:border-white/20 hover:text-white"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:text-gray-900"
          }`}
        >
          {opt.icon}
          {opt.label}
        </button>
      );
    })}
  </div>
);
