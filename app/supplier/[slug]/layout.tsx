import { DashboardLayout } from "@/components/supplier-dashboard/layouts/dashboard-layout";
import { StoreProvider } from "@/providers/supplier/storeProvider";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StoreProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </StoreProvider>
    </div>
  );
}
