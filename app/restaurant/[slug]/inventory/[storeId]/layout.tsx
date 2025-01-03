import { CurrentStoreProvider } from "@/lib/contexts/inventory-context";

interface StoreDetailLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

export const metadata = {
  title: "Store Detail - Meerge Africa",
};

export default function StoreDetailLayout({
  children,
  params,
}: StoreDetailLayoutProps) {
  return (
    <CurrentStoreProvider storeId={params.storeId}>
      {children}
    </CurrentStoreProvider>
  );
}
