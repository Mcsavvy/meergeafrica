import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/supplier-dashboard/stats-card";
import { SalesChart } from "@/components/supplier-dashboard/sales-chart";
import { MyTopSelling } from "@/components/supplier-dashboard/my-top-selling";
import { TrendingQuickMarkets } from "@/components/supplier-dashboard/trending-quick-markets";
import { OrderList } from "@/components/supplier-dashboard/order-list";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">Welcome, Kadd Agro</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <Card className="p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
        <SalesChart />
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MyTopSelling />
        <TrendingQuickMarkets />
      </div>

      {/* Order List */}
      <OrderList />
    </div>
  );
}
