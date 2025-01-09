"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";

const AccountSecurityPage = () => {
  return (
    <div className="space-y-6 bg-white rounded py-6 px-6 h-full">
      <div>
        <h1 className="text-2xl font-semibold">Account & Security</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and security information
        </p>
      </div>

      <div className="space-y-6">
        {/* Custom Link Section */}
        <div className="p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Custom Link</h2>
              <p className="text-sm text-gray-500">
                Create a unique link to share your business offerings with your
                customers
              </p>
            </div>
            <Button variant="ghost" className="text-secondary">
              Edit
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Password Section */}
        <div className="p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Password</h2>
              <p className="text-sm text-gray-500">
                Set a unique password to protect your account
              </p>
            </div>
            <Button variant="ghost" className="text-secondary">
              Change Password
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Two-Step Verification */}
        <div className="p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Two-Step Verification</h2>
              <p className="text-sm text-gray-500">
                We will use this to prevent unauthorized access to your account
              </p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Deactivate Account */}
        <div className="p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Deactivate Account</h2>
              <p className="text-sm text-gray-500">
                This will shut down your account. Your account will be
                reactivated when you sign in again
              </p>
            </div>
            <Button variant="ghost" className="text-secondary">
              Deactivate Account
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityPage;
