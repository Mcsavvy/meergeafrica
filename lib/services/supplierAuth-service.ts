import { z } from "zod";
import { SupplierRegisterSchema } from "@/types/supplier-register-schema";

export async function registerSupplier(
  data: z.infer<typeof SupplierRegisterSchema>
) {
  return {
    success: true,
    data: {
      id: "123",
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,

      phoneNumber: data.phoneNumber,
      password: data.password,
      businessName: data.businessName,
      businessNumber: data.businessNumber,
      businessemail: data.businessemail,
      businessAddress: data.businessAddress,
      supplierCategory: data.supplierCategory,
      businessaccountNumber: data.businessaccountNumber,
      businessAccountName: data.businessAccountName,
      cacRegistrationNumber: data.cacRegistrationNumber,
      cacRegistrationDocument: data.cacRegistrationDocument,
      foodLicense: data.foodLicense,
    },
  };
}
