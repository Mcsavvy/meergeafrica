import DashboardLayout from "@/components/supplier-dashboard/layouts/dashboard-layout";
import { StoreProvider } from "@/providers/supplier/storeProvider";
import { InventoryProvider } from "@/lib/contexts/supplier/inventory-context";
import { DemoModeProvider } from "@/lib/contexts/supplier/demo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DemoModeProvider>
        <StoreProvider>
          <InventoryProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </InventoryProvider>
        </StoreProvider>
      </DemoModeProvider>
    </div>
  );
}
