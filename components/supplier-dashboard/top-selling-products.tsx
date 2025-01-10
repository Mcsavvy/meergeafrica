"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const products = [
  { name: "Bag of rice", image: "/images/mamagold.png" },
  { name: "Spaghetti", image: "/images/spag.png" },
  { name: "Peak Milk", image: "/images/peak.png" },
];

export function TopSellingProducts() {
  return (
    <Card className="bg-white rounded-2xl p-6">
      <h2 className="text-xl font-medium text-[#FF6B00] mb-6">
        Top Selling Products
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.name} className="text-center">
            <div className="bg-gray-100 rounded-xl p-4 mb-3 aspect-square flex items-center justify-center relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-lg object-contain p-2"
                priority
              />
            </div>
            <span className="text-sm font-medium">{product.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
