import type { Metadata } from "next";
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
    <main className="antialiased max-h-screen overflow-clip">
      <ModalSetup />
      {children}
    </main>
  );
}
