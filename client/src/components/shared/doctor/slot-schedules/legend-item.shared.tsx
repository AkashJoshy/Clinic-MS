interface LegendItemProps {
  className: string;
  label: string;
}


export const LegendItem = ({ className, label }: LegendItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${className}`} />

      <span className="text-xs text-[#8b9ab0]">{label}</span>
    </div>
  );
};