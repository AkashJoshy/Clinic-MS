import { Button } from "@/components/ui/button";
import type { ExceptionsProps } from "@/types/doctor-clinic";
import { Plus, Trash2 } from "lucide-react";
import { NumberBadge } from "../../number-badge.shared";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LockedOverlay } from "./locked-overlay.shared";
import { useExceptions } from "@/hooks/use-exceptions.hook";
import { ExceptionTabs } from "./exception-tabs.shared";

export const Exceptions: React.FC<ExceptionsProps> = ({
  exceptions,
  onChange,
  generateSlots,
  disabled,
  isDark,
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
    setBreakForm,
    setDateForm,
    setOverrideForm,
    setShowForm,
    setShowOverrideForm,
    showForm,
    showOverrideForm,
  } = useExceptions(exceptions, onChange);

  const headingClass = isDark ? "text-white" : "text-slate-900";
  const labelClass = isDark ? "text-[#8b9ab0]" : "text-slate-600";
  const descriptionClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const cardClass = isDark
    ? "bg-[#0d1a27] border-white/10"
    : "bg-white border-slate-200";

  const inputClass = isDark
    ? "bg-[#0d1a27] border-white/10 text-white placeholder:text-gray-600 [color-scheme:dark]"
    : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 [color-scheme:light]";

  const formClass = isDark
    ? "bg-white/5 border-white/10"
    : "bg-slate-50 border-slate-200";

  const emptyClass = isDark
    ? "border-white/10 text-[#8b9ab0]"
    : "border-slate-200 text-slate-500";

  const entryClass = isDark
    ? "bg-white/5 text-white"
    : "bg-slate-50 text-slate-800";

  const tabInactiveClass = isDark
    ? "text-slate-400 hover:border-white/20 hover:text-white"
    : "text-slate-500 hover:border-slate-300 hover:text-slate-900";

  const countInactiveClass = isDark
    ? "border-white/10 bg-white/[0.04] text-white/80 group-hover:border-white/20 group-hover:bg-white/[0.08]"
    : "border-slate-200 bg-slate-100 text-slate-600 group-hover:bg-slate-200";

  const iconButtonClass = isDark
    ? "text-[#8b9ab0] hover:text-red-400"
    : "text-slate-500 hover:text-red-500";

  return (
    <div className="relative">
      <div
        className={`
          rounded-lg border p-6 transition-all duration-300
          ${cardClass}
          ${disabled ? "select-none" : ""}
        `}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="[&_*]:!text-primary [&_*]:!border-primary [&_*]:!bg-primary/10">
              <NumberBadge number={3} />
            </div>

            <h2 className={`ml-2 text-xl font-semibold ${headingClass}`}>
              Exceptions & Overrides
            </h2>
          </div>

          <span
            className={`rounded px-2 py-1 text-xs xsxs:hidden sm:block ${
              isDark
                ? "bg-white/10 text-slate-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Optional
          </span>

          <span
            className={`rounded px-2 py-1 text-xs xsxs:block sm:hidden ${
              isDark
                ? "bg-white/10 text-slate-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Opt.
          </span>
        </div>

        {/* Tabs */}
        <ScrollArea className="mb-5 w-full whitespace-nowrap">
          <div
            className={`mb-4 flex gap-1 overflow-x-auto border-b pb-0 scrollbar-hide ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <ExceptionTabs
              activeTab={activeTab}
              exceptions={exceptions}
              onTabChange={handleTabChange}
              tabInactiveClass={tabInactiveClass}
              countInactiveClass={countInactiveClass}
            />
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="min-h-[120px]">
          {exceptions[activeTab].length === 0 ? (
            <div
              className={`rounded border border-dashed py-6 text-center text-sm ${emptyClass}`}
            >
              No {activeTab} configured.
            </div>
          ) : (
            <ScrollArea className="h-40 w-full">
              <div className="space-y-2 pr-3">
                {exceptions[activeTab].map((item: any) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded p-3 ${entryClass}`}
                  >
                    <span className="text-sm">
                      {item.label || item.reason || "Entry"} •{" "}
                      {item.startTime
                        ? `${item.startTime} - ${item.endTime}`
                        : `${item.startDate} to ${item.endDate}`}
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteItem(activeTab, item.id)}
                      className={`transition-colors ${iconButtonClass}`}
                      aria-label="Delete exception"
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
              className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Plus size={14} />
              Add {activeTab.slice(0, -1)}
            </button>
          )}

          {/* Break Form */}
          {activeTab === "breaks" && showForm && (
            <div className={`mt-4 rounded-lg border p-4 ${formClass}`}>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Add Break
                </Button>
              </div>
            </div>
          )}

          {/* Vacation / Blackout / Holiday Form */}
          {activeTab !== "breaks" && showForm && (
            <div className={`mt-4 rounded-lg border p-4 ${formClass}`}>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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
        <div
          className={`mt-8 border-t pt-6 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <h3 className={`mb-4 font-medium ${headingClass}`}>
            One-Time Extra Availability
          </h3>

          {exceptions.overrides.length === 0 ? (
            <div
              className={`mb-3 rounded border border-dashed py-4 text-center text-xs ${emptyClass}`}
            >
              No overrides configured.
            </div>
          ) : (
            <div className="space-y-2">
              {exceptions.overrides.map((override) => (
                <div
                  key={override.id}
                  className="flex items-center justify-between rounded border border-primary/20 bg-primary/10 p-3"
                >
                  <span className="text-sm text-primary">
                    {override.date} • {override.startTime} - {override.endTime}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteItem("overrides", override.id)}
                    className={`transition-colors ${iconButtonClass}`}
                    aria-label="Delete override"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Override Form */}
          {showOverrideForm && (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={`mb-1 block text-xs ${labelClass}`}>
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
                    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary ${inputClass}`}
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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
              className="mt-3 flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Plus size={14} />
              Add Override
            </button>
          )}

          <Button
            type="submit"
            onClick={() => {
              console.log("Clicked!!");
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
          isDark={isDark}
        />
      )}
    </div>
  );
};
