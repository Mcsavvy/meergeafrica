// components/AddProductDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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

// Define an interface for the product data
interface Product {
  name: string;
  expiryDate: string;
  image: File | null;
  availability: string;
  manufacturer: string;
  deliveryTime: string;
  price: string;
  pickupOption: string;
  unitsAvailable: string;
  description: string;
  size: string;
  weight: string;
}

interface AddProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (newProduct: Product) => void; // Now using the Product interface
  newProduct: Product; // Now using the Product interface
  setNewProduct: (newProduct: Product) => void; // Now using the Product interface
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  setOpen,
  onAdd,
  newProduct,
  setNewProduct,
}) => {
  const handleAdd = () => {
    onAdd(newProduct);
    setNewProduct({
      name: "",
      expiryDate: "",
      image: null,
      availability: "",
      manufacturer: "",
      deliveryTime: "",
      price: "",
      pickupOption: "",
      unitsAvailable: "",
      description: "",
      size: "",
      weight: "",
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="write the name of the product"
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry date</Label>
            <Input
              id="expiryDate"
              value={newProduct.expiryDate}
              onChange={(e) =>
                setNewProduct({ ...newProduct, expiryDate: e.target.value })
              }
              placeholder="product expiry date (MM/YY)"
            />
          </div>
          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input
              type="file"
              id="image"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.files?.[0] || null,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="availability">Availability Status</Label>
            <Select
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, availability: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="product availability status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="manufacturer">Manufacturer's Name</Label>
            <Input
              id="manufacturer"
              value={newProduct.manufacturer}
              onChange={(e) =>
                setNewProduct({ ...newProduct, manufacturer: e.target.value })
              }
              placeholder="product manufacturer (optional)"
            />
          </div>
          <div>
            <Label htmlFor="deliveryTime">Delivery Time Estimate</Label>
            <Select
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, deliveryTime: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="select delivery time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3 days">1-3 days</SelectItem>
                <SelectItem value="3-5 days">3-5 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="N00.00"
            />
          </div>
          <div>
            <Label htmlFor="pickupOption">Pick Up Option</Label>
            <Select
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, pickupOption: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="select pick up availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Not Available">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="unitsAvailable">Units Available</Label>
            <Input
              type="number"
              id="unitsAvailable"
              value={newProduct.unitsAvailable}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unitsAvailable: e.target.value })
              }
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="description">Product Description</Label>
            <Input
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="write a brief description of the product"
            />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              value={newProduct.size}
              onChange={(e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              }
              placeholder="write the size of the product"
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              value={newProduct.weight}
              onChange={(e) =>
                setNewProduct({ ...newProduct, weight: e.target.value })
              }
              placeholder="0.003/Kg/L"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Save
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
