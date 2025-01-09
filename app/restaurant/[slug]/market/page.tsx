"use client";

import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Filter, ChevronDown } from "lucide-react";
import ProductGrid from "./components/product-grid";
import { useMarket } from "@/lib/contexts/market-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useDebouncedCallback } from "use-debounce";
import { productCategories } from "@/data";
import Link from "next/link";
import { RestaurantContext } from "@/lib/contexts/restaurant";

const categories = ["All Products", ...productCategories];

const RestaurantPage = () => {
  const { filter, setFilter, cart } = useMarket();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState(filter.search);

  const handleSearch = useDebouncedCallback(() => {
    setFilter({ search: searchQuery });
  }, 300);

  useEffect(() => {
    setFilter({
      category: selectedCategory === "All Products" ? "" : selectedCategory,
    });
  }, [selectedCategory, setFilter]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, handleSearch]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { slug } = useContext(RestaurantContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>

            <div className="flex gap-x-4 items-center">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden md:flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {selectedCategory}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category ? "bg-gray-100" : ""
                      }
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Cart Button */}
              <Button variant="outline" className="relative" asChild>
                <Link href={`/restaurant/${slug}/market/cart`}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="md:hidden mt-4 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className="whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="container mx-auto px-4 py-8 overflow-y-auto"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{selectedCategory}</h1>
          {searchQuery && (
            <p className="text-gray-600 mt-2">
              Showing results for &quot;{searchQuery}&quot;
            </p>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </main>
    </div>
  );
};

export default RestaurantPage;
