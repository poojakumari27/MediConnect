import { z } from "zod";

export const doctorFormSchema = z.object({
  specialty: z
    .string()
    .min(1, { message: "Specialty is required" })
    .trim(),

  experience: z
    .number({
      required_error: "Experience is required",
      invalid_type_error: "Experience must be a number",
    })
    .int({ message: "Experience must be an integer" })
    .min(1, { message: "Experience must be at least 1 year" })
    .max(70, { message: "Experience must be less than 70 years" }),

  credentialUrl: z
    .string()
    .min(1, { message: "Credential URL is required" })
    .url({ message: "Please enter a valid URL" }),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
});
