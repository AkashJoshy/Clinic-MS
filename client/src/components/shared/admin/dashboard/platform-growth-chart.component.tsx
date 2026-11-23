import React, { useState, useMemo } from "react";
import { TrendingUp, Calendar } from "lucide-react";

import type { DoctorDetailsCardInfo } from "@/types/doctor";
import type { PatientBasicInfo } from "@/types/patient";
import { getPlatformGrowthChartTheme } from "@/helpers/admin/dashboard.helper";

interface PlatformGrowthChartProps {
  doctors: DoctorDetailsCardInfo[];
  patients: PatientBasicInfo[];
  isDark: boolean;
}

type TimeRange = "7D" | "30D" | "6M" | "1Y";

interface DataPoint {
  label: string;
  fullDate: string;
  doctors: number;
  patients: number;
}

export const PlatformGrowthChart: React.FC<PlatformGrowthChartProps> = ({
  doctors,
  patients,
  isDark,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const theme = getPlatformGrowthChartTheme(isDark);

  // Generate realistic growth series correlated to actual entities
  const chartData: DataPoint[] = useMemo(() => {
    const totalDocs = Math.max(doctors.length, 1);
    const totalPts = Math.max(patients.length, 1);

    if (timeRange === "7D") {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      return days.map((day, idx) => {
        const factor = (idx + 1) / days.length;

        return {
          label: day,
          fullDate: `Day ${idx + 1} of this week`,
          doctors: Math.max(1, Math.round(totalDocs * (0.65 + factor * 0.35))),
          patients: Math.max(1, Math.round(totalPts * (0.6 + factor * 0.4))),
        };
      });
    }

    if (timeRange === "30D") {
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

      return weeks.map((w, idx) => {
        const factor = (idx + 1) / weeks.length;

        return {
          label: w,
          fullDate: `${w} of this month`,
          doctors: Math.max(1, Math.round(totalDocs * (0.45 + factor * 0.55))),
          patients: Math.max(1, Math.round(totalPts * (0.4 + factor * 0.6))),
        };
      });
    }

    if (timeRange === "6M") {
      const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

      return months.map((m, idx) => {
        const factor = (idx + 1) / months.length;

        return {
          label: m,
          fullDate: `${m} 2026`,
          doctors: Math.max(1, Math.round(totalDocs * (0.3 + factor * 0.7))),
          patients: Math.max(1, Math.round(totalPts * (0.25 + factor * 0.75))),
        };
      });
    }

    // 1Y
    const quarters = ["Q1", "Q2", "Q3", "Q4"];

    return quarters.map((q, idx) => {
      const factor = (idx + 1) / quarters.length;

      return {
        label: q,
        fullDate: `2026 ${q}`,
        doctors: Math.max(1, Math.round(totalDocs * (0.2 + factor * 0.8))),
        patients: Math.max(1, Math.round(totalPts * (0.15 + factor * 0.85))),
      };
    });
  }, [doctors.length, patients.length, timeRange]);

  const width = 640;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = useMemo(() => {
    const maxD = Math.max(...chartData.map((d) => d.doctors), 1);
    const maxP = Math.max(...chartData.map((d) => d.patients), 1);

    return Math.max(maxD, maxP) * 1.25;
  }, [chartData]);

  const points = useMemo(() => {
    const innerW = width - paddingX * 2;
    const innerH = height - paddingY * 2;

    return chartData.map((d, i) => {
      const x =
        chartData.length > 1
          ? paddingX + (i / (chartData.length - 1)) * innerW
          : width / 2;

      const yDocs = height - paddingY - (d.doctors / maxVal) * innerH;
      const yPts = height - paddingY - (d.patients / maxVal) * innerH;

      return { x, yDocs, yPts, ...d };
    });
  }, [chartData, maxVal]);

  // Smooth bezier curve generator
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";

    let d = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return d;
  };

  const docPath = useMemo(
    () => createSmoothPath(points.map((p) => ({ x: p.x, y: p.yDocs }))),
    [points],
  );

  const patientPath = useMemo(
    () => createSmoothPath(points.map((p) => ({ x: p.x, y: p.yPts }))),
    [points],
  );

  const docArea = useMemo(() => {
    if (points.length === 0) return "";

    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const groundY = height - paddingY;

    return `${docPath} L ${lastX} ${groundY} L ${firstX} ${groundY} Z`;
  }, [docPath, points]);

  const patientArea = useMemo(() => {
    if (points.length === 0) return "";

    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const groundY = height - paddingY;

    return `${patientPath} L ${lastX} ${groundY} L ${firstX} ${groundY} Z`;
  }, [patientPath, points]);

  const currentPoint =
    hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  return (
    <div
      className={`w-full min-w-0 p-3 sm:p-4 lg:p-6 rounded-2xl border transition-all ${theme.container}`}
    >
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`text-sm sm:text-base font-bold ${theme.heading}`}>
              Platform Growth Trends
            </h2>

            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 flex items-center gap-1 shrink-0">
              <TrendingUp size={12} />
              +24.8%
            </span>
          </div>

          <p className={`text-[11px] sm:text-xs mt-1 ${theme.description}`}>
            Registered doctors vs patient account growth
          </p>
        </div>

        {/* Range Buttons */}
        <div
          className={`grid grid-cols-4 w-full sm:w-auto items-center p-1 rounded-xl border shrink-0 ${theme.rangeContainer}`}
        >
          {(["7D", "30D", "6M", "1Y"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => {
                setTimeRange(range);
                setHoverIndex(null);
              }}
              className={`min-w-0 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeRange === range ? theme.rangeActive : theme.rangeInactive
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 p-2.5 sm:p-3 rounded-xl border min-w-0 ${theme.metricsContainer}`}
      >
        {/* Doctors */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="size-2.5 sm:size-3 rounded-full bg-emerald-500 shrink-0" />

          <div className="min-w-0">
            <p
              className={`text-[10px] sm:text-[11px] font-medium ${theme.metricLabel}`}
            >
              Doctors
            </p>

            <p className={`text-xs sm:text-sm font-bold ${theme.metricValue}`}>
              {currentPoint ? currentPoint.doctors : doctors.length}
            </p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="size-2.5 sm:size-3 rounded-full bg-sky-500 shrink-0" />

          <div className="min-w-0">
            <p
              className={`text-[10px] sm:text-[11px] font-medium ${theme.metricLabel}`}
            >
              Patients
            </p>

            <p className={`text-xs sm:text-sm font-bold ${theme.metricValue}`}>
              {currentPoint ? currentPoint.patients : patients.length}
            </p>
          </div>
        </div>

        {/* Selected Date */}
        <div className="col-span-2 sm:col-span-1 flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Calendar size={14} className="text-primary" />
          </div>

          <div className="min-w-0">
            <p
              className={`text-[10px] sm:text-[11px] font-medium ${theme.metricLabel}`}
            >
              Selected
            </p>

            <p
              className={`text-xs font-semibold truncate ${theme.metricValue}`}
            >
              {currentPoint?.fullDate ?? "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full min-w-0 overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block w-full h-auto min-h-[150px] max-h-[280px] aspect-[8/3] select-none touch-pan-y"
        >
          <defs>
            <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);

            return (
              <line
                key={ratio}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke={theme.gridLine}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Areas */}
          <path d={patientArea} fill="url(#patientGrad)" />
          <path d={docArea} fill="url(#docGrad)" />

          {/* Lines */}
          <path
            d={patientPath}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d={docPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Hover Guideline */}
          {hoverIndex !== null && (
            <line
              x1={points[hoverIndex].x}
              y1={paddingY}
              x2={points[hoverIndex].x}
              y2={height - paddingY}
              stroke={theme.guideline}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Data Points */}
          {points.map((pt, idx) => {
            const isHovered = hoverIndex === idx;

            return (
              <g key={idx}>
                {/* Doctor Point */}
                <circle
                  cx={pt.x}
                  cy={pt.yDocs}
                  r={isHovered ? 6 : 4}
                  fill={theme.chartPointFill}
                  stroke="#10b981"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />

                {/* Patient Point */}
                <circle
                  cx={pt.x}
                  cy={pt.yPts}
                  r={isHovered ? 6 : 4}
                  fill={theme.chartPointFill}
                  stroke="#0ea5e9"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />

                {/* X Axis Label */}
                <text
                  x={pt.x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isHovered ? theme.chartLabelActive : theme.chartLabel}
                  fontWeight={isHovered ? "bold" : "normal"}
                >
                  {pt.label}
                </text>
              </g>
            );
          })}

          {/* Invisible Hover Zones */}
          {points.map((pt, idx) => {
            const stepW =
              points.length > 1
                ? (width - paddingX * 2) / (points.length - 1)
                : width - paddingX * 2;

            return (
              <rect
                key={idx}
                x={pt.x - stepW / 2}
                y={0}
                width={stepW}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onTouchStart={() => setHoverIndex(idx)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
