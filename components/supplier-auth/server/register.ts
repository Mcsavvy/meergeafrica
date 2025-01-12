"use server";

import axios from "axios";
import { z } from "zod";
import { SupplierRegisterSchema } from "@/types/supplier-register-schema";

export const registerSupplier = async (
  data: z.infer<typeof SupplierRegisterSchema>
) => {
  try {
    const response = await axios.post("/api/suppliers", data);
    return response.data;
  } catch (error) {
    console.error("Error registering supplier:", error);
    throw error;
  }
};
