"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";

const products = [
  { name: "Yam", icon: "🍠" },
  { name: "Flour", icon: "🌾" },
  { name: "Semovita", icon: "🌽" },
  { name: "Groundnut Oil", icon: "🥜" },
];

export function TopSellingProducts() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">My Top-selling products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.name} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
              {product.icon}
            </div>
            <span className="text-orange-500">{product.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
