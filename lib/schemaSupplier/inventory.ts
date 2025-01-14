import z from "zod";

// Base schemas
export const StoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  businessSectionName: z.string().optional(),
  description: z.string(),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  isActive: z.boolean().optional().default(true),
});

export const StoreCreateSchema = z.object({
  name: z.string(),
  location: z.string(),
  businessSectionName: z.string().optional(),
  description: z.string(),
  image: z.instanceof(File).optional(),
});

// Stock Item Schemas
export const StockItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  store: z.string(),
  image: z.instanceof(File).optional(),
  expirationDate: z
    .object({
      month: z.number(),
      year: z.number(),
    })
    .optional(),
  expiryDate: z
    .string()
    .refine((val) => val && val.length > 0, "Expiry date is required")
    .refine(
      (val) => /^\d{2}\/\d{4}$/.test(val),
      "Invalid date format. Use MM/YYYY"
    )
    .refine((val) => {
      const [month, year] = val.split("/").map(Number);
      if (month < 1 || month > 12) return false;
      const currentDate = new Date();
      const inputDate = new Date(year, month - 1);
      return inputDate > currentDate;
    }, "Invalid expiry date. Must be a future date with valid month (1-12)"),
  measuringUnit: z.string(),
  lowStockThreshold: z.number(),
  category: z.string(),
  purchasePrice: z.number(),
  quantity: z.number(),
  stockType: z.string(),
  isActive: z.boolean().default(true),
  deactivatedAt: z.string().optional(),
  lastKnownQuantity: z.number().optional(),
  deactivationReason: z.string().optional(),
});

export const StockItemCreateSchema = z.object({
  name: z
    .string()
    .refine((val) => val && val.length > 0, "Stock item name is required"),
  store: z.string(),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG and WebP images are supported"
    ),
  expiryDate: z
    .string()
    .refine((val) => val && val.length > 0, "Expiry date is required")
    .refine(
      (val) => /^\d{2}\/\d{4}$/.test(val),
      "Invalid date format. Use MM/YYYY"
    )
    .refine((val) => {
      const [month, year] = val.split("/").map(Number);
      if (month < 1 || month > 12) return false;
      const currentDate = new Date();
      const inputDate = new Date(year, month - 1);
      return inputDate > currentDate;
    }, "Invalid expiry date. Must be a future date with valid month (1-12)"),
  measuringUnit: z.string(),
  category: z.string(),
  stockType: z.string(),
  lowStockThreshold: z
    .number()
    .refine(
      (val) => val >= 0,
      "Low stock threshold must be greater than or equal to 0"
    ),
  purchasePrice: z
    .number()
    .refine(
      (val) => val >= 0,
      "Purchase price must be greater than or equal to 0"
    ),
  quantity: z
    .number()
    .refine((val) => val >= 0, "Quantity must be greater than or equal to 0"),
});

export const StockItemUpdateSchema = z.object({
  name: z
    .string()
    .refine((val) => val && val.length > 0, "Stock item name is required")
    .optional(),
  store: z.string().optional(),
  lowStockThreshold: z
    .number()
    .refine(
      (val) => val >= 0,
      "Low stock threshold must be greater than or equal to 0"
    )
    .optional(),
  purchasePrice: z
    .number()
    .refine(
      (val) => val >= 0,
      "Purchase price must be greater than or equal to 0"
    )
    .optional(),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  expirationDate: z
    .object({
      month: z.number(),
      year: z.number(),
    })
    .optional(),
  expiryDate: z
    .string()
    .refine((val) => val && val.length > 0, "Expiry date is required")
    .refine(
      (val) => /^\d{2}\/\d{4}$/.test(val),
      "Invalid date format. Use MM/YYYY"
    )
    .refine((val) => {
      const [month, year] = val.split("/").map(Number);
      if (month < 1 || month > 12) return false;
      const currentDate = new Date();
      const inputDate = new Date(year, month - 1);
      return inputDate > currentDate;
    }, "Invalid expiry date. Must be a future date with valid month (1-12)")
    .optional(),
});

// Types
export type Store = z.infer<typeof StoreSchema>;
export type StoreCreate = z.infer<typeof StoreCreateSchema>;
export type StockItem = Omit<z.infer<typeof StockItemSchema>, "image"> & {
  image?: string;
};
export type StockItemCreate = z.infer<typeof StockItemCreateSchema>;
export type StockItemUpdate = z.infer<typeof StockItemUpdateSchema>;

// Helper type to ensure type safety when creating a new StockItem
export type StockItemWithMetadata = {
  createdAt: string;
  isActive: boolean;
  id: string;
};
