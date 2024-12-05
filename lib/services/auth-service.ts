import { z } from "zod";
import { RestaurantSignupFormSchema } from "@/lib/zod/forms/signup";

export async function signupRestaurant(
  data: z.infer<typeof RestaurantSignupFormSchema>
) {
  console.log("Signing up restaurant", data);
  return {
    success: true,
    data: {
      id: "123",
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  };
}
