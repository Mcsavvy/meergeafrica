"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const products = [
  { name: "Bag of rice", image: "/rice.png" },
  { name: "Spaghetti", image: "/spaghetti.png" },
  { name: "Milk", image: "/milk.png" },
];

export function TrendingProducts() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Trending products in Quick-markets
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.name} className="text-center">
            <div className="bg-gray-50 rounded-lg p-4 mb-2">
              <div className="relative w-full h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-sm">{product.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
