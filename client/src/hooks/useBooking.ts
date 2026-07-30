import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingSchema,
  type BookingFormValues,
} from "@/schemas/patient/booking.schema";
import { getAllDepartments } from "@/services/common.service";

export const useBooking = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      departmentId: "",
      doctorId: "",
      reason: "",
      date: "",
      time: "",
      notes: "",
      latitude: null,
      longitude: null,
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoadingDepartments(true);
      try {
        const res = await getAllDepartments();
        if (res.success !== false) {
          setDepartments(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setIsLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, []);

  return {
    form,
    departments,
    isLoadingDepartments,
  };
};
