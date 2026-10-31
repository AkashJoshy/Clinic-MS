import React, { useState } from "react";
import { TrendingUp, Calendar, Info } from "lucide-react";

import { formatCurrency } from "@/helpers/wallet.helper";
import { CHART_DATA_BY_RANGE } from "./mock-data";
import type { ChartPoint, TimeRange } from "@/types/wallet";

export const WalletBalanceChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("7D");
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = CHART_DATA_BY_RANGE[timeRange];

  const minBalance = Math.min(...data.map((d) => d.balance)) * 0.92;
  const maxBalance = Math.max(...data.map((d) => d.balance)) * 1.05;

  const width = 640;
  const height = 220;

  const padding = {
    top: 25,
    right: 18,
    bottom: 35,
    left: 55,
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const balanceRange = maxBalance - minBalance || 1;

  const points = data.map((d, index) => {
    const x =
      padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth;

    const y =
      padding.top +
      chartHeight -
      ((d.balance - minBalance) / balanceRange) * chartHeight;

    return { x, y, point: d, index };
  });

  const pathD = points.reduce((acc, curr, index, arr) => {
    if (index === 0) {
      return `M ${curr.x} ${curr.y}`;
    }

    const prev = arr[index - 1];
    const controlX = prev.x + (curr.x - prev.x) / 2;

    return (
      `${acc} C ${controlX} ${prev.y}, ` +
      `${controlX} ${curr.y}, ${curr.x} ${curr.y}`
    );
  }, "");

  const baseline = padding.top + chartHeight;

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${baseline} ` +
        `L ${points[0].x} ${baseline} Z`
      : "";

  const gridSteps = [0, 0.5, 1];

  const selectPoint = (point: ChartPoint, index: number) => {
    setHoveredPoint(point);
    setHoveredIndex(index);
  };

  const clearPoint = () => {
    setHoveredPoint(null);
    setHoveredIndex(null);
  };

  const changeTimeRange = (range: TimeRange) => {
    setTimeRange(range);
    clearPoint();
  };

  const rangeLabels: Record<TimeRange, string> = {
    "7D": "7 Days",
    "1M": "1 Month",
    "3M": "3 Months",
    "1Y": "1 Year",
  };

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : undefined;

  const tooltipLeft = activePoint
    ? Math.min(88, Math.max(12, (activePoint.x / width) * 100))
    : 50;

  const tooltipTop = activePoint
    ? Math.max(12, (activePoint.y / height) * 100)
    : 20;

  return (
    <section
      className="
        flex h-full min-w-0 flex-col
        rounded-2xl border border-slate-200/80
        bg-white p-4 shadow-xs
        sm:p-5
        lg:p-6
      "
    >
      <div
        className="
          flex min-w-0 flex-col gap-3
          border-b border-slate-100 pb-4
          sm:gap-4
          xl:flex-row xl:items-center xl:justify-between
        "
      >
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-[#0D1A27] sm:text-lg">
              Balance Overview
            </h2>

            <span
              className="
                inline-flex items-center gap-1 rounded-md
                border border-emerald-100 bg-emerald-50
                px-2 py-0.5 text-[10px] font-medium
                text-emerald-700 sm:text-[11px]
              "
            >
              <TrendingUp className="h-3 w-3 shrink-0 text-[#1DC465]" />
              Historical Trend
            </span>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Track how your wallet balance changes over time.
          </p>
        </div>

        <div
          className="
            grid w-full grid-cols-4 gap-1
            rounded-xl bg-slate-100 p-1
            text-[11px] font-semibold
            sm:w-fit sm:text-xs
            xl:shrink-0
          "
          aria-label="Chart time range"
        >
          {(["7D", "1M", "3M", "1Y"] as TimeRange[]).map((range) => (
            <button
              key={range}
              type="button"
              aria-pressed={timeRange === range}
              onClick={() => changeTimeRange(range)}
              className={`
                min-w-0 whitespace-nowrap rounded-lg
                px-2 py-2 transition-colors
                sm:px-3 sm:py-1.5
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-emerald-500
                ${
                  timeRange === range
                    ? "bg-white font-bold text-[#0D1A27] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >
              <span className="sm:hidden">{range}</span>
              <span className="hidden sm:inline">{rangeLabels[range]}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="
          relative mt-4 w-full min-w-0
          flex-1
          aspect-[640/220]
          min-h-[180px]
          sm:min-h-[210px]
          lg:min-h-[220px]
        "
      >
        {hoveredPoint && activePoint && (
          <div
            className="
              pointer-events-none absolute z-20
              max-w-[calc(100%-16px)]
              -translate-x-1/2 -translate-y-full
              rounded-xl border border-slate-700
              bg-[#0D1A27] px-3 py-2
              text-xs text-white shadow-lg
            "
            style={{
              left: `${tooltipLeft}%`,
              top: `${Math.max(8, tooltipTop - 3)}%`,
            }}
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap text-[10px] text-slate-300">
              <Calendar className="h-3 w-3 shrink-0 text-[#1DC465]" />
              <span>{hoveredPoint.date}</span>
            </div>

            <div className="mt-0.5 whitespace-nowrap text-sm font-bold text-[#1DC465]">
              {formatCurrency(hoveredPoint.balance)}
            </div>
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full overflow-visible"
          role="img"
          aria-label={`Wallet balance chart for ${rangeLabels[timeRange]}`}
        >
          <defs>
            <linearGradient
              id="walletChartGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#1DC465" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#1DC465" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridSteps.map((step) => {
            const y = padding.top + chartHeight * (1 - step);
            const value = minBalance + balanceRange * step;

            return (
              <g key={step}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />

                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 font-sans text-[10px]"
                >
                  ₹{(value / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {points.length > 0 && (
            <path d={areaD} fill="url(#walletChartGradient)" />
          )}

          {points.length > 0 && (
            <path
              d={pathD}
              fill="none"
              stroke="#1DC465"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {points.map((pt, index) => (
            <g
              key={`${pt.point.date}-${index}`}
              className="cursor-pointer"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  selectPoint(pt.point, index);
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") {
                  clearPoint();
                }
              }}
              onClick={() => {
                if (hoveredIndex === index) {
                  clearPoint();
                } else {
                  selectPoint(pt.point, index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${pt.point.date}: ${formatCurrency(pt.point.balance)}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();

                  if (hoveredIndex === index) {
                    clearPoint();
                  } else {
                    selectPoint(pt.point, index);
                  }
                }

                if (event.key === "Escape") {
                  clearPoint();
                }
              }}
            >
              {hoveredIndex === index && (
                <line
                  x1={pt.x}
                  y1={padding.top}
                  x2={pt.x}
                  y2={baseline}
                  stroke="#1DC465"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              )}

              <circle
                cx={pt.x}
                cy={pt.y}
                r={12}
                fill="transparent"
                pointerEvents="all"
              />

              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === index ? 6 : 4}
                fill={hoveredIndex === index ? "#1DC465" : "#ffffff"}
                stroke="#1DC465"
                strokeWidth="2"
                pointerEvents="none"
              />

              <text
                x={pt.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-slate-500 font-sans text-[11px]"
                pointerEvents="none"
              >
                {pt.point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div
        className="
          mt-3 flex flex-col gap-2
          border-t border-slate-100 pt-3
          text-[11px] text-slate-400
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <span className="flex min-w-0 items-start gap-1.5 leading-relaxed">
          <Info className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
          <span>
            Tap or hover over chart points to preview balance records.
          </span>
        </span>

        <span
          className="
            w-fit max-w-full rounded px-1.5 py-1
            font-mono text-[10px] text-emerald-600
            bg-emerald-50
          "
        >
          Preview Ledger Data
        </span>
      </div>
    </section>
  );
};

export default WalletBalanceChart;
