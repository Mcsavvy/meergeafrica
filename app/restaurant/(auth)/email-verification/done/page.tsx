"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const EmailVerificationSuccessPage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-6 mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-3xl font-semibold space-x-1">
              <span className="text-secondary">Meerge</span>
              <span className="text-primary">Africa</span>
            </p>
          </div>
        </div>

        {/* Email Icon */}
        <Image
          src="/assets/email-success.png"
          alt="Email Verification Successful"
          width={280}
          height={250}
        />

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Congratulations</h1>
          <p className="text-gray-600">
            You have successfully verified your email address
          </p>
        </div>

        <Button variant="default" className="w-full !mb-10 !mt-4">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EmailVerificationSuccessPage;
