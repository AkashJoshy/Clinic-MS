import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Network, ArrowUpRight } from "lucide-react";

import { describeDonutSlice } from "@/helpers/admin-dashboard.helper";
import type {
  DepartmentDistributionChartProps,
  DepartmentDistributtonItem,
} from "@/types/admin/dashboard.types";

export const DepartmentDistributionChart: React.FC<
  DepartmentDistributionChartProps
> = ({ departmentsDetails, isDark }) => {
  const [hoveredDept, setHoveredDept] =
    useState<DepartmentDistributtonItem | null>(null);

  const departments = departmentsDetails.departments;

  const activeSlice =
    hoveredDept ||
    departments.find((dept) => dept.count > 0) ||
    departments[0] ||
    null;

  const chartDepartments = departments.filter((dept) => dept.count > 0);

  return (
    <div
      className={`w-full min-w-0 p-3 sm:p-4 lg:p-6 rounded-2xl border transition-all ${
        isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3 mb-5">
        <div className="min-w-0">
          <h2
            className={`text-sm sm:text-base font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Specialty Distribution
          </h2>

          <p
            className={`text-[11px] sm:text-xs mt-0.5 ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
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
                className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wider max-w-[100px] truncate ${
                  isDark ? "text-[#8b9ab0]" : "text-gray-500"
                }`}
              >
                {activeSlice ? activeSlice.name.slice(0, 12) : "Total Doctors"}
              </span>

              <span
                className={`text-lg sm:text-xl font-extrabold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
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
                    isHovered
                      ? isDark
                        ? "bg-white/10 border-white/20"
                        : "bg-gray-100 border-gray-300"
                      : isDark
                        ? "bg-white/[0.02] border-white/5 hover:border-white/15"
                        : "bg-gray-50 border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs mb-1.5 min-w-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div
                        className="size-2 sm:size-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: dept.color }}
                      />

                      <span
                        className={`font-semibold truncate min-w-0 ${
                          isDark ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {dept.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span
                        className={`whitespace-nowrap ${
                          isDark ? "text-[#8b9ab0]" : "text-gray-500"
                        }`}
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
                  <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10 overflow-hidden">
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
