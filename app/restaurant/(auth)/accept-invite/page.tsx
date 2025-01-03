"use client";
import React from "react";
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
import { useZodForm } from "@/lib/hooks/form";
import { InviteAcceptanceSchema } from "@/lib/schema/authentication";
import { useRouter } from "next/navigation";

const InviteAcceptanceForm = () => {
  const form = useZodForm({
    schema: InviteAcceptanceSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const handleSubmit = form.handleSubmit(() => {
    router.push("/restaurant/demo");
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      {/* Logo and Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-3xl font-semibold space-x-1">
            <span className="text-secondary">Meerge</span>
            <span className="text-primary">Africa</span>
          </p>
        </div>
        <h1 className="text-2xl font-semibold mb-2">You were sent an Invite</h1>
        <p className="text-orange-500 text-sm">
          Enter your credentials to accept invite
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium mb-4">
          Employee&apos;s Information
        </h2>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
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
                  <FormLabel className="required">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
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
                  <FormLabel className="required">Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="Enter Phone Number" {...field} />
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
                  <FormLabel className="required">Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-white">
              Accept
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 mt-2">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Contact Us
        </a>
        <div className="relative">
          <button className="hover:underline flex items-center">
            Change Region
            <span className="ml-1">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteAcceptanceForm;
