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
import Image from "next/image";

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

      {/* Display products in a table (for specific properties) */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead> {/* Combined header */}
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Units Available</TableHead>
            <TableHead>Size</TableHead>
            {/* ... other table headers */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="flex items-center">
                {" "}
                {/* Flexbox for card layout */}
                {product.image ? (
                  <div
                    style={{ position: "relative", width: 50, height: 50 }}
                    className="mr-2"
                  >
                    {" "}
                    {/* Added margin right */}
                    <Image
                      src={URL.createObjectURL(product.image)}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="w-[50px] h-[50px] bg-gray-200 rounded flex items-center justify-center mr-2">
                    No Image
                  </div>
                )}
                <span>{product.name}</span>{" "}
                {/* Product name next to the image */}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.unitsAvailable}</TableCell>
              <TableCell>{product.size}</TableCell>
              {/* ... other table cells */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
