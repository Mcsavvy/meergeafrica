import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useMarket } from "@/lib/contexts/market-context";
import { Product } from "@/lib/schema/market";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Loader2, ShoppingCart } from "lucide-react";
import { PaginatedProducts } from "@/lib/stores/market-store";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

const formatPrice = (price: number) => {
  return `₦${price.toLocaleString()}`;
};
const ProductCard: React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
  inCart: boolean;
}> = ({ product, onAddToCart, inCart }) => {
  return (
    <Card className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 bg-red-500 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
        <p className="text-sm text-gray-500 mt-1">
          By {product.manufacturerName}
        </p>

        {product.inStock && (
          <p className="text-sm text-green-600 mt-1">
            {product.quantity} units available
          </p>
        )}

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold">{formatPrice(product.price)}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart
              className={cn(
                "!w-6 !h-6 disabled:cursor-not-allowed",
                product.inStock
                  ? inCart
                    ? "text-secondary"
                    : "text-primary"
                  : "text-gray-800"
              )}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ProductGrid = () => {
  const { products, isLoading, fetchProducts, addToCart, cart, filter } =
    useMarket();
  const [paginatedProducts, setPaginatedProducts] = useState<PaginatedProducts>(
    {
      data: [],
      meta: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
      },
    }
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts({ page: currentPage, limit: 8 }).then(setPaginatedProducts);
  }, [filter, products, fetchProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleAddToCart = useCallback(
    async (product: Product) => {
      try {
        await addToCart(product.id, 1);
        // You might want to show a success toast here
      } catch (error) {
        console.error("Failed to add to cart:", error);
        // You might want to show an error toast here
      }
    },
    [addToCart]
  );

  if (isLoading && paginatedProducts.data.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            inCart={cart.some((item) => item.productId === product.id)}
          />
        ))}
      </div>

      {/* No products found */}
      {!isLoading && paginatedProducts.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No products found</p>
        </div>
      )}

      <Pagination
        currentPage={paginatedProducts.meta.currentPage}
        totalPages={paginatedProducts.meta.totalPages}
        onPageChange={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
};

export default ProductGrid;
