import { Button } from "@/components/ui/button";
import type { ExceptionsData, ExceptionsProps } from "@/types/doctor-clinic";
import { LockKeyhole, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { NumberBadge } from "../../number-badge.shared";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LockedOverlay } from "./locked-overlay.shared";
import { useExceptions } from "@/hooks/use-exceptions.hook";

export const Exceptions: React.FC<ExceptionsProps> = ({
  exceptions,
  onChange,
  generateSlots,
  disabled,
}) => {
  const {
    activeTab,
    breakForm,
    dateForm,
    deleteItem,
    handleAddBreak,
    handleAddDateException,
    handleAddItem,
    handleAddOverride,
    handleTabChange,
    isBreakFormValid,
    isDateFormValid,
    isOverrideFormValid,
    overrideForm,
    resetBreakForm,
    resetDateForm,
    resetOverrideForm,
    setActiveTab,
    setBreakForm,
    setDateForm,
    setOverrideForm,
    setShowForm,
    setShowOverrideForm,
    showForm,
    showOverrideForm,
  } = useExceptions(exceptions, onChange);

  return (
    <div className="relative">
      <div
        className={`
          rounded-lg border border-white/10 bg-[#0d1a27] p-6
          text-[#8b9ab0] transition-all duration-300
          ${disabled ? "select-none" : ""}
        `}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <NumberBadge number={3} />

            <h2 className="ml-2 text-xl font-semibold text-white">
              Exceptions & Overrides
            </h2>
          </div>

          <span className="rounded bg-white/10 px-2 py-1 text-xs xsxs:hidden sm:block">
            Optional
          </span>

          <span className="rounded bg-white/10 px-2 py-1 text-xs xsxs:block sm:hidden">
            Opt.
          </span>
        </div>

        <ScrollArea className="mb-5 w-full whitespace-nowrap">
          <div className="mb-4 flex gap-1 overflow-x-auto border-b border-white/10 pb-0 scrollbar-hide">
            {(["breaks", "vacations", "blackouts", "holidays"] as const).map(
              (tab) => {
                const isActive = activeTab === tab;
                const count = exceptions[tab].length > 9 ? `${exceptions[tab].length}+` : exceptions[tab].length

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`
          group inline-flex shrink-0 items-center gap-2
          whitespace-nowrap border-b-2 px-3 py-3
          text-xs font-medium capitalize
          transition-all duration-200 sm:px-4 sm:text-sm
          ${
            isActive
              ? "border-[#1dc465] text-[#1dc465]"
              : "border-transparent text-slate-400 hover:border-white/20 hover:text-white"
          }
        `}
                  >
                    <span>{tab}</span>

                    <span
                      className={`
            inline-flex h-[22px] min-w-[22px] items-center
            justify-center rounded-md px-1.5
            text-[11px] font-semibold tabular-nums
            transition-colors duration-200
            ${
              isActive
                ? "border border-[#1dc465]/30 bg-[#1dc465]/15 text-[#1dc465]"
                : "border border-white/10 bg-white/[0.04] text-white/80 group-hover:border-white/20 group-hover:bg-white/[0.08]"
            }
          `}
                    >
                      {count}
                    </span>
                  </button>
                );
              },
            )}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="min-h-[120px]">
          {exceptions[activeTab].length === 0 ? (
            <div className="rounded border border-dashed border-white/10 py-6 text-center text-sm">
              No {activeTab} configured.
            </div>
          ) : (
            <ScrollArea className="h-40 w-full">
              <div className="space-y-2 pr-3">
                {exceptions[activeTab].map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded bg-white/5 p-3"
                  >
                    <span className="text-sm text-white">
                      {item.label || item.reason || "Entry"} •{" "}
                      {item.startTime
                        ? `${item.startTime} - ${item.endTime}`
                        : `${item.startDate} to ${item.endDate}`}
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteItem(activeTab, item.id)}
                      className="text-[#8b9ab0] transition-colors hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}

          {!showForm && (
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-4 flex items-center gap-1 text-sm text-[#1dc465] hover:underline"
            >
              <Plus size={14} />
              Add {activeTab.slice(0, -1)}
            </button>
          )}

          {/* Break Form */}
          {activeTab === "breaks" && showForm && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {/* Label */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    Label
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Lunch"
                    value={breakForm.label}
                    onChange={(e) =>
                      setBreakForm((prev) => ({
                        ...prev,
                        label: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#1dc465]"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={breakForm.startTime}
                    onChange={(e) =>
                      setBreakForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={breakForm.endTime}
                    onChange={(e) =>
                      setBreakForm((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetBreakForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleAddBreak}
                  disabled={!isBreakFormValid}
                  className="bg-[#1dc465] text-white hover:bg-[#1dc465]/90"
                >
                  Add Break
                </Button>
              </div>
            </div>
          )}

          {/* Vacation / Blackout / Holiday Form */}
          {activeTab !== "breaks" && showForm && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {/* Reason */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    Reason
                  </label>

                  <input
                    type="text"
                    placeholder={`e.g. ${
                      activeTab === "vacations"
                        ? "Family vacation"
                        : activeTab === "blackouts"
                          ? "Clinic unavailable"
                          : "Public holiday"
                    }`}
                    value={dateForm.reason}
                    onChange={(e) =>
                      setDateForm((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#1dc465]"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    Start Date
                  </label>

                  <input
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={dateForm.startDate}
                    onChange={(e) =>
                      setDateForm((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    End Date
                  </label>

                  <input
                    type="date"
                    min={dateForm.startDate}
                    value={dateForm.endDate}
                    onChange={(e) =>
                      setDateForm((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetDateForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleAddDateException}
                  disabled={!isDateFormValid}
                  className="bg-[#1dc465] text-white hover:bg-[#1dc465]/90"
                >
                  Add{" "}
                  {activeTab === "vacations"
                    ? "Vacation"
                    : activeTab === "blackouts"
                      ? "Blackout"
                      : "Holiday"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* One-Time Extra Availability */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="mb-4 font-medium text-white">
            One-Time Extra Availability
          </h3>

          {exceptions.overrides.length === 0 ? (
            <div className="mb-3 rounded border border-dashed border-white/10 py-4 text-center text-xs">
              No overrides configured.
            </div>
          ) : (
            <div className="space-y-2">
              {exceptions.overrides.map((override) => (
                <div
                  key={override.id}
                  className="flex items-center justify-between rounded border border-[#1dc465]/20 bg-[#1dc465]/10 p-3"
                >
                  <span className="text-sm text-[#1dc465]">
                    {override.date} • {override.startTime} - {override.endTime}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteItem("overrides", override.id)}
                    className="text-[#8b9ab0] transition-colors hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Override Form */}
          {showOverrideForm && (
            <div className="mt-4 rounded-lg border border-[#1dc465]/20 bg-[#1dc465]/5 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {/* Date */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    Date
                  </label>

                  <input
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={overrideForm.date}
                    onChange={(e) =>
                      setOverrideForm((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={overrideForm.startTime}
                    onChange={(e) =>
                      setOverrideForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="mb-1 block text-xs text-[#8b9ab0]">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={overrideForm.endTime}
                    onChange={(e) =>
                      setOverrideForm((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-white/10 bg-[#0d1a27] px-3 py-2 text-sm text-white outline-none focus:border-[#1dc465]"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetOverrideForm();
                    setShowOverrideForm(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleAddOverride}
                  disabled={!isOverrideFormValid}
                  className="bg-[#1dc465] text-white hover:bg-[#1dc465]/90"
                >
                  Add Override
                </Button>
              </div>
            </div>
          )}

          {!showOverrideForm && (
            <button
              type="button"
              onClick={() => setShowOverrideForm(true)}
              className="mt-3 flex items-center gap-1 text-sm text-[#1dc465] hover:underline"
            >
              <Plus size={14} />
              Add Override
            </button>
          )}

          <Button
            type="submit"
            onClick={() => {
              console.log(`Clicked!!`);
              generateSlots();
            }}
            className="mt-4 w-full text-lg font-semibold"
          >
            Generate Slots
          </Button>
        </div>
      </div>

      {disabled && (
        <LockedOverlay
          disabled={disabled}
          title="Exceptions & Overrides Locked"
          description="Configure your slot and booking rules first to manage exceptions and overrides."
        />
      )}
    </div>
  );
};
