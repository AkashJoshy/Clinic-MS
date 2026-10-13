import { Lock } from "lucide-react";

interface LockedOverlayProps {
  disabled: boolean;
  title: string;
  description: string;
  isPreviousWarns?: boolean;
  previousWarnMessage?: string;
}

export function LockedOverlay({
  disabled,
  description,
  title,
  isPreviousWarns,
  previousWarnMessage,
}: LockedOverlayProps) {
  if (!disabled) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-[#0d1a27]/60 px-6 backdrop-blur-[2px]">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1a27]/60 px-6 text-center ">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Lock size={22} className="text-[#8b9ab0]" />
        </div>

        <h3 className="text-sm font-semibold text-white">{title}</h3>

        <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#8b9ab0]">
          {description}
        </p>

        {isPreviousWarns && (
          <button
            type="button"
            className="mt-4 rounded-lg bg-[#1dc465] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#19a955]"
          >
            {previousWarnMessage}
          </button>
        )}
      </div>
    </div>
  );
}
