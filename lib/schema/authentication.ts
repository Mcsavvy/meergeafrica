import * as z from "zod";

export const InviteAcceptanceSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be valid"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Schema for Step 1
export const BasicInfoSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  business_phone_number: z.string().min(10, "Enter a valid phone number"),
  business_email: z.string().email("Enter a valid email address"),
  business_address: z.string().min(5, "Enter a valid address"),
  business_category: z.string().min(1, "Select a business category"),
  business_registration_status: z.enum(["registered", "unregistered"]),
});

// Schema for Step 2a (Registered Business)
export const RegisteredBusinessSchema = z.object({
  business_registration_number: z
    .string()
    .min(1, "Registration number is required"),
  business_document: z.optional(z.instanceof(File)),
  premises_license: z.optional(z.instanceof(File)),
});

// Schema for Step 2b (Unregistered Business)
export const UnregisteredBusinessSchema = z.object({
  premises_license: z.optional(z.instanceof(File)),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
