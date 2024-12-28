"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  ShoppingCart,
  Package,
  CreditCard,
  Store,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "supplier/dashboard",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "#",
    subItems: [
      { title: "Recent Orders", href: "/dashboard/orders/recent" },
      { title: "Confirmed Orders", href: "/dashboard/orders/confirmed" },
      { title: "Order History", href: "/dashboard/orders/history" },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    href: "#",
    subItems: [
      { title: "Stores", href: "/dashboard/inventory/stores" },
      { title: "New Stock Items", href: "/dashboard/inventory/new" },
      { title: "Sold Stock Items", href: "/dashboard/inventory/sold" },
      { title: "All Stock Items", href: "/dashboard/inventory/all" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "#",
    subItems: [
      { title: "Sales Processed", href: "/dashboard/payments/sales" },
      { title: "All Payments", href: "/dashboard/payments/all" },
    ],
  },
  {
    title: "Quick Market",
    icon: Store,
    href: "#",
    subItems: [
      {
        title: "Price prediction",
        href: "/dashboard/quick-market/Price-prediction",
      },
      { title: "Farm products", href: "/dashboard/quick-market/Farm-products" },
      {
        title: "Non-farm products",
        href: "/dashboard/quick-market/non-farm-products",
      },
      { title: "Items in cart", href: "/dashboard/quick-market/items-in-cart" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 w-64 h-screen bg-[#0A1A3B] text-white p-4">
        <div className="mb-8">
          {/* Your logo */}
          <div className="bg-white p-2 rounded-lg w-12 h-12" />
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors",
                  { "cursor-pointer": item.subItems }
                )}
                onClick={() => item.subItems && toggleItem(item.title)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
                {item.subItems && (
                  <ChevronDown
                    className={cn("ml-auto transition-transform", {
                      "rotate-180": openItems.includes(item.title),
                    })}
                  />
                )}
              </Link>
              {item.subItems && openItems.includes(item.title) && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Button
          variant="ghost"
          className="flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 w-full mt-auto absolute bottom-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </Button>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
