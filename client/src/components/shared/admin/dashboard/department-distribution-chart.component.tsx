import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Network, ArrowUpRight } from "lucide-react";

import { describeDonutSlice } from "@/helpers/admin-dashboard.helper";
import type {
  DepartmentDistributionChartProps,
  DepartmentDistributtonItem,
} from "@/types/admin/dashboard.types";
import { getDepartmentDistributionChartTheme } from "@/helpers/admin/dashboard.helper";

export const DepartmentDistributionChart: React.FC<
  DepartmentDistributionChartProps
> = ({ departmentsDetails, isDark }) => {
  const [hoveredDept, setHoveredDept] =
    useState<DepartmentDistributtonItem | null>(null);

  const theme = getDepartmentDistributionChartTheme(isDark);

  const departments = departmentsDetails.departments;

  const activeSlice =
    hoveredDept ||
    departments.find((dept) => dept.count > 0) ||
    departments[0] ||
    null;

  const chartDepartments = departments.filter((dept) => dept.count > 0);

  return (
    <div
      className={`w-full min-w-0 p-3 sm:p-4 lg:p-6 rounded-2xl border transition-all ${theme.container}`}
    >
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3 mb-5">
        <div className="min-w-0">
          <h2 className={`text-sm sm:text-base font-bold ${theme.heading}`}>
            Specialty Distribution
          </h2>

          <p className={`text-[11px] sm:text-xs mt-0.5 ${theme.description}`}>
            Doctor allocation across departments
          </p>
        </div>

        <Link
          to="/admin/departments"
          className="text-primary hover:underline text-[11px] sm:text-xs font-semibold flex items-center gap-1 shrink-0"
        >
          All Departments
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Empty State */}
      {departments.length === 0 ? (
        <div className="py-10 sm:py-12 text-center">
          <Network className="mx-auto size-8 sm:size-10 text-gray-500 mb-2 opacity-50" />

          <p className="text-xs sm:text-sm font-medium text-gray-400">
            No departments created yet.
          </p>

          <Link
            to="/admin/department/add"
            className="mt-3 inline-block text-xs font-bold px-3 py-2 bg-primary text-slate-950 rounded-lg"
          >
            Create Department
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          {/* Donut Chart */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative w-full min-w-0">
            <svg
              viewBox="0 0 200 200"
              className="w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-44 lg:h-44 xl:w-48 xl:h-48 max-w-full select-none"
            >
              {chartDepartments.map((dept) => {
                const isHovered = hoveredDept?.id === dept.id;

                const path = describeDonutSlice(
                  100,
                  100,
                  isHovered ? 88 : 84,
                  54,
                  dept.startingPoint,
                  dept.endingPoint,
                );

                return (
                  <path
                    key={dept.id}
                    d={path}
                    fill={dept.color}
                    className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    onMouseEnter={() => setHoveredDept(dept)}
                    onMouseLeave={() => setHoveredDept(null)}
                    onClick={() =>
                      setHoveredDept(hoveredDept?.id === dept.id ? null : dept)
                    }
                  />
                );
              })}
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span
                className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wider max-w-[100px] truncate ${theme.centerLabel}`}
              >
                {activeSlice ? activeSlice.name.slice(0, 12) : "Total Doctors"}
              </span>

              <span
                className={`text-lg sm:text-xl font-extrabold ${theme.centerValue}`}
              >
                {activeSlice
                  ? `${activeSlice.percentage}%`
                  : departmentsDetails.totalDoctors}
              </span>

              <span className="text-[9px] sm:text-[10px] text-primary font-semibold">
                {activeSlice ? `${activeSlice.count} Doctors` : "Registered"}
              </span>
            </div>
          </div>

          {/* Department Legend */}
          <div className="md:col-span-7 min-w-0 space-y-2 sm:space-y-3 w-full">
            {departments.map((dept) => {
              const isHovered = hoveredDept?.id === dept.id;

              return (
                <div
                  key={dept.id}
                  onMouseEnter={() => setHoveredDept(dept)}
                  onMouseLeave={() => setHoveredDept(null)}
                  onClick={() =>
                    setHoveredDept(hoveredDept?.id === dept.id ? null : dept)
                  }
                  className={`min-w-0 p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isHovered ? theme.legendItemHovered : theme.legendItem
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs mb-1.5 min-w-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div
                        className="size-2 sm:size-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: dept.color }}
                      />

                      <span
                        className={`font-semibold truncate min-w-0 ${theme.legendName}`}
                      >
                        {dept.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span
                        className={`whitespace-nowrap ${theme.legendCount}`}
                      >
                        {dept.count} docs
                      </span>

                      <span
                        className="font-bold text-[11px] sm:text-xs min-w-[32px] text-right"
                        style={{ color: dept.color }}
                      >
                        {dept.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className={`w-full h-1 sm:h-1.5 rounded-full overflow-hidden ${theme.progressTrack}`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${dept.percentage}%`,
                        backgroundColor: dept.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
