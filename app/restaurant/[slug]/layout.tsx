import Sidebar from "@/components/ui/sidebar";
import { DemoModeProvider } from "@/lib/contexts/demo";
import { RestaurantProvider } from "@/lib/contexts/restaurant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant - Meerge Africa",
  description: "Restaurant",
};

export default function RestaurantLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <DemoModeProvider>
      <RestaurantProvider
        restaurant={{
          id: 0,
          slug: params.slug,
          name: params.slug
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
            .join(" "),
        }}
      >
        <div className="flex min-h-screen max-w-full bg-gray-50">
          <Sidebar />
          <main className="flex-1 min-w-0 w-full h-full flex flex-col relative">
            {children}
          </main>
        </div>
      </RestaurantProvider>
    </DemoModeProvider>
  );
}
