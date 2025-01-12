"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Bell, Settings, UserCog, HelpCircle, Scale } from "lucide-react";
import { RestaurantContext } from "@/lib/contexts/restaurant";
import Navbar from "@/components/ui/navbar";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Account & Security",
    href: "account",
    icon: <UserCog className="w-4 h-4" />,
  },
  {
    label: "Notifications",
    href: "notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    label: "App Preferences",
    href: "preferences",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    label: "Help & Support",
    href: "support",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  {
    label: "Legal",
    href: "legal",
    icon: <Scale className="w-4 h-4" />,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { slug } = useContext(RestaurantContext);

  return (
    <>
      <Navbar pageName="Settings" />
      <div className="flex h-[calc(100vh-100px)] bg-gray-100 py-4 px-4">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded border-r py-6">
          <nav className="p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/restaurant/${slug}/settings/${item.href}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
                  pathname.endsWith(item.href)
                    ? "bg-primary/5 text-secondary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 h-full">
          <div className="max-w-4xl mx-auto h-full">{children}</div>
        </main>
      </div>
    </>
  );
}
