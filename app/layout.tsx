import type { Metadata } from "next";
import "./globals.css";
import { ModalSetup } from "@/components/ui/modal";

export const metadata: Metadata = {
  title: "Meerge Africa",
  description: "simplifying food business operations across Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ModalSetup />
      <body className="antialiased max-h-screen overflow-clip">{children}</body>
    </html>
  );
}
