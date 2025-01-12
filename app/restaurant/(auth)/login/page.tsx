"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { PasswordInput } from "@/components/ui/password";
import { useZodForm } from "@/lib/hooks/form";
import { LoginSchema } from "@/lib/schema/authentication";

const LoginForm = () => {
  const router = useRouter();
  const form = useZodForm({
    schema: LoginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Handle login logic here
    console.log(data);
    router.push("/restaurant/dashboard");
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
        <h1 className="text-2xl font-semibold mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
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
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="text-secondary text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full text-white">
            Sign In
          </Button>
        </form>
      </Form>

      {/* Sign Up Option */}
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Don&apos;t have an account? </span>
        <Link href="/auth/signup" className="text-secondary hover:underline">
          Sign up
        </Link>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t"></div>
        <span className="text-gray-500">or</span>
        <div className="flex-1 border-t"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button type="button" variant="outline" className="flex-1" size="lg">
          <Image
            src="/assets/svgs/google.svg"
            alt="Google logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </Button>
        <Button type="button" variant="outline" className="flex-1" size="lg">
          <Image
            src="/assets/svgs/facebook.svg"
            alt="Facebook logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Facebook
        </Button>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 mt-6">
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

export default LoginForm;
