import z from "zod";

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

export type Store = Omit<z.infer<typeof StoreSchema>, "image"> & {
  image?: string;
};
export type StoreCreate = z.infer<typeof StoreCreateSchema>;

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
});

export const StockItemCreateSchema = z.object({
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
});

export type StockItem = Omit<z.infer<typeof StockItemSchema>, "image"> & {
  image?: string;
};
export type StockItemCreate = z.infer<typeof StockItemCreateSchema>;

export const StockItemUpdateSchema = z.object({
  quantity: z.number().min(0, "Quantity must be greater than or equal to 0"),
  lowStockThreshold: z
    .number()
    .min(0, "Low stock threshold must be greater than or equal to 0"),
  purchasePrice: z
    .number()
    .min(0, "Purchase price must be greater than or equal to 0"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});

export type StockItemUpdate = z.infer<typeof StockItemUpdateSchema>;
