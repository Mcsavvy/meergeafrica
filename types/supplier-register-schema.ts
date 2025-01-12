import * as z from "zod";

export const SupplierRegisterSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
  password: z.string().min(8).max(255),
  businessName: z.string().min(2).max(255),
  businessNumber: z.string().min(10).max(15),
  businessemail: z.string().email(),
  businessAddress: z.string().min(2).max(255),
  supplierCategory: z.string().min(2).max(255),
  businessaccountNumber: z.string().min(2).max(255),
  businessAccountName: z.string().min(2).max(255),
  cacRegistrationNumber: z.string().min(2).max(255),
  cacRegistrationDocument: z.string().optional(),
  foodLicense: z.string().optional(),
});
