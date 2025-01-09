import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cart - Meerge Africa",
  description: "My Shopping Cart",
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
