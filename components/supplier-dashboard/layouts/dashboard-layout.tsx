import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  CreditCard,
  Store,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/dashboard/orders",
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments",
  },
  {
    title: "Quick market",
    icon: Store,
    href: "/dashboard/quick-market",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
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
