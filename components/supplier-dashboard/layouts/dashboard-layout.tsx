"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
import { LineChart } from "@/components/charts/LineChart";

// Dynamically import the navbar with no SSR
const DashboardNavbar = dynamic(() => import('./navBar'), {
  ssr: false
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  // Extract the slug from the pathname
  const slug = pathname.split('/')[2] || '';

  const handleItemClick = (item: any) => {
    if (item.children) {
      toggleDropdown(item.label);
    } else {
      router.push(item.href);
    }
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      label: "Dashboard",
      href: `/supplier/${slug}`,
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: "Orders",
      href: `/supplier/${slug}/orders`,
      children: [
        {
          label: "Recent orders",
          href: `/supplier/${slug}/orders/recent`
        },
        {
          label: "Confirmed orders",
          href: `/supplier/${slug}/orders/confirmed`
        },
        {
          label: "Orders history",
          href: `/supplier/${slug}/orders/history`
        }
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: "Inventory",
      href: `/supplier/${slug}/inventory/all`,
      children: [
        {
          label: "Stores",
          href: `/supplier/${slug}/inventory/stores`
        },
        {
          label: "New stock items",
          href: `/supplier/${slug}/inventory/new`
        },
        {
          label: "All stock items",
          href: `/supplier/${slug}/inventory/all`
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      label: "Payments",
      href: `/supplier/${slug}/payments`,
      children: [
        {
          label: "Sales processed",
          href: `/supplier/${slug}/payments/sales`
        },
        {
          label: "All Payments",
          href: `/supplier/${slug}/payments/all`
        }
      ]
    },
    {
      icon: <Store className="w-6 h-6" />,
      label: "Quick market",
      href: `/supplier/${slug}/quick-market`,
      children: [
        {
          label: "Price prediction",
          href: `/supplier/${slug}/quick-market/price-prediction`
        },
        {
          label: "Farm products",
          href: `/supplier/${slug}/quick-market/farm-products`
        },
        {
          label: "Non-farm products",
          href: `/supplier/${slug}/quick-market/non-farm-products`
        },
        {
          label: "Items in cart",
          href: `/supplier/${slug}/quick-market/cart`
        }
      ]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Settings",
      href: `/supplier/${slug}/settings`,
    },
    {
      icon: <LogOut className="w-6 h-6" />,
      label: "Sign out",
      href: "/supplier/auth/login",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-[#14213D] text-white">
        {/* Logo */}
        <div className="p-4">
          <Image src="/logo.png" alt="Logo" width={150} height={60} className="bg-white rounded-lg p-2" />
        </div>

        {/* Navigation Items */}
        <nav className="mt-8 px-4">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-900/50 rounded-lg transition-colors cursor-pointer",
                  pathname === item.href && "bg-blue-900/50 text-white"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.children && (
                  <ChevronDown 
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform duration-200",
                      openDropdowns[item.label] ? "rotate-180" : ""
                    )}
                  />
                )}
              </div>
              
              {item.children && openDropdowns[item.label] && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      onClick={() => router.push(child.href)}
                      className={cn(
                        "block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-900/50 rounded-lg transition-colors cursor-pointer",
                        pathname === child.href && "bg-blue-900/50 text-white"
                      )}
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
