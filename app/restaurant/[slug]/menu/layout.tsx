import Navbar from "@/components/ui/navbar";
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
    <>
      <Navbar pageName="Menu" />
      {children}
    </>
  );
}
