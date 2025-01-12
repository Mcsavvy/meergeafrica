import * as z from "zod";

export const AddOnFormSchema = z.object({
  name: z.string().min(2, "Addon name should be at least 2 characters long"),
  price: z.coerce.number().positive("Addon price should be a positive number"),
  image: z.optional(z.instanceof(File)),
});

export const PairedItemFormSchema = z.object({
  name: z.string().min(2, "Item name should be at least 2 characters long"),
  price: z.coerce.number().positive("Item price should be a positive number"),
  description: z.string().optional(),
  image: z.optional(z.instanceof(File)),
});

export const MenuItemFormSchema = z.object({
  name: z.string(),
  price: z.number(),
  addOns: z.array(z.string()),
  pairedItems: z.array(z.string()),
  portions: z.coerce.number().optional(),
  size: z.object({
    amount: z.number(),
    unit: z.enum(["kg", "g"]),
  }),
  ingredients: z.string(),
  status: z.enum(["available", "unlisted"]),
  category: z.string(),
  image: z.optional(z.union([z.string(), z.instanceof(File)])),
  readyTime: z.object({
    hours: z.number().min(0).max(23),
    minutes: z.number().min(0).max(59),
  }),
});
