import React from "react";
import { Button } from "@/components/ui/button";

const EmailVerificationFailedPage = () => {
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

        {/* Failed Icon */}
        <div className="w-[280px] h-[250px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 300"
            className="w-full h-full"
          >
            {/* Background Elements */}
            <circle cx="200" cy="150" r="120" fill="#FEE2E2" opacity="0.3" />
            <circle cx="200" cy="150" r="90" fill="#FEE2E2" opacity="0.5" />

            {/* Envelope Base */}
            <rect
              x="100"
              y="100"
              width="200"
              height="140"
              rx="8"
              fill="#ffffff"
              stroke="#DC2626"
              stroke-width="3"
            />

            {/* Envelope Flap (broken/error state) */}
            <path
              d="M100 100 L200 170 L300 100"
              fill="none"
              stroke="#DC2626"
              stroke-width="3"
              stroke-dasharray="10,5"
            />

            {/* Error Symbol */}
            <circle cx="200" cy="150" r="30" fill="#DC2626" />
            <path
              d="M185 135 L215 165 M215 135 L185 165"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
            />

            {/* Decorative Elements */}
            <circle cx="120" cy="80" r="5" fill="#DC2626" opacity="0.5" />
            <circle cx="280" cy="220" r="8" fill="#DC2626" opacity="0.5" />
            <circle cx="300" cy="70" r="6" fill="#DC2626" opacity="0.3" />
            <circle cx="100" cy="200" r="7" fill="#DC2626" opacity="0.3" />

            {/* Small Cross Marks */}
            <path
              d="M320 120 L330 130 M330 120 L320 130"
              stroke="#DC2626"
              stroke-width="2"
              opacity="0.5"
            />
            <path
              d="M70 150 L80 160 M80 150 L70 160"
              stroke="#DC2626"
              stroke-width="2"
              opacity="0.5"
            />
            <path
              d="M290 240 L300 250 M300 240 L290 250"
              stroke="#DC2626"
              stroke-width="2"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-red-600">
            Verification Failed
          </h1>
          <p className="text-gray-600">
            The email verification link has expired or is invalid
          </p>
          <p className="text-gray-500 text-sm">
            Please request a new verification link to continue
          </p>
        </div>

        {/* Actions */}
        <div className="w-full space-y-4">
          <Button variant="default" className="w-full">
            Request New Link
          </Button>
          <Button variant="outline" className="w-full">
            Back to Sign In
          </Button>
        </div>

        {/* Help Section */}
        <div className="text-sm text-gray-600">
          <p>
            Need help?{" "}
            <a href="#" className="text-secondary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationFailedPage;
