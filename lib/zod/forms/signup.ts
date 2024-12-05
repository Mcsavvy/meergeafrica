import * as z from 'zod';

export const RestaurantSignupFormSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
  password: z.string().min(8).max(255),
});