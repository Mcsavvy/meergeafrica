"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Successful</h2>
            <p className="text-gray-600 mb-6 text-center">
              You have Deactivated this stock item successfully
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-[#0A1F5C] text-white hover:bg-[#0A1F5C]/90"
            >
              Back to Stocks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
