import React from "react";
import { Construction, Clock3, Sparkles } from "lucide-react";

interface FeatureUnderConstructionProps {
  children: React.ReactNode;
  isDark?: boolean;
  message?: string;
  description?: string;
  status?: string;
  className?: string;
}

const FeatureUnderConstruction: React.FC<FeatureUnderConstructionProps> = ({
  children,
  isDark = true,
  message = "Coming soon",
  description = "We're working on something great. This feature will be available soon.",
  status = "In progress",
  className = "",
}) => {
  const theme = {
    frame: isDark ? "border-white/10 bg-gray" : "border-zinc-200 bg-white",
    card: "border-white/[0.08] bg-[#142333]/95",
    icon: "border border-amber-400/20 bg-gradient-to-br from-amber-400/15 to-orange-500/5 text-amber-400",
    title: "text-zinc-100",
    description: "text-slate-400",
    status: "border-amber-400/20 bg-amber-400/[0.08] text-amber-300",
    divider: "border-white/[0.07]",
  };

  return (
    <div
      className={`
        relative isolate min-h-125 overflow-hidden rounded-xl border
        border-dashed transition-colors duration-300
        ${theme.frame} ${className}
      `}
    >
      <div inert aria-hidden="true" className="hidden">
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6">
        <div
          role="status"
          className={`
            group relative w-full max-w-[370px] overflow-hidden
            rounded-2xl border
            px-6 py-8 sm:px-9 sm:py-9
            text-center shadow-2xl shadow-black/20
            backdrop-blur-2xl
            transition-all duration-500
            ${theme.card}
          `}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/[0.07] blur-[60px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-orange-500/[0.06] blur-[60px]"
          />

          <div className="relative mb-6 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1">
              <Sparkles size={11} className="text-amber-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300/90">
                Under development
              </span>
            </div>
          </div>

          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute inset-0 scale-150 rounded-full bg-amber-400/10 blur-2xl transition-transform duration-500 group-hover:scale-[1.8]" />

            <div
              className={`
                relative flex h-[76px] w-[76px] items-center justify-center
                rounded-[22px] shadow-lg shadow-amber-950/20
                transition-transform duration-500
                group-hover:-translate-y-1 group-hover:rotate-[-3deg]
                ${theme.icon}
              `}
            >
              <Construction size={34} strokeWidth={1.5} />
            </div>

            <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full border-2 border-[#142333] bg-amber-400" />
            <span className="absolute -bottom-1 -left-2 h-2 w-2 rounded-full bg-orange-400/70" />
          </div>

          <h3
            className={`
              relative text-lg font-bold tracking-tight
              ${theme.title}
            `}
          >
            {message}
          </h3>

          {description && (
            <p
              className={`
                relative mx-auto mt-3 max-w-[285px]
                text-xs leading-[1.9]
                ${theme.description}
              `}
            >
              {description}
            </p>
          )}

          {status && (
            <>
              <div className={`my-7 border-t ${theme.divider}`} />

              <div className="flex flex-col items-center gap-3">
                <div
                  className={`
                    inline-flex items-center gap-2.5
                    rounded-full border px-4 py-2
                    text-[10px] font-semibold tracking-wide
                    ${theme.status}
                  `}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                  </span>
                  {status}
                </div>

                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Stay tuned for updates
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureUnderConstruction;
