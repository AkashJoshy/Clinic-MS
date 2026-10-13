import { useState } from "react";
import type { ActiveTab, BreakForm, DateForm, ExceptionsData, ExceptionsProps, OverrideForm } from "@/types/doctor-clinic";
import toast from "react-hot-toast";


export function useExceptions(
  exceptions: ExceptionsData,
  onChange: ExceptionsProps["onChange"],
) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("breaks");

  const [showForm, setShowForm] = useState(false);
  const [showOverrideForm, setShowOverrideForm] = useState(false);

  const [breakForm, setBreakForm] = useState<BreakForm>({
    label: "",
    startTime: "",
    endTime: "",
  });

  const [dateForm, setDateForm] = useState<DateForm>({
    reason: "",
    startDate: "",
    endDate: "",
  });

  const [overrideForm, setOverrideForm] = useState<OverrideForm>({
    date: "",
    startTime: "",
    endTime: "",
  });

  const resetBreakForm = () => {
    setBreakForm({
      label: "",
      startTime: "",
      endTime: "",
    });
  };

  const resetDateForm = () => {
    setDateForm({
      reason: "",
      startDate: "",
      endDate: "",
    });
  };

  const resetOverrideForm = () => {
    setOverrideForm({
      date: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleAddBreak = () => {
    if (!breakForm.label.trim() || !breakForm.startTime || !breakForm.endTime) {
      return;
    }

    const isAlreadyExists = exceptions.breaks.find(
      (br) =>
        br.label === breakForm.label.trim() ||
        br.startTime === breakForm.startTime ||
        br.endTime === breakForm.endTime,
    );

    if (isAlreadyExists) {
      toast.error("Break already exists");
      return;
    }

    onChange({
      ...exceptions,
      breaks: [
        ...exceptions.breaks,
        {
          id: Date.now().toString(),
          label: breakForm.label.trim(),
          startTime: breakForm.startTime,
          endTime: breakForm.endTime,
        },
      ],
    });

    resetBreakForm();
    setShowForm(false);
  };

  const handleAddDateException = () => {
    if (!dateForm.reason.trim() || !dateForm.startDate || !dateForm.endDate) {
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      reason: dateForm.reason.trim(),
      startDate: dateForm.startDate,
      endDate: dateForm.endDate,
    };

    if (activeTab === "vacations") {
      const isAlreadyExists = exceptions.vacations.find(
        (vacation) =>
          vacation.reason === dateForm.reason.trim() ||
          vacation.startDate === dateForm.startDate ||
          vacation.endDate === dateForm.endDate,
      );

      if (isAlreadyExists) {
        toast.error("Vacations already exists");
        return;
      }
      onChange({
        ...exceptions,
        vacations: [...exceptions.vacations, newItem],
      });
    }

    if (activeTab === "blackouts") {
      const isAlreadyExists = exceptions.blackouts.find(
        (blackout) =>
          blackout.reason === dateForm.reason.trim() ||
          blackout.startDate === dateForm.startDate ||
          blackout.endDate === dateForm.endDate,
      );

      if (isAlreadyExists) {
        toast.error("Vacations already exists");
        return;
      }
      onChange({
        ...exceptions,
        blackouts: [...exceptions.blackouts, newItem],
      });
    }

    if (activeTab === "holidays") {
      const isAlreadyExists = exceptions.holidays.find(
        (holiday) =>
          holiday.reason === dateForm.reason.trim() ||
          holiday.startDate === dateForm.startDate ||
          holiday.endDate === dateForm.endDate,
      );

      if (isAlreadyExists) {
        toast.error("Holidays already exists");
        return;
      }
      onChange({
        ...exceptions,
        holidays: [...exceptions.holidays, newItem],
      });
    }

    resetDateForm();
    setShowForm(false);
  };

  const handleAddOverride = () => {
    if (
      !overrideForm.date ||
      !overrideForm.startTime ||
      !overrideForm.endTime
    ) {
      return;
    }

    const isAlreadyExists = exceptions.overrides.find(
      (override) =>
        override.date === overrideForm.date ||
        override.startTime === overrideForm.startTime ||
        override.endTime === overrideForm.endTime,
    );

    if (isAlreadyExists) {
      toast.error("Vacations already exists");
      return;
    }

    onChange({
      ...exceptions,
      overrides: [
        ...exceptions.overrides,
        {
          id: Date.now().toString(),
          date: overrideForm.date,
          startTime: overrideForm.startTime,
          endTime: overrideForm.endTime,
        },
      ],
    });

    resetOverrideForm();
    setShowOverrideForm(false);
  };

  const deleteItem = (key: keyof ExceptionsData, id: string) => {
    onChange({
      ...exceptions,
      [key]: exceptions[key].filter((item) => item.id !== id),
    });
  };

  const handleAddItem = () => {
    setShowForm(true);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);

    setShowForm(false);

    resetBreakForm();
    resetDateForm();
  };

  const isDateFormValid =
    Boolean(dateForm.reason.trim()) &&
    Boolean(dateForm.startDate) &&
    Boolean(dateForm.endDate) &&
    dateForm.endDate >= dateForm.startDate;

  const isBreakFormValid =
    Boolean(breakForm.label.trim()) &&
    Boolean(breakForm.startTime) &&
    Boolean(breakForm.endTime) &&
    breakForm.endTime > breakForm.startTime;

  const isOverrideFormValid =
    Boolean(overrideForm.date) &&
    Boolean(overrideForm.startTime) &&
    Boolean(overrideForm.endTime) &&
    overrideForm.endTime > overrideForm.startTime;

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    showForm,
    setShowForm,
    showOverrideForm,
    setShowOverrideForm,
    breakForm,
    setBreakForm,
    resetBreakForm,
    handleAddBreak,
    isBreakFormValid,
    dateForm,
    setDateForm,
    resetDateForm,
    handleAddDateException,
    isDateFormValid,
    overrideForm,
    setOverrideForm,
    resetOverrideForm,
    handleAddOverride,
    isOverrideFormValid,
    handleAddItem,
    deleteItem,
  };
}
