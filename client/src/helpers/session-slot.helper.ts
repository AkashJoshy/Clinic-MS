import type { Session } from "@/types/doctor-clinic";

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};


export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};


export const formatTimeRange = (session: Session) => {
  return `${session.startTime} - ${session.endTime}`;
};

export const getMonday = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();

  // Sunday = 0, Monday = 1
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
};

export const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};