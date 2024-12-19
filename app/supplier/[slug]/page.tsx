import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/supplier-dashboard/stats-card";
import { SalesChart } from "@/components/supplier-dashboard/sales-chart";
import { TopSellingProducts } from "@/components/supplier-dashboard/top-selling-products";
import { TrendingProducts } from "@/components/supplier-dashboard/trending-products";
import { OrderList } from "@/components/supplier-dashboard/order-list";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Welcome, Kadd Agro</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard
          title="Total number of Orders"
          value="1,500"
          trend="+15%"
          className="bg-blue-600 text-white"
        />
        <StatsCard title="Confirmed Orders" value="1,450" trend="+15%" />
        <StatsCard title="Total Sales" value="1,400" trend="+8.5%" />
      </div>

      {/* Sales Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
        <SalesChart />
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        <TopSellingProducts />
        <TrendingProducts />
      </div>

      {/* Order List */}
      <OrderList />
    </div>
  );
}
