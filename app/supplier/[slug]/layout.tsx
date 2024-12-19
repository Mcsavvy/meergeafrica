import { DashboardLayout } from "@/components/supplier-dashboard/layouts/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
