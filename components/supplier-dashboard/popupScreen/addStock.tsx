"use client";
import React, { useState } from "react";
// import { CameraIcon, DocumentIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageDropzone from "@/components/ui/image-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StockItem } from "@/providers/supplier/stockItem";
import { useZodForm } from "@/lib/hooks/form";
// import ImageUpload from "@/components/supplier-dashboard/popupScreen/imageStockUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// interface StockItem {
//   itemImage: string;
//   itemName: string;
//   category: string;
//   stockType: string;
//   price: number;
//   quantity: number;
//   measuringUnit: string;
//   id: string;
//   storeId: string;
// }

interface Store {
  id: string;
  // Add other properties of Store as needed
}

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (newStock: StockItem) => void; // Add this prop
  currentStore: Store | null;
}

const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  onAddStock,
  currentStore,
}) => {
  const [stockItemName, setStockItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [imageSource, setImageSource] = useState<"camera" | "file" | null>(
  //   null
  // ); // State for image source
  const [stockItemImage, setStockItemImage] = useState<File | null>(null);
  const [measuringUnit, setMeasuringUnit] = useState("G"); // Default unit
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [stockType, setStockType] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [pricePurchased, setPricePurchased] = useState("");

  // const handleImageChange = (file: File | null) => {
  //   setStockItemImage(file);
  // };
  const handleAddStockSubmit = () => {
    // Renamed to avoid confusion
    if (!currentStore) return;

    const newStock: StockItem = {
      itemName: stockItemName,
      category: category,
      stockType: stockType,
      price: Number(pricePurchased),
      quantity: Number(quantity),
      measuringUnit: measuringUnit,
      id: crypto.randomUUID(),
      storeId: currentStore.id,
      itemImage: stockItemImage ? stockItemImage.name : "",
    };

    onAddStock(newStock); // Call the onAddStock prop function
    onClose();
    // Reset form fields
    setStockItemName("");
    setQuantity("");
    setStockItemImage(null);
    setCategory("");
    setExpiryDate("");
    setStockType("");
    setLowStockAlert("");
    setPricePurchased("");
  };

  // const onSubmit = form.handleSubmit(async (data) => {
  //   try {
  //     await createStockItem(data);
  //     form.reset();
  //     setOpen(false);
  //   } catch (error) {
  //     console.error("Failed to create stock item:", error);
  //   }
  // });

  const form = useZodForm({
    schema: StockItemCreateSchema,
    defaultValues: {
      store: currentStore.id,
      expirationDate: {
        month: currentMonth,
        year: currentYear,
      },
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-auto p-8 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Add Stock Item
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="stockItemName">Stock Item Name</Label>
            <Input
              id="stockItemName"
              value={stockItemName}
              onChange={(e) => setStockItemName(e.target.value)}
              placeholder="write the name of the product"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="enter the quantity of the product"
            />
          </div>

          {/* Stock Item Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Item Image</FormLabel>
                <FormControl>
                  <ImageDropzone
                    name="image"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="measuringUnit">Measuring Unit</Label>
            <Select value={measuringUnit} onValueChange={setMeasuringUnit}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="G">G</SelectItem>
                <SelectItem value="Kg">Kg</SelectItem>
                <SelectItem value="L">L</SelectItem>
                {/* Add more units */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select product category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                {/* Add more categories */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="product expiry date (MM/YY)"
            />
          </div>
          <div>
            <Label htmlFor="stockType">Stock Type</Label>
            <Input
              id="stockType"
              value={stockType}
              onChange={(e) => setStockType(e.target.value)}
              placeholder="enter stock type"
            />
          </div>
          <div>
            <Label htmlFor="lowStockAlert">Low Stock Alert</Label>
            <Input
              id="lowStockAlert"
              type="number"
              value={lowStockAlert}
              onChange={(e) => setLowStockAlert(e.target.value)}
              placeholder="when item is below a number in quantity"
            />
          </div>
          <div>
            <Label htmlFor="pricePurchased">Price Purchased</Label>
            <Input
              id="pricePurchased"
              type="number"
              value={pricePurchased}
              onChange={(e) => setPricePurchased(e.target.value)}
              placeholder="N00.00"
            />
          </div>
          <div className="text-red-500">
            Details of added stock items cannot be updated.
          </div>
        </div>

        <DialogFooter className="mt-8 flex justify-end">
          <Button onClick={handleAddStockSubmit}>Add Stock</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStockModal;
