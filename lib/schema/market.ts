import z from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.instanceof(File).optional(),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z
    .array(
      z.object({
        id: z.string(),
        userId: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string(),
        verified: z.boolean(),
        date: z.date(),
      })
    )
    .optional(),
  quantity: z.number().min(0),
  manufacturerName: z.string(),
});

export const ProductCreateSchema = ProductSchema.omit({
  id: true,
  rating: true,
  reviews: true,
});

export const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number(),
});

export const OrderSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  subtotal: z.number(),
  delivery: z.number(),
  discount: z.number(),
  total: z.number(),
  customerName: z.string(),
  customerAddress: z.string(),
  customerPhone: z.string(),
  paymentMethod: z.enum(["online", "delivery"]),
  promoCode: z.string().optional(),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  createdAt: z.date(),
});

export type Product = Omit<z.infer<typeof ProductSchema>, "image"> & {
  image?: string;
};
export type CartItem = z.infer<typeof CartItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
