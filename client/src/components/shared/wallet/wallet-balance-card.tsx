
import React, { useState } from "react";
import { Eye, EyeOff, TrendingUp, ShieldCheck, Wifi } from "lucide-react";

import { formatCurrency } from "@/helpers/wallet.helper";
import { getContrastTextColor } from "@/helpers/color-palette.helper";
import { useAuthStore } from "@/store";

interface WalletBalanceCardProps {
  totalBalance: number;
  walletHolder?: string;
  maskedId?: string;
  trendPercent?: number;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  totalBalance,
  walletHolder = "Doctor Wallet",
  maskedId = "•••• 4829",
  trendPercent = 12.5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { primaryColor } = useAuthStore((state) => state.platform);

  const brandColor = primaryColor || "#1DC465";
  const contrastColor = getContrastTextColor(brandColor);

  const brandTint = (opacity: number) =>
    `color-mix(in srgb, ${brandColor} ${opacity}%, transparent)`;

  const cardGradient = `linear-gradient(
    135deg,
    #0D1A27 0%,
    color-mix(in srgb, ${brandColor} 18%, #0D1A27) 48%,
    color-mix(in srgb, ${brandColor} 38%, #0D1A27) 100%
  )`;

  return (
    <div
      className="
        relative flex min-w-0 flex-col justify-between
        overflow-hidden rounded-3xl
        border
        p-6 text-white
        shadow-xl shadow-slate-900/10
        transition-all hover:shadow-2xl

        sm:min-h-[270px] sm:p-5
        md:min-h-[250px] md:p-6
      "
      style={{
        background: cardGradient,
        borderColor: brandTint(25),
        boxShadow: `0 20px 40px -20px ${brandTint(25)}`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15">
        <svg
          className="
            absolute -right-12 -top-12 h-96 w-96

            sm:-right-8 sm:-top-8 sm:h-64 sm:w-64
            md:-right-12 md:-top-12 md:h-96 md:w-96
          "
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke={brandColor}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <circle
            cx="200"
            cy="200"
            r="140"
            stroke={brandColor}
            strokeWidth="1"
          />

          <path
            d="M50,200 Q120,80 200,200 T350,200"
            stroke={brandColor}
            strokeWidth="2"
            fill="none"
          />

          <path
            d="M30,240 Q130,120 220,240 T370,240"
            stroke="#ffffff"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 flex min-w-0 items-start justify-between gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-2 md:gap-2.5">
          <div
            className="
              flex h-8 w-8 shrink-0 items-center justify-center
              rounded-lg border

              sm:h-7 sm:w-7
              md:h-8 md:w-8
            "
            style={{
              borderColor: brandTint(45),
              backgroundColor: brandTint(20),
              color: brandColor,
            }}
          >
            <ShieldCheck className="h-5 w-5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </div>

          <div className="min-w-0">
            <span
              className="
                block truncate text-xs font-bold
                uppercase tracking-widest

                sm:text-[11px] sm:tracking-wide
                md:text-xs md:tracking-widest
              "
              style={{ color: brandColor }}
            >
              Healthixia Care
            </span>

            <p
              className="
                text-[10px] tracking-wider text-slate-300

                sm:text-[9px] sm:tracking-normal
                md:text-[10px] md:tracking-wider
              "
            >
              SECURE DIGITAL WALLET
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-1.5 md:gap-2">
          <span
            className="
              font-mono text-[10px] uppercase tracking-wider

              sm:text-[9px] sm:tracking-normal
              md:text-[10px] md:tracking-wider
            "
            style={{ color: brandTint(85) }}
          >
            VIRTUAL
          </span>

          <Wifi
            className="h-5 w-5 rotate-90 sm:h-4 sm:w-4 md:h-5 md:w-5"
            style={{ color: brandTint(85) }}
          />
        </div>
      </div>

      <div
        className="
          relative z-10 my-4 flex min-w-0 items-center
          justify-between gap-3

          sm:my-5 sm:gap-2
          md:my-4 md:gap-3
        "
      >
        <div
          className="
            relative flex h-9 w-12 shrink-0 items-center justify-center
            overflow-hidden rounded-md
            border border-amber-300/60
            bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600
            p-1 shadow-sm

            sm:h-8 sm:w-11
            md:h-9 md:w-12
          "
        >
          <div className="flex h-full w-full flex-col justify-around rounded-xs border border-amber-800/40 py-0.5">
            <div className="w-full border-b border-amber-800/30" />
            <div className="w-full border-b border-amber-800/30" />
            <div className="w-full border-b border-amber-800/30" />
          </div>

          <div className="absolute inset-y-0 left-1/3 w-1/3 border-x border-amber-800/40" />
        </div>

        {trendPercent !== undefined && (
          <div
            className="
              flex min-w-0 max-w-full items-center gap-1.5
              rounded-full border
              px-3 py-1
              text-xs font-semibold
              backdrop-blur-sm
              transition-colors

              sm:gap-1 sm:px-2 sm:text-[10px]
              md:gap-1.5 md:px-3 md:text-xs
            "
            style={{
              backgroundColor: brandColor,
              borderColor: brandColor,
              color: contrastColor,
            }}
          >
            <TrendingUp
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: contrastColor }}
            />

            <span className="truncate">
              {trendPercent > 0 ? "+" : ""}
              {trendPercent}% this month
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 min-w-0 space-y-1">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="
              min-w-0 text-xs font-medium uppercase
              tracking-wider text-slate-300

              sm:text-[11px] sm:tracking-wide
              md:text-xs md:tracking-wider
            "
          >
            Total Wallet Balance
          </span>

          <button
            type="button"
            onClick={() => setIsVisible((visible) => !visible)}
            aria-label={isVisible ? "Hide balance" : "Show balance"}
            aria-pressed={!isVisible}
            className="
              shrink-0 rounded-full p-1
              text-slate-400 transition-colors
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
            "
            style={{
              outlineColor: brandColor,
              ["--tw-ring-color" as string]: brandColor,
            }}
          >
            {isVisible ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        <div
          className="
            break-words font-sans text-3xl font-extrabold
            tracking-tight text-white
            xsxs:text-[16px] xxs:text-[18px] xs:text-[20px]
            sm:text-[28px] md:text-4xl
          "
        >
          {isVisible ? formatCurrency(totalBalance) : "••••••••"}
        </div>
      </div>

      <div
        className="
          relative z-10 mt-4 grid min-w-0 grid-cols-2
          items-end gap-3 border-t border-white/10 pt-3 text-xs

          sm:mt-5 sm:gap-2
          md:mt-4 md:gap-3
        "
      >
        <div className="min-w-0">
          <span
            className="
              mb-1 block text-[10px] uppercase
              tracking-wider text-slate-400
            "
          >
            Wallet Holder
          </span>

          <span
            title={walletHolder}
            className="
              block truncate font-semibold tracking-wide text-slate-100
              sm:text-[11px] md:text-xs
            "
          >
            {walletHolder}
          </span>
        </div>

        <div className="min-w-0 text-right">
          <span
            className="
              mb-1 block text-[10px] uppercase tracking-wider text-slate-400
            "
          >
            Wallet ID
          </span>

          <span
            title={maskedId}
            className="
              block truncate font-mono font-medium tracking-widest
              sm:text-[11px] sm:tracking-wide md:text-xs md:tracking-widest
            "
            style={{ color: brandColor }}
          >
            {maskedId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
