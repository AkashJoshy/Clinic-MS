interface FieldProps {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
  full?: boolean;
  isDark?: boolean;
}

export const Field = ({
  label,
  value,
  highlight,
  mono,
  full,
  isDark = true,
}: FieldProps) => {
  const theme = {
    wrapper: isDark
      ? "border-white/5 bg-white/[0.02]"
      : "border-gray-200 bg-gray-50",
    label: isDark ? "text-[#64748b]" : "text-gray-500",
    value: isDark ? "text-white" : "text-gray-900",
  };

  return (
    <div
      className={`rounded-lg border p-3 ${theme.wrapper} ${
        full ? "col-span-2" : ""
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider ${theme.label}`}
      >
        {label}
      </p>

      <p
        className={`mt-1 break-all text-xs font-semibold ${
          highlight ? "text-base text-[#1dc465]" : theme.value
        } ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
};
