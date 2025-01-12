"use client";
import { useZodForm } from "@/lib/hooks/form";
import { RestaurantSignupFormSchema } from "@/lib/zod/forms/signup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone";
import { PasswordInput } from "@/components/ui/password";
import { signupRestaurant } from "@/lib/services/auth-service";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

export function RestaurantSignupForm() {
  const form = useZodForm({
    schema: RestaurantSignupFormSchema,
  });
  const handleSubmit = form.handleSubmit(signupRestaurant);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="firstName">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="lastName">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required" htmlFor="email">
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required" htmlFor="phoneNumber">
                Phone Number
              </FormLabel>
              <FormControl>
                <PhoneInput placeholder="Enter Your Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required" htmlFor="password">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Create your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="items-top flex space-x-2 space-y-0">
          <Checkbox id="terms" className="data-[state=checked]:bg-primary" />
          <FormLabel className="text-xs text-slate-700" htmlFor="terms">
            By clicking, you accept our Primary Services Agreement, User Terms
            of Service, and Merge Africa Supplemental Terms. For more details,
            please review our
            <a href="#" className="text-secondary underline mx-1">
              Primary Policy
            </a>
            and
            <a href="#" className="text-secondary underline ml-1">
              Terms and Conditions
            </a>
          </FormLabel>
        </FormItem>
        <Button type="submit" className="w-full" asChild>
          <Link href="/restaurant/email-verification">Create Account</Link>
        </Button>
      </form>
    </Form>
  );
}
