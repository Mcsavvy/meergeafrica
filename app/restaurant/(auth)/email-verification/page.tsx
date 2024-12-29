"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const EmailVerificationPage = () => {
  const email = "daniel@email.com"; // This would typically come from your auth state

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
          src="/assets/svgs/new-email.svg"
          alt="Email"
          width={64}
          height={64}
        />

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-gray-600">We just sent an email to {email}</p>
          <p className="text-gray-600">
            Click the link in the email to verify your account
          </p>
        </div>

        {/* Spam Notice */}
        <p className="text-gray-500 text-sm">
          You might need to check your spam folder
        </p>

        {/* Resend Button */}
        <div className="space-y-4 w-full">
          <div className="text-sm text-gray-600">
            Didn&apos;t get the email? Just click below
          </div>
          <Button variant="default" className="w-full !mb-4">
            Resend Email
          </Button>
        </div>

        {/* Quick Access Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open("https://gmail.com", "_blank")}
          >
            <Image
              src="/assets/svgs/gmail.svg"
              alt="Gmail"
              width={20}
              height={20}
            />
            Open Gmail
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open("https://outlook.com", "_blank")}
          >
            <Image
              src="/assets/svgs/outlook.svg"
              alt="Outlook"
              width={20}
              height={20}
            />
            Open Outlook
          </Button>
        </div>

        {/* Footer */}
        <div className="flex gap-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
