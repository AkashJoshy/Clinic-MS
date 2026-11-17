
import React from "react";
import type { LucideIcon } from "lucide-react";

export const Field: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
  isDark?: boolean;
}> = ({ label, hint, children, isDark = true }) => (
  <div className="min-w-0">
    <label
      className={`block text-[13px] font-medium mb-2 ${
        isDark ? "text-[#dbe5f1]" : "text-gray-700"
      }`}
    >
      {label}
    </label>

    {children}

    {hint && (
      <p
        className={`text-xs mt-2 leading-relaxed ${
          isDark ? "text-[#6b7c93]" : "text-gray-500"
        }`}
      >
        {hint}
      </p>
    )}
  </div>
);

export const Toggle: React.FC<{
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
  isDark?: boolean;
}> = ({
  checked,
  onChange,
  label,
  disabled = false,
  isDark = true,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative shrink-0 w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${
      isDark
        ? "focus-visible:ring-offset-[#0d1a27]"
        : "focus-visible:ring-offset-white"
    } ${
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    } ${
      checked
        ? "bg-primary"
        : isDark
          ? "bg-white/15"
          : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const SettingRow: React.FC<{
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  isDark?: boolean;
}> = ({
  title,
  description,
  checked,
  onChange,
  disabled,
  isDark = true,
}) => (
  <div
    className={`flex items-center justify-between gap-6 py-4 border-b first:pt-0 last:border-0 last:pb-0 ${
      isDark ? "border-white/5" : "border-gray-100"
    }`}
  >
    <div className="min-w-0">
      <h4
        className={`text-sm font-medium ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h4>

      <p
        className={`text-xs mt-1 leading-relaxed ${
          isDark ? "text-[#8b9ab0]" : "text-gray-500"
        }`}
      >
        {description}
      </p>
    </div>

    <Toggle
      checked={checked}
      onChange={onChange}
      label={title}
      disabled={disabled}
      isDark={isDark}
    />
  </div>
);

export const Note: React.FC<{
  children: React.ReactNode;
  isDark?: boolean;
}> = ({ children, isDark = true }) => (
  <p
    className={`text-xs mt-5 pt-4 border-t leading-relaxed ${
      isDark
        ? "text-[#6b7c93] border-white/5"
        : "text-gray-500 border-gray-100"
    }`}
  >
    {children}
  </p>
);

export const StatusPill: React.FC<{
  tone: "warn" | "ok";
  children: React.ReactNode;
}> = ({ tone, children }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
      tone === "warn"
        ? "text-amber-300 bg-amber-400/10 border-amber-400/20"
        : "text-primary bg-primary/10 border-primary/20"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        tone === "warn" ? "bg-amber-400" : "bg-primary"
      }`}
    />
    {children}
  </span>
);

export const SettingsCard: React.FC<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  changed: boolean;
  children: React.ReactNode;
  isDark: boolean;
}> = ({
  id,
  icon: CardIcon,
  title,
  description,
  changed,
  children,
  isDark,
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className={`scroll-mt-6 border rounded-2xl overflow-hidden transition-colors ${
      isDark
        ? "bg-[#0d1a27] border-white/[0.08]"
        : "bg-white border-gray-200"
    }`}
  >
    <header
      className={`flex items-start justify-between gap-4 px-5 sm:px-6 py-5 border-b ${
        isDark ? "border-white/[0.08]" : "border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
          <CardIcon size={18} className="text-primary" />
        </div>

        <div className="min-w-0">
          <h3
            id={`${id}-title`}
            className={`text-[15px] font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-xs mt-1 leading-relaxed ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {changed && <StatusPill tone="warn">Edited</StatusPill>}
    </header>

    <div className="px-5 sm:px-6 py-6">{children}</div>
  </section>
);
