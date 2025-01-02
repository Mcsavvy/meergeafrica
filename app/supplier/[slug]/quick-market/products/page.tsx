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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <div className="flex  items-center mb-4">
        {" "}
        <div className="flex items-center ml-auto">
          {" "}
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Units Available</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell
                onClick={() => handleProductClick(product)}
                className="flex items-center"
              >
                {" "}
                {product.image ? (
                  <div
                    style={{ position: "relative", width: 50, height: 50 }}
                    className="mr-2"
                  >
                    {" "}
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
              </TableCell>
              <TableCell onClick={() => handleProductClick(product)}>
                {product.category}
              </TableCell>
              <TableCell onClick={() => handleProductClick(product)}>
                {product.price}
              </TableCell>
              <TableCell onClick={() => handleProductClick(product)}>
                {product.unitsAvailable}
              </TableCell>
              <TableCell onClick={() => handleProductClick(product)}>
                {product.size}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedProduct} onOpenChange={handleCloseView}>
        {" "}
        <DialogContent className="sm:max-w-[500px] bg-white rounded-lg p-6 shadow-lg">
          <style jsx>{`
            .dialog-content-scrollable {
              overflow-y: auto;
              max-height: 80vh;
            }
          `}</style>{" "}
          {selectedProduct && (
            <div className="dialog-content-scrollable">
              <>
                {selectedProduct.image && (
                  <div className="mb-4 flex justify-center">
                    {" "}
                    <Image
                      src={URL.createObjectURL(selectedProduct.image)}
                      alt={selectedProduct.name}
                      width={200}
                      height={200}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(selectedProduct)
                    .filter(([key]) => key !== "id" && key !== "image")
                    .map(([key, value]) => (
                      <div key={key}>
                        <p className="font-medium">
                          {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                          <span className="font-normal">{value}</span>
                        </p>
                      </div>
                    ))}
                </div>

                <DialogFooter className="mt-6 pt-6 border-t border-gray-200">
                  {" "}
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCloseView}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
