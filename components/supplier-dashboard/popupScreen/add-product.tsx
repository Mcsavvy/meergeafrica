// components/supplier-dashboard/popupScreen/add-product.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image?: File | null;
  expiryDate?: string;
  availability?: string;
  manufacturer?: string;
  deliveryTime?: string;
  pickupOption?: string;
  unitsAvailable?: string;
  description?: string;
  size?: string;
  weight?: string;
}

interface AddProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (newProduct: Product) => void;
  newProduct: Omit<Product, "id">;
  setNewProduct: (newProduct: Omit<Product, "id">) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  setOpen,
  onAdd,
  newProduct,
  setNewProduct,
}) => {
  const handleAdd = () => {
    onAdd({ ...newProduct, id: Date.now() } as Product); // Type assertion
    setNewProduct({
      name: "",
      price: "",
      category: "",
    });
    setOpen(false);
  };

  const leftFields = [
    "name",
    "image",
    "manufacturer",
    "price",
    "unitsAvailable",
    "size",
    "weight",
  ];
  const rightFields = [
    "expiryDate",
    "availability",
    "deliveryTime",
    "pickupOption",
    "description",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <div className="w-1/2">
            {leftFields.map((key) => (
              <div key={key} className="mb-4">
                <Label
                  htmlFor={key}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                {key === "image" ? (
                  <Input
                    type="file"
                    id={key}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        image: e.target.files?.[0] || null,
                      })
                    }
                  />
                ) : key === "unitsAvailable" ? (
                  <Input
                    type="number"
                    id={key}
                    value={newProduct[key as keyof Omit<Product, "id">] || ""}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        unitsAvailable: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Input
                    type="text"
                    id={key}
                    value={newProduct[key as keyof Omit<Product, "id">] || ""}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, [key]: e.target.value })
                    }
                    placeholder={`Enter ${key
                      .replace(/([A-Z])/g, " $1")
                      .trim()}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="w-1/2">
            {rightFields.map((key) => (
              <div key={key} className="mb-4">
                <Label
                  htmlFor={key}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                {key === "availability" ||
                key === "deliveryTime" ||
                key === "pickupOption" ? (
                  <Select
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, [key]: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={`Select ${key
                          .replace(/([A-Z])/g, " $1")
                          .trim()}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {key === "availability" && (
                        <>
                          <SelectItem value="In Stock">In Stock</SelectItem>
                          <SelectItem value="Out of Stock">
                            Out of Stock
                          </SelectItem>
                        </>
                      )}
                      {key === "deliveryTime" && (
                        <>
                          <SelectItem value="1-3 days">1-3 days</SelectItem>
                          <SelectItem value="3-5 days">3-5 days</SelectItem>
                        </>
                      )}
                      {key === "pickupOption" && (
                        <>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Not Available">
                            Not Available
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    id={key}
                    value={newProduct[key as keyof Omit<Product, "id">] || ""}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, [key]: e.target.value })
                    }
                    placeholder={`Enter ${key
                      .replace(/([A-Z])/g, " $1")
                      .trim()}`}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
