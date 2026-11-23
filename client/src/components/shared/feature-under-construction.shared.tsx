import React from "react";
import { Construction, Clock3, Sparkles } from "lucide-react";

interface FeatureUnderConstructionProps {
  children: React.ReactNode;
  isDark: boolean;
  message?: string;
  description?: string;
  status?: string;
  className?: string;
}

const FeatureUnderConstruction: React.FC<FeatureUnderConstructionProps> = ({
  children,
  isDark,
  message = "Coming soon",
  description = "We're working on something great. This feature will be available soon.",
  status = "In progress",
  className = "",
}) => {
  const theme = {
    frame: isDark
      ? "border-white/10 bg-[#0d1a27]"
      : "border-slate-200 bg-white",

    card: isDark
      ? "border-white/[0.08] bg-[#142333]/95 shadow-black/20"
      : "border-slate-200 bg-white shadow-slate-300/40",

    icon: "border border-amber-400/20 bg-gradient-to-br from-amber-400/15 to-orange-500/5 text-amber-400",

    title: isDark ? "text-zinc-100" : "text-slate-900",

    description: isDark ? "text-slate-400" : "text-slate-600",

    status: isDark
      ? "border-amber-400/20 bg-amber-400/[0.08] text-amber-300"
      : "border-amber-500/25 bg-amber-50 text-amber-700",

    divider: isDark ? "border-white/[0.07]" : "border-slate-200",

    decorativeDot: isDark ? "border-[#142333]" : "border-white",

    footer: "text-slate-500",
  };

  return (
    <div
      className={`
        relative isolate min-h-80 overflow-hidden rounded-xl border
        border-dashed transition-colors duration-300
        ${theme.frame} ${className}
      `}
    >
      <div inert aria-hidden="true" className="hidden">
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-4">
        <div
          role="status"
          className={`
            group relative w-full max-w-[350px] overflow-hidden
            rounded-2xl border
            px-5 py-5 sm:px-7 sm:py-6
            text-center shadow-2xl
            backdrop-blur-2xl
            transition-all duration-500
            ${theme.card}
          `}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-400/[0.07] blur-[55px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-orange-500/[0.06] blur-[55px]"
          />

          <div className="relative mb-4 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1">
              <Sparkles size={10} className="text-amber-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-500">
                Under development
              </span>
            </div>
          </div>

          <div className="relative mx-auto mb-4 w-fit">
            <div className="absolute inset-0 scale-150 rounded-full bg-amber-400/10 blur-2xl transition-transform duration-500 group-hover:scale-[1.8]" />

            <div
              className={`
                relative flex h-[62px] w-[62px] items-center justify-center
                rounded-[19px] shadow-lg shadow-amber-950/20
                transition-transform duration-500
                group-hover:-translate-y-1 group-hover:rotate-[-3deg]
                ${theme.icon}
              `}
            >
              <Construction size={28} strokeWidth={1.5} />
            </div>

            <span
              className={`absolute -right-2 -top-2 h-3 w-3 rounded-full border-2 ${theme.decorativeDot} bg-amber-400`}
            />
            <span className="absolute -bottom-1 -left-2 h-2 w-2 rounded-full bg-orange-400/70" />
          </div>

          <h3
            className={`
              relative text-base font-bold tracking-tight
              ${theme.title}
            `}
          >
            {message}
          </h3>

          {description && (
            <p
              className={`
                relative mx-auto mt-2 max-w-[285px]
                text-xs leading-relaxed
                ${theme.description}
              `}
            >
              {description}
            </p>
          )}

          {status && (
            <>
              <div className={`my-4 border-t ${theme.divider}`} />

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    inline-flex items-center gap-2
                    rounded-full border px-3.5 py-1.5
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

                <span
                  className={`text-[9px] font-medium uppercase tracking-[0.16em] ${theme.footer}`}
                >
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
