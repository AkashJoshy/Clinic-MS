import { createContext, useContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { BookingFormValues } from "@/schemas/patient/booking.schema";

interface BookingContextType {
  form: UseFormReturn<BookingFormValues>;
  departments: any[];
  isLoadingDepartments: boolean;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export function useBookingContext() {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error("useBookingContext must be used inside BookingProvider");
  return ctx;
}
