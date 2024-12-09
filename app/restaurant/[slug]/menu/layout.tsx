import Navbar from "@/components/ui/navbar";
import { AddOnProvider } from "@/lib/contexts/addon-context";
import { MenuItemsProvider } from "@/lib/contexts/menu-items-context";
import { PairingProvider } from "@/lib/contexts/pairing-context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu - Meerge Africa",
  description: "Restaurant Menu",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuItemsProvider>
      <AddOnProvider>
        <PairingProvider>
          <Navbar pageName="Menu" />
          {children}
        </PairingProvider>
      </AddOnProvider>
    </MenuItemsProvider>
  );
}
