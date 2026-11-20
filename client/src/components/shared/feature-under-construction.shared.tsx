import React from "react";
import { Construction, Clock3 } from "lucide-react";

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
  const theme = isDark
    ? {
        frame: "border-white/10 bg-gray",
        content: "opacity-0",
        overlay: "bg-[#0d1a27]/35",
        card: "border-white/[0.09] bg-[#142333]/95",
        icon: "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20",
        title: "text-zinc-100",
        description: "text-zinc-400",
        status: "border-amber-400/20 bg-amber-400/10 text-amber-300",
        divider: "border-white/[0.07]",
      }
    : {
        frame: "border-zinc-200 bg-white",
        content: "opacity-20",
        overlay: "bg-white/35",
        card: "border-zinc-200 bg-white/95",
        icon: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
        title: "text-zinc-900",
        description: "text-zinc-500",
        status: "border-amber-200 bg-amber-50 text-amber-700",
        divider: "border-zinc-100",
      };

  return (
    <div
      className={`
        relative isolate overflow-hidden rounded-xl border
        border-dashed transition-colors duration-300
        ${theme.frame} ${className}
      `}
    >
      <div
        inert
        aria-hidden="true"
        className={`
        pointer-events-none select-none
        h-[280px] overflow-hidden
        transition-opacity duration-300
          ${theme.content}
        `}
      >
        {children}
      </div>

      {/* Subtle overlay */}
      <div aria-hidden="true" className={`absolute inset-0 ${theme.overlay}`} />

      {/* Center notice */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        <div
          role="status"
          className={`
            w-full max-w-[340px] rounded-xl border
            px-5 py-5 text-center
            backdrop-blur-lg shadow-2xs
            transition-colors duration-300
            ${theme.card}
          `}
        >
          {/* Icon */}
          <div
            className={`
              mx-auto mb-4 flex h-12 w-12
              items-center justify-center rounded-xl
              ${theme.icon}
            `}
          >
            <Construction size={23} strokeWidth={1.8} />
          </div>

          {/* Heading */}
          <h3 className={`text-sm font-semibold tracking-tight ${theme.title}`}>
            {message}
          </h3>

          {/* Description */}
          {description && (
            <p
              className={`
                mx-auto mt-2 max-w-[270px]
                text-xs leading-relaxed
                ${theme.description}
              `}
            >
              {description}
            </p>
          )}

          {/* Status */}
          {status && (
            <>
              <div className={`my-4 border-t ${theme.divider}`} />

              <div
                className={`
                  inline-flex items-center gap-2
                  rounded-full border px-3 py-1.5
                  text-[11px] font-medium
                  ${theme.status}
                `}
              >
                <Clock3 size={12} strokeWidth={2} />
                {status}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureUnderConstruction;
