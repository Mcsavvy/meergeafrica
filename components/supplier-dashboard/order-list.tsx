"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const orders = [
  { sku: "PK001", name: "Peak milk", category: "Oils & Fats", items: 24 },
  { sku: "AP001", name: "Apple", category: "Fruits & Nuts", items: 50 },
  { sku: "CU001", name: "Cucumber", category: "Vegetables", items: 30 },
  { sku: "SH001", name: "Shrimps", category: "Sea Food", items: 20 },
  { sku: "TK001", name: "Turkey", category: "Meat & Poultry", items: 15 },
  { sku: "RC001", name: "Rice", category: "Grain Products", items: 100 },
  { sku: "FL001", name: "White Flour", category: "Baking Products", items: 75 },
  {
    sku: "KC001",
    name: "Knorr Cubes",
    category: "Spices & Seasoning",
    items: 200,
  },
];

export function OrderList() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Order List</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Add to Market
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">SKU NO.</th>
              <th className="text-left py-3 px-4">PRODUCT NAME</th>
              <th className="text-left py-3 px-4">CATEGORY</th>
              <th className="text-left py-3 px-4">NO. OF ITEMS</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.sku} className="border-b">
                <td className="py-3 px-4">{order.sku}</td>
                <td className="py-3 px-4">{order.name}</td>
                <td className="py-3 px-4">{order.category}</td>
                <td className="py-3 px-4">{order.items}</td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
