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

export async function verifyPassword(
  password: string
): Promise<{ success: boolean }> {
  console.log("Verifying password", password);
  const acceptedPasswords = [
    "password",
    "password123",
    "123456",
    "password1234",
  ];
  const promise = new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      if (acceptedPasswords.includes(password)) {
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 3000);
  });
  return promise;
}
