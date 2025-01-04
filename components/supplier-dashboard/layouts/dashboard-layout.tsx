"use client";
import { useRouter } from "next/navigation";
import { TopSellingProducts } from "../top-selling-products";

import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/supplier-dashboard/layouts/navBar";
import {
  ChevronDown,
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

interface Product {
  name: string;
  // ... other product properties
}

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/supplier/dashboard",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "#",
    subItems: [
      { title: "Recent Orders", href: "/supplier/dashboard/orders/recent" },
      {
        title: "Confirmed Orders",
        href: "/supplier/dashboard/orders/confirmed",
      },
      { title: "Order History", href: "/supplier/dashboard/orders/history" },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    href: "#",
    subItems: [
      { title: "Stores", href: "/supplier/dashboard/inventory/stores" },
      { title: "New Stock Items", href: "/supplier/dashboard/inventory/new" },
      { title: "All Stock Items", href: "/supplier/dashboard/inventory/all" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "#",
    subItems: [
      { title: "Sales Processed", href: "/supplier/dashboard/payments/sales" },
      { title: "All Payments", href: "/supplier/dashboard/payments/all" },
    ],
  },
  {
    title: "Quick Market",
    icon: Store,
    href: "#",
    subItems: [
      { title: "Products", href: "/supplier/dashboard/quick-market/products" },
      {
        title: "Categories",
        href: "/supplier/dashboard/quick-market/categories",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/supplier/dashboard/settings",
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    if (router.isReady) {
      // Your code that uses router object (e.g., router.pathname)
      const pathParts = router.pathname.split("/");
      if (pathParts.length > 0 && pathParts[1] !== "supplier") {
        setCurrentPage(
          pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)
        );
      } else if (pathParts.includes("supplier")) {
        setCurrentPage("Supplier");
      } else {
        setCurrentPage(undefined);
      }
      console.log("Router is ready:", router); // Optional debug log
    }
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        // More descriptive error handling
        console.error("Error fetching products:", err);
        setError(
          "An error occurred while fetching products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

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
                href={item.href || "#"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors",
                  { "cursor-pointer": item.subItems }
                )}
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                    toggleItem(item.title);
                  }
                }}
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
      <div className="flex-1 flex flex-col">
        <DashboardNavbar data={products} currentPage={currentPage} />{" "}
        {/* Navbar is rendered HERE */}
        <main className="flex-grow p-8">{children}</main>
      </div>
      {/* <main className="ml-64 flex-1 p-8">{children}</main> */}
    </div>
  );
}
