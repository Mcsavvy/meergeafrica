import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const FormFooter = () => {
  return (
    <div className="px-4 py-6">
      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Sign-In Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center gap-2 flex-1"
          size="lg"
        >
          <Image
            src="/assets/svgs/facebook.svg"
            alt="Facebook logo"
            width={20}
            height={20}
          />
          <span>Sign in with Facebook</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center gap-2 flex-1"
          size="lg"
        >
          <Image
            src="/assets/svgs/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          <span>Sign in with Google</span>
        </Button>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-6">
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

export default FormFooter;
