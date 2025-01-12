"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignOutModal({ isOpen, onClose }: SignOutModalProps) {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/"); // Navigate to home page
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Sign out of Meerge Africa
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-600">
            Are you sure you would like to sign out of your Merge Africa account
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            className="flex-1 rounded-lg py-6 text-base"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-lg bg-[#0E2254] py-6 text-base hover:bg-[#0E2254]/90"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
