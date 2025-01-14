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
import StoreSuccessMessage from "./storeSuccessMessage";

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateStoreModal({ isOpen, onClose }: CreateStoreModalProps) {
  const { createStore, stores } = useInventoryStore();
  const [formData, setFormData] = useState<{
    name: string;
    image?: File;
    location: string;
    businessSectionName: string;
    description: string;
  }>({
    name: "",
    location: "",
    businessSectionName: "",
    description: "",
  });

  const [errors, setErrors] = useState<{
    name?: boolean | string;
    location?: boolean | string;
    image?: boolean | string;
  }>({});

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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
      location: !formData.location.trim() ? "Store location is required" : false,
      image: !formData.image ? "Store image is required" : false,
    };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createStore(formData);
        setShowSuccess(true);
      } catch (error) {
        console.error("Failed to create store:", error);
      }
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setFormData({
      name: "",
      location: "",
      businessSectionName: "",
      description: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        {showSuccess ? (
          <StoreSuccessMessage onBack={handleClose} />
        ) : (
          <>
            <DialogHeader className="px-8 pt-6 pb-0">
              <DialogTitle className="text-xl font-medium">Create Store</DialogTitle>
            </DialogHeader>

            <div className="px-8 py-6 space-y-8">
              <div className="grid grid-cols-[200px,1fr] gap-6 items-start">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Store Name <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-[13px] text-gray-500 mt-1">appears on invoice, invoice</p>
                </div>
                <div>
                  <Input
                    id="name"
                    placeholder="appears on invoice, invoice"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`h-11 ${errors.name ? "border-red-500" : ""}`}
                    required
                  />
                  {typeof errors.name === "string" && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[200px,1fr] gap-6 items-start">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">
                    Store Location <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-[13px] text-gray-500 mt-1">enter the address of your store</p>
                </div>
                <div>
                  <Input
                    id="location"
                    placeholder="enter the address of your store"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className={`h-11 ${errors.location ? "border-red-500" : ""}`}
                    required
                  />
                  {typeof errors.location === "string" && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[200px,1fr] gap-6 items-start">
                <div>
                  <Label htmlFor="image" className="text-sm font-medium">
                    Store Image <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-[13px] text-gray-500 mt-1">choose or personalise your store avatar</p>
                </div>
                <div>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    placeholder="choose...jpg, Gif, Png 1MB Max"
                    className={`h-11 ${errors.image ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">Store image is required</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[200px,1fr] gap-6 items-start">
                <div>
                  <Label htmlFor="businessSection" className="text-sm font-medium">
                    Business Section Name
                  </Label>
                  <p className="text-[13px] text-gray-500 mt-1">write a business section name</p>
                </div>
                <Input
                  id="businessSection"
                  placeholder="optional"
                  value={formData.businessSectionName}
                  onChange={(e) => handleInputChange("businessSectionName", e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-[200px,1fr] gap-6 items-start">
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Store Description
                  </Label>
                  <p className="text-[13px] text-gray-500 mt-1">enter stock type</p>
                </div>
                <Textarea
                  id="description"
                  placeholder="optional"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-8 py-4 bg-gray-50 border-t border-gray-100">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="h-11 px-6"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-[#0E2254] hover:bg-[#0E2254]/90 text-white h-11 px-6"
              >
                Create
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
