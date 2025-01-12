import { z } from "zod";
import { SupplierRegisterFormSchema } from "@/lib/zod/forms/register-supplier";

export async function registerSupplier(
  data: z.infer<typeof SupplierRegisterFormSchema>
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
