"use client";
import React, { useState } from "react";
import { useZodForm } from "@/lib/hooks/form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import FileDropzone from "@/components/ui/file-dropzone";
import {
  BasicInfoSchema,
  RegisteredBusinessSchema,
  UnregisteredBusinessSchema,
} from "@/lib/schema/authentication";

type FormData = {
  basicInfo: z.infer<typeof BasicInfoSchema> | null;
  documents: z.infer<typeof RegisteredBusinessSchema> | null;
};

const OnboardingWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    basicInfo: null,
    documents: null,
  });

  // Forms for each step
  const basicInfoForm = useZodForm({
    schema: BasicInfoSchema,
  });

  const registeredBusinessForm = useZodForm({
    schema: RegisteredBusinessSchema,
  });

  const unregisteredBusinessForm = useZodForm({
    schema: UnregisteredBusinessSchema,
  });

  const handleBasicInfoSubmit = basicInfoForm.handleSubmit((data) => {
    setFormData({ ...formData, basicInfo: data });
    setActiveStep(1);
  });

  const handleDocumentsSubmit = async (
    data: z.infer<typeof RegisteredBusinessSchema>
  ) => {
    setIsLoading(true);
    try {
      // Handle form submission here
      const finalData = {
        ...formData.basicInfo,
        ...data,
      };
      console.log("Final form data:", finalData);
      router.push("/restaurant/demo");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Form {...basicInfoForm}>
            <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
              <FormField
                control={basicInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicInfoForm.control}
                name="business_phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      Business Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicInfoForm.control}
                name="business_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Business Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter business email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicInfoForm.control}
                name="business_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Business Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicInfoForm.control}
                name="business_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      Business Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="cafe">Cafe</SelectItem>
                        <SelectItem value="fastfood">Fast Food</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicInfoForm.control}
                name="business_registration_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      Registration Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select registration status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="registered">Registered</SelectItem>
                        <SelectItem value="unregistered">
                          Unregistered
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="submit">Next</Button>
              </div>
            </form>
          </Form>
        );

      case 1:
        const isRegistered =
          formData.basicInfo?.business_registration_status === "registered";
        const currentForm = isRegistered
          ? registeredBusinessForm
          : unregisteredBusinessForm;
        // @ts-expect-error - It's okay to ignore this error
        const handleSubmit = currentForm.handleSubmit(handleDocumentsSubmit);

        return (
          // @ts-expect-error - It's okay to ignore this error
          <Form
            {...(isRegistered
              ? registeredBusinessForm
              : unregisteredBusinessForm)}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistered && (
                <FormField
                  control={registeredBusinessForm.control}
                  name="business_registration_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">
                        Registration Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter registration number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isRegistered && (
                <FormField
                  control={unregisteredBusinessForm.control}
                  // @ts-expect-error - It's okay to ignore this error
                  name="business_document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">
                        Business Document
                      </FormLabel>
                      <FormControl>
                        <FileDropzone {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                // @ts-expect-error - It's okay to ignore this error
                control={currentForm.control}
                name="premises_license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Premises License</FormLabel>
                    <FormControl>
                      <FileDropzone {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={goBack}>
                  Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader className="animate-spin mr-2" /> : null}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Tell Us About Your Business.</h1>
        <p className="text-lg font-light text-secondary">
          Fill out your business details
        </p>
      </div>

      <div className="">{renderStep()}</div>
    </div>
  );
};

export default OnboardingWizard;
