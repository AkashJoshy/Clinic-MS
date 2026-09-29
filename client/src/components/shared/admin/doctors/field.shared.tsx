export const Field = ({
  label,
  value,
  highlight,
  mono,
  full,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
  full?: boolean;
}) => (
  <div
    className={`rounded-lg border border-white/5 bg-white/2 p-3 ${full ? "col-span-2" : ""}`}
  >
    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
      {label}
    </p>
    <p
      className={`mt-1 break-all text-xs font-semibold ${highlight ? "text-base text-[#1dc465]" : "text-white"} ${
        mono ? "font-mono" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
