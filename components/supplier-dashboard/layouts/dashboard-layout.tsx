"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
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
  ArrowUpRight,
} from "lucide-react";
import NavBar from "./navBar";
import { cn } from "@/lib/utils";
import { LineChart } from "@/components/charts/LineChart";
import { MyTopSelling } from "@/components/supplier-dashboard/my-top-selling";
import { TrendingQuickMarkets } from "@/components/supplier-dashboard/trending-quick-markets";
import { SignOutModal } from "../popupScreen/sign-out-modal";

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  // Extract the slug from the pathname
  const slug = pathname.split('/')[2] || '';

  // Get current page title
  const getCurrentSection = () => {
    const currentItem = sidebarItems.find(item => {
      if (item.children) {
        return item.children.some(child => child.href === pathname);
      }
      return item.href === pathname;
    });
    return currentItem?.label || 'Dashboard';
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.label === "Sign out") {
      setIsSignOutModalOpen(true);
    } else if (item.children) {
      toggleDropdown(item.label);
      if (item.href) {
        router.push(item.href);
      }
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSidebarOpen(window.innerWidth >= 1024); // 1024px is the lg breakpoint
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      href: `/supplier/${slug}`,
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      label: "Orders",
      href: `/supplier/${slug}/orders/recent`,
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
      icon: <Package className="w-5 h-5" />,
      label: "Inventory",
      href: `/supplier/${slug}/inventory/stores`,
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
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payments",
      href: `/supplier/${slug}/payments/sales`,
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
      icon: <Store className="w-5 h-5" />,
      label: "Quick market",
      href: `/supplier/${slug}/quick-market/price-prediction`,
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
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      href: `/supplier/${slug}/settings`,
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      label: "Sign out",
      href: "#",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-[#0E2254] text-white py-4 md:py-8 z-20 transition-all duration-300",
        isSidebarOpen ? "w-[280px] md:w-[324px]" : "w-[70px] md:w-[80px]",
        "lg:translate-x-0", // Always show on large screens
        !isSidebarOpen && "lg:w-[80px]", // Collapsed state on large screens
        !isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0", // Hide on mobile when open
        "shadow-xl"
      )}>
        {/* Logo */}
        <div className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "px-4 md:px-8" : "px-2 md:px-4"
        )}>
          <div className={cn(
            "bg-white rounded-lg flex justify-center items-center",
            isSidebarOpen ? "p-3 md:p-4 w-[180px] md:w-[200px]" : "p-2 w-[40px] md:w-[48px] h-[40px] md:h-[48px]"
          )}>
            <Image 
              src="/images/logo.png" 
              alt="Meerge Logo" 
              width={150} 
              height={60} 
              className={cn(
                "transition-all duration-300",
                isSidebarOpen ? "w-full" : "w-6 h-6 md:w-8 md:h-8 object-contain"
              )} 
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 md:mt-8 px-1 md:px-2">
          {sidebarItems.map((item, index) => (
            <div key={index} className="mb-2">
              <div
                onClick={() => handleItemClick(item)}
                className={cn(
                  "flex items-center gap-4 py-4 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer",
                  pathname === item.href && "bg-[#1a3166] text-white",
                  isSidebarOpen ? "px-6" : "px-4 justify-center"
                )}
              >
                <div className={cn(
                  "transition-transform duration-300",
                  !isSidebarOpen && "scale-125"
                )}>
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <>
                    <span className="text-[16px]">{item.label}</span>
                    {item.children && (
                      <ChevronDown 
                        className={cn(
                          "ml-auto h-5 w-5 transition-transform duration-200",
                          openDropdowns[item.label] ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </>
                )}
              </div>
              
              {isSidebarOpen && item.children && openDropdowns[item.label] && (
                <div className="ml-8 mt-2 space-y-2">
                  {item.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      onClick={() => router.push(child.href)}
                      className={cn(
                        "block px-4 py-3 text-[14px] text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer",
                        pathname === child.href && "bg-[#1a3166] text-white"
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
      </aside>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        "lg:ml-[80px]", // Default margin for collapsed state
        isSidebarOpen && "lg:ml-[324px]", // Expanded state margin
        "w-full" // Ensure full width on mobile
      )}>
        <NavBar 
          onMenuClick={toggleSidebar} 
          currentSection={getCurrentSection()}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">
            {pathname === `/supplier/${slug}` ? (
              <div className="p-4 md:p-6 lg:p-8">
                <h1 className="text-2xl font-medium mb-6">Welcome, Kadd Agro,</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div className="bg-gradient-to-r from-[#0E2254] to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg">Total number of Orders</h3>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-bold mb-2">1,500</p>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">+2.1%</span>
                  </div>
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg">Confirmed Orders</h3>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-bold mb-2">1,450</p>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">+1.8%</span>
                  </div>
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg">Total Sales</h3>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <p className="text-4xl font-bold mb-2">1,400</p>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">+8.0%</span>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="bg-white rounded-2xl p-6 mb-8">
                  <h2 className="text-xl font-medium mb-4">Sales Statistics</h2>
                  <div className="h-[300px] overflow-hidden">
                    <LineChart />
                  </div>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-2 gap-8">
                  <MyTopSelling />
                  <TrendingQuickMarkets />
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6 lg:p-8">
                {children}
              </div>
            )}
          </div>
        </main>
      </div>

      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;
