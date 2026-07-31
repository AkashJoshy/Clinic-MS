import * as z from "zod"

export const departmentSchema = z.object({
    name: z.string().trim().min(3, "Department name must be at least 3 characters long."),
    status: z.enum(["ACTIVE", "INACTIVE"], {
        message: "Please select a department status."
    }),
    mode: z.enum(["ONLINE", "OFFLINE", "BOTH"], {
         message: "Please select a consultation mode.",
    })
})

export const updateDepartmentSchema = departmentSchema.extend({
  id: z.string().min(1, "Department ID is required."),
});