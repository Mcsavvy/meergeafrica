import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RestaurantSignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Meerge Africa",
  description: "Signup to create your restaurant",
};

const SignUpForm = () => {
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
        <h1 className="text-2xl font-bold mb-2">Let&apos;s get you started</h1>
        <p className="text-gray-600 text-center">
          Enter your credentials to get started
        </p>
      </div>
      {/* Form */}
      <RestaurantSignupForm />
      {/* Signin Options */}
      <div>
        <div className="text-left text-xs my-3">
          Already have an account?{" "}
          <Link href="#" className="text-secondary hover:underline">
            Sign in
          </Link>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t"></div>
          <span className="text-gray-500">or</span>
          <div className="flex-1 border-t"></div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button
            type="button"
            variant={"outline"}
            className="flex-1"
            size={"lg"}
          >
            <Image
              src="/assets/svgs/facebook.svg"
              alt="Facebook logo"
              width={20}
              height={20}
            />
            Sign in with Facebook
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="flex-1"
            size={"lg"}
          >
            <Image
              src="/assets/svgs/google.svg"
              alt="Google logo"
              width={20}
              height={20}
            />
            Sign in with Google
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-wrap place-content-center gap-4 text-sm text-gray-600 mt-6 text-nowrap">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Contact Us
        </a>
        <div className="relative group">
          <button
            type="button"
            className="hover:underline flex items-center gap-1"
          >
            Change Region
            <span className="inline-block ml-1">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
