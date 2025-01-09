import z from "zod";

// Base schemas
export const StoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  businessSectionName: z.string().optional(),
  description: z.string(),
  image: z.instanceof(File).optional(),
});

export const StoreCreateSchema = z.object({
  name: z.string(),
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
  expirationDate: z.object({
    month: z.number(),
    year: z.number(),
  }),
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
  name: z.string().min(1, "Stock item name is required"),
  store: z.string(),
  image: z.instanceof(File).optional()
    .refine(
      (file) => !file || (file.size <= 5 * 1024 * 1024), 
      "Image must be less than 5MB"
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      "Only JPEG, PNG and WebP images are supported"
    ),
  expiryDate: z.string()
    .regex(/^\d{2}\/\d{4}$/, "Invalid date format. Use MM/YYYY")
    .refine((val) => {
      const [month, year] = val.split('/').map(Number);
      if (month < 1 || month > 12) return false;
      const currentDate = new Date();
      const inputDate = new Date(year, month - 1);
      return inputDate > currentDate;
    }, "Invalid expiry date. Must be a future date with valid month (1-12)"),
  measuringUnit: z.string().min(1, "Measuring unit is required"),
  lowStockThreshold: z.number()
    .min(0, "Low stock threshold must be 0 or greater")
    .max(1000000, "Low stock threshold must be less than 1,000,000"),
  category: z.string().min(1, "Category is required"),
  purchasePrice: z.number()
    .min(0, "Price must be 0 or greater")
    .max(1000000000, "Price must be less than 1,000,000,000"),
  quantity: z.number()
    .min(1, "Quantity must be at least 1")
    .max(1000000, "Quantity must be less than 1,000,000"),
  stockType: z.string().min(1, "Stock type is required"),
});

export const StockItemUpdateSchema = z.object({
  quantity: z.number().min(0, "Quantity must be greater than or equal to 0"),
  lowStockThreshold: z.number().min(0, "Low stock threshold must be greater than or equal to 0"),
  purchasePrice: z.number().min(0, "Purchase price must be greater than or equal to 0"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});

// Types
export type Store = Omit<z.infer<typeof StoreSchema>, "image"> & {
  image?: string;
};

export type StoreCreate = z.infer<typeof StoreCreateSchema>;

export type StockItem = Omit<z.infer<typeof StockItemSchema>, "image"> & {
  image?: string;
};

export type StockItemCreate = z.infer<typeof StockItemCreateSchema>;

export type StockItemUpdate = z.infer<typeof StockItemUpdateSchema>;
