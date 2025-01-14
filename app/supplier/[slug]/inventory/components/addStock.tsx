"use client";

import z from "zod";
import React, { useState, useEffect } from "react";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import { useCurrentStore } from "@/lib/contexts/supplier/inventory-context";
import { StockItemCreateSchema } from "@/lib/schemaSupplier/inventory";
import { useZodForm } from "@/lib/hooks/useZodForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";
import Image from "next/image";

interface CreateStockModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const predefinedCategories = [
  "Grains",
  "Vegetables",
  "Fruits",
  "Meat",
  "Dairy",
  "Beverages",
  "Snacks",
  "Condiments",
  "Spices",
];

const predefinedMeasuringUnits = [
  "Kg",
  "G",
  "L",
  "Ml",
  "Oz",
  "Lb",
  "Cup",
  "Tsp",
  "Lbsp",
  "Piece",
  "Dozen",
];

const CreateStockModal: React.FC<CreateStockModalProps> = ({ isOpen = false, onClose }) => {
  const { createStockItem } = useInventoryStore();
  const currentStore = useCurrentStore();
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useZodForm({
    schema: StockItemCreateSchema,
    defaultValues: {
      name: "",
      store: currentStore.id,
      expiryDate: "",
      measuringUnit: "",
      lowStockThreshold: 0,
      category: "",
      purchasePrice: 0,
      quantity: 0,
      stockType: "",
    },
  });

  useEffect(() => {
    form.setValue("store", currentStore.id);
  }, [currentStore, form]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Image must be less than 5MB");
        }

        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          throw new Error("Only JPEG, PNG and WebP images are supported");
        }

        form.setValue("image", file);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
      form.setValue("image", undefined);
    }
  };

  const validateExpiryDate = (month: string, year: string) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const inputYear = parseInt(year);
    const inputMonth = parseInt(month);
    
    if (inputYear < currentYear) return false;
    if (inputYear === currentYear && inputMonth < currentMonth) return false;
    return true;
  };

  const onSubmit = form.handleSubmit(async (data: z.infer<typeof StockItemCreateSchema>) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Validate image size
      if (data.image && data.image instanceof File && data.image.size > 5 * 1024 * 1024) {
        throw new Error("Image size must be less than 5MB");
      }

      // Validate image type
      if (
        data.image &&
        data.image instanceof File &&
        !['image/jpeg', 'image/png', 'image/webp'].includes(data.image.type)
      ) {
        throw new Error("Only JPEG, PNG and WebP images are supported");
      }

      // Validate expiry date
      const [month, year] = data.expiryDate.split("/");
      if (!validateExpiryDate(month, year)) {
        throw new Error("Expiry date cannot be backdated");
      }

      // Convert expiryDate string to expirationDate object
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      const processedData = {
        ...data,
        expirationDate: {
          month: monthNum,
          year: yearNum
        }
      };

      await createStockItem(processedData);
      form.reset();
      onClose?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create stock item");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader className="flex flex-row items-center justify-between p-0 mb-6">
          <DialogTitle className="text-xl">Add New Stock Item to {currentStore.name}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100 text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Stock Item Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Stock Item Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="write the name of the product" 
                          className="h-12 rounded-lg"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stock Item Image */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Stock Item Image</FormLabel>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowImageOptions(!showImageOptions)}
                          className="w-full flex items-center justify-between h-12 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-500">
                            {field.value ? (field.value as File).name : "upload media"}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showImageOptions ? "rotate-180" : ""}`} />
                        </button>
                        {showImageOptions && (
                          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <div className="p-2 space-y-1">
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
                                  onChange={handleFileChange}
                                  accept="image/*"
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-12 rounded-lg">
                          <SelectValue placeholder="select product category" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedCategories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stock Type */}
                <FormField
                  control={form.control}
                  name="stockType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Stock Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter stock type"
                          className="h-12 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Purchased */}
                <FormField
                  control={form.control}
                  name="purchasePrice"
                  render={({ field: { value, onChange, ...field } }) => {
                    const formatCurrency = (value: number) => {
                      // Format number with thousands separator
                      return new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(value);
                    };

                    const parseCurrency = (value: string) => {
                      // Remove currency symbol, commas and spaces
                      const cleanValue = value.replace(/[₦NGN,\s]/g, '');
                      return cleanValue ? parseFloat(cleanValue) : 0;
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-sm">Price Purchased</FormLabel>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="₦0"
                            className="h-12 rounded-lg pl-4"
                            value={value ? formatCurrency(value) : ''}
                            onChange={(e) => {
                              const rawValue = e.target.value;
                              const numericValue = parseCurrency(rawValue);
                              
                              // Only update if it's a valid number
                              if (!isNaN(numericValue) && numericValue >= 0) {
                                onChange(numericValue);
                              }
                            }}
                            {...field}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="enter the quantity of the product"
                          className="h-12 rounded-lg"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Measuring Unit */}
                <FormField
                  control={form.control}
                  name="measuringUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Measuring Unit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-12 rounded-lg">
                          <SelectValue placeholder="select measuring Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedMeasuringUnits.map((measuringUnit) => (
                            <SelectItem key={measuringUnit} value={measuringUnit.toLowerCase()}>
                              {measuringUnit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expiry Date */}
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => {
                    const isInvalidDate = (value: string) => {
                      if (value && value.includes('/') && value.length === 7) {
                        const [inputMonth, inputYear] = value.split('/');
                        const currentYear = 2025;
                        const currentMonth = 1; // January
                        
                        const yearNum = parseInt(inputYear);
                        const monthNum = parseInt(inputMonth);

                        // Invalid if year is less than current year
                        if (yearNum < currentYear) return true;
                        
                        // Invalid if same year and month is current or earlier
                        if (yearNum === currentYear && monthNum <= currentMonth) return true;
                        
                        return false;
                      }
                      return false;
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-sm">Expiry Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="02/2025"
                            className={`h-12 rounded-lg ${isInvalidDate(field.value) ? 'border-red-500' : ''}`}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              const cleaned = value.replace(/[^\d/]/g, '');
                              let formatted = cleaned;
                              
                              // Format as MM/YYYY
                              if (cleaned.length >= 2 && !cleaned.includes('/')) {
                                formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
                              }
                              
                              // Validate month (01-12)
                              const month = parseInt(formatted.split('/')[0]);
                              if (month > 12) {
                                formatted = '12' + formatted.slice(2);
                              }
                              if (month < 1 && formatted.length >= 2) {
                                formatted = '01' + formatted.slice(2);
                              }
                              
                              field.onChange(formatted);
                            }}
                            maxLength={7}
                          />
                        </FormControl>
                        {isInvalidDate(field.value) && (
                          <p className="text-xs text-red-500 mt-1">
                            Please enter a date after January 2025.
                          </p>
                        )}
                      </FormItem>
                    );
                  }}
                />

                {/* Low Stock Alert */}
                <FormField
                  control={form.control}
                  name="lowStockThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Low Stock Alert</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="when item is below a number in quantity"
                          className="h-12 rounded-lg"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-red-500">
                        Details of added stock items cannot be updated.
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStockModal;
