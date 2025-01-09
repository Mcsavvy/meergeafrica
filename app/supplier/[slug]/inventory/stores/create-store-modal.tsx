"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateStoreModal({ isOpen, onClose }: CreateStoreModalProps) {
  const { createStore, stores } = useInventoryStore();
  const [formData, setFormData] = useState<{
    name: string;
    image?: File;
    businessSectionName: string;
    description: string;
  }>({
    name: "",
    businessSectionName: "",
    description: "",
  });

  const [errors, setErrors] = useState<{
    name?: boolean | string;
    image?: boolean;
  }>({});

  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleInputChange = (field: string, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Check for duplicate store name when the name field changes
    if (field === "name" && typeof value === "string") {
      const isDuplicate = stores.some(
        (store) => store.name.toLowerCase() === value.toLowerCase()
      );
      if (isDuplicate) {
        setErrors((prev) => ({
          ...prev,
          name: "A store with this name already exists",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          name: false,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? "Store name is required" : false,
      image: !formData.image,
    };

    // Check for duplicate store name
    const isDuplicate = stores.some(
      (store) => store.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (isDuplicate) {
      newErrors.name = "A store with this name already exists";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("image", e.target.files[0]);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
          handleInputChange("image", file);
        }
        stream.getTracks().forEach((track) => track.stop());
      }, "image/jpeg");
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Failed to access camera. Please ensure camera permissions are granted.");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createStore(formData);
      onClose();
    } catch (error) {
      console.error("Failed to create store:", error);
      alert("Failed to create store. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Create Store</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          <div className="space-y-5">
            {/* Store Name */}
            <div className="grid grid-cols-[180px,1fr] gap-8 items-center">
              <Label htmlFor="storeName" className="text-sm text-gray-600">
                Store Name <span className="text-red-500">*</span>
              </Label>
              <div>
                <Input
                  id="storeName"
                  placeholder="appears on invoice, invoice"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`h-11 rounded-lg ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {typeof errors.name === 'string' ? errors.name : "Store name is required"}
                  </p>
                )}
              </div>
            </div>

            {/* Store Image */}
            <div className="grid grid-cols-[180px,1fr] gap-8 items-center">
              <Label htmlFor="storeImage" className="text-sm text-gray-600">
                Store Image <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowImageOptions(!showImageOptions)}
                  className={`w-full flex items-center justify-between h-11 px-3 rounded-lg border ${
                    errors.image ? "border-red-500" : "border-gray-200"
                  } bg-white hover:bg-gray-50 transition-colors`}
                >
                  <span className={`${errors.image ? "text-red-500" : "text-gray-500"}`}>
                    {formData.image ? formData.image.name : "choose...jpg, Gif, Png 1MB Max"}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${showImageOptions ? "rotate-180" : ""} ${
                      errors.image ? "text-red-500" : "text-gray-500"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">
                    Store image is required
                  </p>
                )}
                {showImageOptions && (
                  <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <Image
                          src="/assets/svgs/image-plus.svg"
                          alt="Upload"
                          width={20}
                          height={20}
                        />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          id="storeImage"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleCameraCapture}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z" fill="currentColor"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17Z" fill="currentColor"/>
                        </svg>
                        <span>Take Photo</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Section Name */}
            <div className="grid grid-cols-[180px,1fr] gap-8 items-center">
              <Label htmlFor="businessSection" className="text-sm text-gray-600">
                Business Section Name
              </Label>
              <div>
                <Input
                  id="businessSection"
                  placeholder="write a business section name"
                  value={formData.businessSectionName}
                  onChange={(e) => handleInputChange("businessSectionName", e.target.value)}
                  className="h-11 rounded-lg border-gray-200"
                />
              </div>
            </div>

            {/* Store Description */}
            <div className="grid grid-cols-[180px,1fr] gap-8 items-start">
              <Label htmlFor="storeDescription" className="text-sm text-gray-600 pt-3">
                Store Description
              </Label>
              <div>
                <Textarea
                  id="storeDescription"
                  placeholder="enter stock type"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[100px] rounded-lg resize-none border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 px-5 rounded-lg"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-11 px-5 rounded-lg bg-[#18204A] hover:bg-[#18204A]/90"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
