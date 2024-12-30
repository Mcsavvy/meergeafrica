"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddProductDialog from "@/components/supplier-dashboard/popupScreen/add-product";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
};

export default function Products() {
  const [products, setProducts] = useState<
    { id: number; name: string; price: string; category: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    category: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleAddProduct = () => {
  //   setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  //   setNewProduct({ name: "", price: "", category: "" });
  //   setIsDialogOpen(false);
  // };

  const handleAddProduct = (productData: Product) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
  };

  const slug = "your-dynamic-slug";

  return (
    <div className="p-6">
      <div className="flex  items-center mb-4">
        {" "}
        <div className="flex items-center ml-auto">
          {" "}
          {/* Right-aligned container */}
          <Link
            href={`/supplier/${slug}/inventory/stores`}
            className="flex items-center mr-4"
          >
            <Button variant="outline" asChild>
              <div className="flex items-center">
                <Store className="h-4 w-4 mr-2" />
                Stores
              </div>
            </Button>
          </Link>
          {/* Main header flex container */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mr-2">Add product</Button>
            </DialogTrigger>
            <AddProductDialog
              open={isDialogOpen}
              setOpen={setIsDialogOpen}
              onAdd={handleAddProduct}
              newProduct={newProduct}
              setNewProduct={(product: Omit<Product, "id">) =>
                setNewProduct(product)
              }
            />
          </Dialog>
          <Search className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
}
