interface NumberBadgeProps {
  number: number;
  className?: string;
}

export const NumberBadge = ({
  number,
  className = "",
}: NumberBadgeProps) => {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1dc465] text-sm font-semibold text-black ${className}`}
    >
      {number}
    </span>
  );
};