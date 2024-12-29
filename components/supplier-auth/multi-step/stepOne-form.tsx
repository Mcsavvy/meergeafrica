"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { PhoneInput } from "@/components/ui/phone";
import { PasswordInput } from "@/components/ui/password";

import { Checkbox } from "../../ui/checkbox";

import FooterForm from "./form-footer";

import HeaderForm from "./form-header";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Meerge Africa",
  description: "Register as a Supplier",
};

type StepOneProps = {
  onNext: (values: z.infer<typeof firstStepSchema>) => void;
};

export const firstStepSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/),
  password: z.string().min(8).max(255),
});

const StepOne = ({ onNext }: StepOneProps) => {
  const form = useForm<z.infer<typeof firstStepSchema>>({
    resolver: zodResolver(firstStepSchema),
  });
  const onSubmit = (values: z.infer<typeof firstStepSchema>) => {
    onNext(values);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <HeaderForm />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 group"
        >
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="phoneNumber">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter Your Phone Number"
                    {...field}
                    name="phoneNumber"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phoneNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />

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
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
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
                  <PasswordInput
                    placeholder="Create your password"
                    {...field}
                  />
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

          <Button type="submit" className="w-full">
            Continue
          </Button>

          <div className="text-left text-xs my-3">
            Already have an account?{" "}
            <Link href="#" className="text-secondary hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </Form>

      <FooterForm />
    </div>
  );
};

export default StepOne;
