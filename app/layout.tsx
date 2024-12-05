import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased max-h-screen overflow-clip">{children}</body>
    </html>
  );
}
