import Navbar from "@/components/ui/navbar";
import { MarketProvider } from "@/lib/contexts/market-context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Market - Meerge Africa",
  description: "Quick Market",
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketProvider>
      <Navbar pageName="Quick Market" />
      {children}
    </MarketProvider>
  );
}
