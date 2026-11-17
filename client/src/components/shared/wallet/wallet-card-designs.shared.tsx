import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  TrendingUp,
  ShieldCheck,
  Wifi,
  CreditCard,
  Wallet,
  ArrowUpRight,
  Sparkles,
  CircleDollarSign,
  Landmark,
  Activity,
  LockKeyhole,
  ScanLine,
  Layers,
  Hexagon,
  Fingerprint,
  CircleCheck,
  ArrowDownLeft,
  Banknote,
  Shield,
  Zap,
  Gem,
  BadgeCheck,
  Globe2,
} from "lucide-react";

import { formatCurrency } from "@/helpers/wallet.helper";
import { getContrastTextColor } from "@/helpers/color-palette.helper";
import { useAuthStore } from "@/store";

export interface WalletCardDesignProps {
  totalBalance: number;
  walletHolder?: string;
  maskedId?: string;
  trendPercent?: number;
}

type CardProps = WalletCardDesignProps & { preview?: boolean };

const useCardTheme = () => {
  const { primaryColor } = useAuthStore((state) => state.platform);
  const brand = primaryColor || "#1DC465";
  return {
    brand,
    contrast: getContrastTextColor(brand),
    tint: (opacity: number) =>
      `color-mix(in srgb, ${brand} ${opacity}%, transparent)`,
    deep: `color-mix(in srgb, ${brand} 20%, #0D1A27)`,
    deeper: `color-mix(in srgb, ${brand} 8%, #07111B)`,
  };
};

const useBalanceVisibility = () => {
  const [visible, setVisible] = useState(false);
  return { visible, toggle: () => setVisible((v) => !v) };
};

const CardShell: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style }) => (
  <section
    className={`relative isolate flex min-h-[250px] min-w-0 flex-col justify-between overflow-hidden rounded-3xl border p-6 text-white shadow-xl shadow-slate-950/20 ${className}`}
    style={style}
  >
    {children}
  </section>
);

const Balance: React.FC<{
  value: number;
  visible: boolean;
  onToggle: () => void;
  brand: string;
  label?: string;
  size?: string;
}> = ({
  value,
  visible,
  onToggle,
  brand,
  label = "Available balance",
  size = "text-3xl",
}) => (
  <div className="relative z-10 min-w-0">
    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
      <span>{label}</span>
      <button
        type="button"
        onClick={onToggle}
        aria-label={visible ? "Hide balance" : "Show balance"}
        className="rounded-full p-1 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2"
        style={{ ["--tw-ring-color" as string]: brand }}
      >
        {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
    </div>
    <div
      className={`${size} break-words font-extrabold tracking-tight text-white`}
    >
      {visible ? formatCurrency(value) : "••••••••"}
    </div>
  </div>
);

const Footer: React.FC<{
  holder: string;
  id: string;
  brand: string;
  layout?: "row" | "stack";
}> = ({ holder, id, brand, layout = "row" }) => (
  <div
    className={`relative z-10 grid min-w-0 gap-3 border-t border-white/15 pt-3 text-xs ${layout === "row" ? "grid-cols-2" : "grid-cols-1"}`}
  >
    <div className="min-w-0">
      <span className="mb-1 block text-[10px] uppercase tracking-widest text-slate-400">
        Wallet holder
      </span>
      <span
        className="block truncate font-semibold text-slate-100"
        title={holder}
      >
        {holder}
      </span>
    </div>
    <div className={`min-w-0 ${layout === "row" ? "text-right" : ""}`}>
      <span className="mb-1 block text-[10px] uppercase tracking-widest text-slate-400">
        Wallet ID
      </span>
      <span
        className="block truncate font-mono font-semibold tracking-wider"
        style={{ color: brand }}
        title={id}
      >
        {id}
      </span>
    </div>
  </div>
);

const Brand: React.FC<{ brand: string; subtitle?: string }> = ({
  brand,
  subtitle = "SECURE DIGITAL WALLET",
}) => (
  <div className="relative z-10 flex items-center gap-2.5">
    <div
      className="flex h-9 w-9 items-center justify-center rounded-xl border"
      style={{
        borderColor: `color-mix(in srgb, ${brand} 50%, transparent)`,
        background: `color-mix(in srgb, ${brand} 16%, transparent)`,
        color: brand,
      }}
    >
      <ShieldCheck className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <div
        className="truncate text-xs font-extrabold uppercase tracking-widest"
        style={{ color: brand }}
      >
        Healthixia Care
      </div>
      <div className="text-[9px] tracking-[0.18em] text-slate-400">
        {subtitle}
      </div>
    </div>
  </div>
);

const Trend: React.FC<{
  value?: number;
  brand: string;
  contrast: string;
  compact?: boolean;
}> = ({ value = 12.5, brand, contrast, compact }) => (
  <div
    className={`relative z-10 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${compact ? "text-[10px]" : ""}`}
    style={{ background: brand, borderColor: brand, color: contrast }}
  >
    <TrendingUp className="h-3.5 w-3.5" />
    {value > 0 ? "+" : ""}
    {value}% this month
  </div>
);

const Chip: React.FC<{ brand: string; className?: string }> = ({
  brand,
  className = "",
}) => (
  <div
    className={`relative z-10 h-9 w-12 overflow-hidden rounded-md border border-amber-200/50 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 shadow ${className}`}
  >
    <div className="flex h-full flex-col justify-around rounded-[3px] border border-amber-900/40 py-0.5">
      <i className="border-b border-amber-900/30" />
      <i className="border-b border-amber-900/30" />
      <i className="border-b border-amber-900/30" />
    </div>
    <i className="absolute inset-y-0 left-1/3 w-1/3 border-x border-amber-900/40" />
  </div>
);

const defaults = (props: CardProps) => ({
  holder: props.walletHolder ?? "Doctor Wallet",
  id: props.maskedId ?? "•••• 4829",
  trend: props.trendPercent ?? 12.5,
  value: props.totalBalance,
});

// 02 — Minimal horizontal bank-card layout
export const WalletDesign02: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-5"
      style={{
        background: `linear-gradient(110deg,${t.deeper},#101E2B 70%)`,
        borderColor: t.tint(35),
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="text-[11px] font-black tracking-[.28em]"
          style={{ color: t.brand }}
        >
          HC / WALLET
        </div>
        <CreditCard className="h-7 w-7" style={{ color: t.brand }} />
      </div>
      <div className="flex items-center gap-4">
        <Chip brand={t.brand} />
        <div className="h-px flex-1" style={{ background: t.tint(45) }} />
        <span className="text-[10px] tracking-widest text-slate-400">
          VISA VIRTUAL
        </span>
      </div>
      <Balance
        value={v.value}
        visible={b.visible}
        onToggle={b.toggle}
        brand={t.brand}
        label="Wallet balance"
        size="text-4xl"
      />
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Cardholder
          </p>
          <p className="truncate text-sm font-semibold">{v.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Card number
          </p>
          <p
            className="font-mono text-sm tracking-widest"
            style={{ color: t.brand }}
          >
            {v.id}
          </p>
        </div>
      </div>
    </CardShell>
  );
};

// 04 — Circular orbital motif
export const WalletDesign04: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-4"
      style={{
        background: `radial-gradient(circle at 90% 10%,${t.tint(22)},transparent 42%),#0A1722`,
        borderColor: t.tint(30),
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border"
        style={{
          borderColor: t.tint(35),
          boxShadow: `0 0 0 22px ${t.tint(8)},0 0 0 46px ${t.tint(6)},0 0 0 70px ${t.tint(4)}`,
        }}
      />
      <div className="flex items-center justify-between">
        <Brand brand={t.brand} />
        <Globe2 className="h-6 w-6" style={{ color: t.brand }} />
      </div>
      <div className="relative z-10 mt-3">
        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Available funds"
          size="text-4xl"
        />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <Trend value={v.trend} brand={t.brand} contrast={t.contrast} />
        <div className="text-right text-[10px] text-slate-400">
          WALLET
          <br />
          <b className="tracking-widest text-white">{v.id}</b>
        </div>
      </div>
      <div className="relative z-10 text-xs font-semibold text-slate-200">
        {v.holder}
      </div>
    </CardShell>
  );
};

// 07 — Geometric corner frame
export const WalletDesign07: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-5"
      style={{ background: "#0B1823", borderColor: t.tint(35) }}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-28 w-28"
        style={{
          background: `linear-gradient(135deg,transparent 49%,${t.tint(20)} 50%)`,
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-24 w-24"
        style={{
          background: `linear-gradient(315deg,transparent 49%,${t.tint(14)} 50%)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <Brand brand={t.brand} />
        <Hexagon className="h-6 w-6" style={{ color: t.brand }} />
      </div>
      <div
        className="relative z-10 border-l-2 pl-4"
        style={{ borderColor: t.brand }}
      >
        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Wallet balance"
          size="text-4xl"
        />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="text-xs font-semibold">{v.holder}</div>
        <Trend value={v.trend} brand={t.brand} contrast={t.contrast} compact />
      </div>
      <div className="relative z-10 font-mono text-[10px] tracking-[.22em] text-slate-400">
        {v.id}
      </div>
    </CardShell>
  );
};

// 08 — Topographic / layered bands
export const WalletDesign08: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-4"
      style={{
        background: `linear-gradient(160deg,${t.deep},#08131E 72%)`,
        borderColor: t.tint(30),
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-80"
        style={{
          background: `repeating-linear-gradient(170deg,transparent 0 13px,${t.tint(10)} 14px 15px,transparent 16px 28px)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <Brand brand={t.brand} />
        <Activity className="h-6 w-6" style={{ color: t.brand }} />
      </div>
      <div className="relative z-10">
        <p className="mb-1 text-[10px] uppercase tracking-[.2em] text-slate-400">
          Your wallet
        </p>
        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Total balance"
          size="text-4xl"
        />
      </div>
      <div className="relative z-10 flex items-end justify-between gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Account name
          </p>
          <p className="max-w-[170px] truncate text-xs font-bold">{v.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Reference
          </p>
          <p className="font-mono text-xs" style={{ color: t.brand }}>
            {v.id}
          </p>
        </div>
      </div>
    </CardShell>
  );
};

// 10 — Oversized watermark monogram
export const WalletDesign10: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-4"
      style={{
        background: `linear-gradient(135deg,#0A1722,${t.deep})`,
        borderColor: t.tint(30),
      }}
    >
      <div
        className="pointer-events-none absolute -right-4 top-4 select-none text-[190px] font-black leading-none opacity-[.07]"
        style={{ color: t.brand }}
      >
        H
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <Brand brand={t.brand} />
        <Sparkles className="h-5 w-5" style={{ color: t.brand }} />
      </div>
      <div className="relative z-10 mt-3">
        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Your total balance"
          size="text-4xl"
        />
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Wallet owner
          </p>
          <p className="truncate text-xs font-bold">{v.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            ID
          </p>
          <p className="font-mono text-xs" style={{ color: t.brand }}>
            {v.id}
          </p>
        </div>
      </div>
    </CardShell>
  );
};

// 11 — Compact fintech dashboard tile
export const WalletDesign11: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-4"
      style={{ background: "#0D1B28", borderColor: t.tint(28) }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold">
          <div
            className="rounded-lg p-2"
            style={{ background: t.tint(16), color: t.brand }}
          >
            <CircleDollarSign className="h-4 w-4" />
          </div>{" "}
          WALLET OVERVIEW
        </div>
        <span
          className="rounded-full px-2 py-1 text-[9px] font-bold"
          style={{ background: t.tint(15), color: t.brand }}
        >
          ACTIVE
        </span>
      </div>
      <Balance
        value={v.value}
        visible={b.visible}
        onToggle={b.toggle}
        brand={t.brand}
        label="Current balance"
        size="text-4xl"
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-[9px] uppercase text-slate-500">Growth</p>
          <p className="mt-1 text-sm font-bold" style={{ color: t.brand }}>
            {v.trend > 0 ? "+" : ""}
            {v.trend}%
          </p>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-[9px] uppercase text-slate-500">Wallet ID</p>
          <p className="mt-1 truncate font-mono text-xs">{v.id}</p>
        </div>
      </div>
      <p className="truncate text-xs font-semibold text-slate-300">
        {v.holder}
      </p>
    </CardShell>
  );
};

// 12 — Outlined neon frame
export const WalletDesign12: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="gap-5 border-2"
      style={{
        background: "#07131D",
        borderColor: t.tint(65),
        boxShadow: `inset 0 0 28px ${t.tint(8)},0 0 28px ${t.tint(12)}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-2 rounded-[20px] border opacity-40"
        style={{ borderColor: t.brand }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <div
          className="text-xs font-black uppercase tracking-[.25em]"
          style={{ color: t.brand }}
        >
          Healthixia
        </div>
        <Fingerprint className="h-6 w-6" style={{ color: t.brand }} />
      </div>
      <div className="relative z-10 text-center">
        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Secure wallet balance"
          size="text-4xl"
        />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <span className="truncate text-xs font-semibold">{v.holder}</span>
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: t.brand }}
        >
          {v.id}
        </span>
      </div>
    </CardShell>
  );
};

// 15 — Premium medallion / centered composition
export const WalletDesign15: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();
  return (
    <CardShell
      className="items-center gap-3 text-center"
      style={{
        background: `radial-gradient(circle at 50% 0%,${t.tint(22)},transparent 55%),#0A1722`,
        borderColor: t.tint(30),
      }}
    >
      <div className="relative z-10 flex w-full items-center justify-between">
        <div
          className="text-[10px] font-black uppercase tracking-[.2em]"
          style={{ color: t.brand }}
        >
          Healthixia Care
        </div>
        <Gem className="h-5 w-5" style={{ color: t.brand }} />
      </div>
      <div
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2"
        style={{
          borderColor: t.tint(65),
          background: t.tint(12),
          color: t.brand,
        }}
      >
        <CircleCheck className="h-6 w-6" />
      </div>
      <div className="relative z-10 w-full">
        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Total wallet balance"
          size="text-4xl"
        />
      </div>
      <div className="relative z-10 flex w-full items-center justify-between border-t border-white/10 pt-3 text-left">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Wallet holder
          </p>
          <p className="truncate text-xs font-bold">{v.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">
            Wallet ID
          </p>
          <p className="font-mono text-xs" style={{ color: t.brand }}>
            {v.id}
          </p>
        </div>
      </div>
    </CardShell>
  );
};

// 16 — Luxury Obsidian / Premium wallet
export const WalletDesign16: React.FC<CardProps> = (props) => {
  const t = useCardTheme();
  const v = defaults(props);
  const b = useBalanceVisibility();

  return (
    <CardShell
      className="gap-5 border"
      style={{
        background:
          `radial-gradient(ellipse at 100% 0%, ${t.tint(20)}, transparent 48%),` +
          "linear-gradient(145deg, #111C29 0%, #080F18 65%, #101B27 100%)",
        borderColor: t.tint(40),
        boxShadow: `0 20px 55px -25px ${t.tint(35)}, inset 0 1px 0 ${t.tint(18)}`,
      }}
    >
      {/* Premium decorative details */}
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border"
        style={{
          borderColor: t.tint(18),
          boxShadow: `0 0 0 18px ${t.tint(5)}, 0 0 0 38px ${t.tint(4)}`,
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-1 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${t.brand}, transparent)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p
            className="text-[10px] font-black uppercase tracking-[0.3em]"
            style={{ color: t.brand }}
          >
            HEALTHIXIA CARE
          </p>
          <p className="mt-1 text-[9px] tracking-[0.25em] text-slate-500">
            PRIVATE WALLET
          </p>
        </div>

        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border"
          style={{
            borderColor: t.tint(45),
            background: t.tint(12),
            color: t.brand,
            boxShadow: `0 0 22px ${t.tint(12)}`,
          }}
        >
          <Gem className="h-5 w-5" />
        </div>
      </div>

      {/* Balance */}
      <div className="relative z-10 py-2">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
          Total available balance
        </p>

        <Balance
          value={v.value}
          visible={b.visible}
          onToggle={b.toggle}
          brand={t.brand}
          label="Premium account"
          size="text-4xl"
        />

        <div className="mt-4 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: t.brand, boxShadow: `0 0 8px ${t.brand}` }}
          />
          <span className="text-[10px] font-medium tracking-wider text-slate-400">
            SECURE ACCOUNT
          </span>
        </div>
      </div>

      {/* Bottom information */}
      <div className="relative z-10 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
        <div className="min-w-0">
          <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-slate-500">
            Account holder
          </p>
          <p className="truncate text-sm font-semibold tracking-wide text-white">
            {v.holder}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-slate-500">
            Wallet reference
          </p>
          <p
            className="font-mono text-xs font-semibold tracking-widest"
            style={{ color: t.brand }}
          >
            {v.id}
          </p>
        </div>
      </div>

      {/* Premium footer */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-[0.25em] text-slate-600">
          EXCLUSIVE • DIGITAL FINANCE
        </span>
        <ShieldCheck className="h-4 w-4" style={{ color: t.brand }} />
      </div>
    </CardShell>
  );
};

export const walletCardDesigns = [
  { id: 200, name: "Classic Virtual", Component: WalletDesign02 },
  { id: 201, name: "Orbit", Component: WalletDesign04 },
  { id: 202, name: "Geometric Frame", Component: WalletDesign07 },
  { id: 203, name: "Contour", Component: WalletDesign08 },
  { id: 204, name: "Monogram", Component: WalletDesign10 },
  { id: 205, name: "Fintech Tile", Component: WalletDesign11 },
  { id: 206, name: "Neon Outline", Component: WalletDesign12 },
  { id: 207, name: "Medallion", Component: WalletDesign15 },
  { id: 208, name: "Luxury Obsidian", Component: WalletDesign16 },
] as const;

export type WalletCardDesignId = (typeof walletCardDesigns)[number]["id"];

/** Use this gallery to compare all 15 designs before choosing one. */
export const WalletDesignGallery: React.FC<WalletCardDesignProps> = (props) => (
  <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    {walletCardDesigns.map(({ id, name, Component }) => (
      <div key={id} className="min-w-0 space-y-2">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Design {String(id).padStart(2, "0")} — {name}
        </div>
        <Component {...props} />
      </div>
    ))}
  </div>
);

export default WalletDesignGallery;
