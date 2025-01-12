"use client";

import { registerSupplier } from "../server/register";

import { useState } from "react";

import { z } from "zod";

import StepOne from "./stepOne-form";
import StepTwo from "./stepTwo-form";
import StepThree from "./stepThree-form";

import { SupplierRegisterSchema } from "@/types/supplier-register-schema";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    businessName: "",
    businessNumber: "",
    businessemail: "",
    businessAddress: "",
    supplierCategory: "",
    businessaccountNumber: "",
    businessAccountName: "",
    cacRegistrationNumber: "",
    cacRegistrationDocument: "",
    foodLicense: "",
  });

  const handleNextStep = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const finalSubmit = async (
    values: z.infer<typeof SupplierRegisterSchema>
  ) => {
    try {
      const finalFormData = { ...formData, ...values };
      const response = await registerSupplier(finalFormData);
      console.log("Supplier registered successfully:", response);
    } catch (error) {
      console.error("Error registering supplier:", error);
    }
  };

  return (
    <div>
      <div>
        {currentStep === 1 && <StepOne onNext={handleNextStep} />}
        {currentStep === 2 && (
          <StepTwo onNext={handleNextStep} onBack={handlePreviousStep} />
        )}
        {currentStep === 3 && (
          <StepThree
            onBack={handlePreviousStep}
            handleSubmit={finalSubmit}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
}
