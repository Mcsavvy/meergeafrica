"use client";

import { SupplierRegisterSchema } from "@/types/supplier-register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import FooterForm from "./form-footer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Meerge Africa",
  description: "Register as a Supplier",
};

export const thirdStepSchema = z.object({
  businessaccountNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Business number must be 10 digits"),
  businessAccountName: z.string().min(2).max(255),
  cacRegistrationNumber: z.string().min(2).max(255),
  cacRegistrationDocument: z.string().optional(),
  foodLicense: z.string().optional(),
});

interface StepThreeProps {
  onBack: () => void;
  handleSubmit: (values: z.infer<typeof SupplierRegisterSchema>) => void;
  formData: z.infer<typeof SupplierRegisterSchema>;
}

const StepThree = ({ onBack, handleSubmit, formData }: StepThreeProps) => {
  const form = useForm<z.infer<typeof SupplierRegisterSchema>>({
    resolver: zodResolver(SupplierRegisterSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: z.infer<typeof SupplierRegisterSchema>) => {
    handleSubmit(values);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 group"
        >
          <div>
            <FormField
              control={form.control}
              name="businessaccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="required"
                    htmlFor="businessaccountNumber"
                  >
                    Account Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder=" Your Busniness Account Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.businessaccountNumber?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessAccountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required" htmlFor="businessAccountName">
                    Account Name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder=" Account Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="cacRegistrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="required"
                    htmlFor="cacRegistrationNumber"
                  >
                    CAC registration number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your CAC registration number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cacRegistrationDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="required"
                    htmlFor="cacRegistrationDocument"
                  >
                    CAC document upload
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Upload CAC registration document"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foodLicense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required" htmlFor="foodLicense">
                    Food business premisses license(Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Upload your food  document"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button onClick={onBack} variant="secondary">
              Back
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </div>

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

export default StepThree;
