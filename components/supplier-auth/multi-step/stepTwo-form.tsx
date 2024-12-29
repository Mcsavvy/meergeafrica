"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone";
import logo from "@/public/images/logo.png";
import Image from "next/image";

// import Link from "next/link";

export const Step2Schema = z.object({
  businessName: z.string().min(2).max(255),
  businessNumber: z.string().regex(/^[0-9]{10}$/),
  businessemail: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  businessAddress: z.string().min(2).max(255),
  supplierCategory: z.string().min(2).max(255),
  // businessaccountNumber: z.string().min(2).max(255),
  // businessAccountName: z.string().min(2).max(255),
  // cacRegistrationNumber: z.string().min(2).max(255),
  // cacRegistrationDocument: z.string().optional(),
  // foodLicense: z.string().optional(),
});

interface StepTwoProps {
  onNext: (data: z.infer<typeof Step2Schema>) => void;
  onBack: () => void;
}

const StepTwo = ({ onNext, onBack }: StepTwoProps) => {
  const form = useForm<z.infer<typeof Step2Schema>>({
    resolver: zodResolver(Step2Schema),
  });
  const onSubmit = (values: z.infer<typeof Step2Schema>) => {
    onNext(values);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <div className="flex justify-center flex-col">
        <div className="flex items-center gap-3 justify-center">
          <Image
            src={logo}
            alt="Logo Image"
            width={70}
            height={70}
            className="object-contain"
          />
          <span className="text-primary text-3xl font-semibold text-[40px]">
            Meerge Africa
          </span>
        </div>
        <div className="text-center text-3xl text-[30px] my-2">
          {"Almost there!"}
        </div>
        <div className="text-center mb-4">
          Complete your business details to get started right away.
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 group"
        >
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="businessName">
                  Business information
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Kadd Agro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="businessNumber">
                  Enter your phone number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter Your Business Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessemail"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="businessemail">
                  Enter your Email address
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Business Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="businessAddress">
                  Enter your Business Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="1 Kadd Agro close"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supplierCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="supplierCategory">
                  Supplier Category
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category Section" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Glory">Glory</SelectItem>
                  </SelectContent>
                </Select>

                {/* <Input type="text" placeholder="Kadd Agro" {...field} /> */}

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button onClick={onBack} variant="secondary">
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>

          {/* <Button type="submit" className="w-full">
            Continue
          </Button> */}
        </form>
      </Form>
    </div>
  );
};

export default StepTwo;
