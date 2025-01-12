import Navbar from "@/components/ui/navbar";
import { InventoryProvider } from "@/lib/contexts/inventory-context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory - Meerge Africa",
  description: "Restaurant Inventory",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InventoryProvider>
      <Navbar pageName="Inventory" />
      {children}
    </InventoryProvider>
  );
}
