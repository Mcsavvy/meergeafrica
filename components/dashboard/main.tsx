import { useContext } from "react";
import NewOrdersTable, { OrderTableProps } from "./new-order";
import SalesHistory, { SalesHistoryProps } from "./sales-history";
import Stats, { StatsProps } from "./stats";
import TopMenu, { TopMenuProps } from "./top-menu";
import { RestaurantContext } from "@/lib/contexts/restaurant";

export type DashboardProps = {
  restaurantName: string;
  stats: StatsProps;
  topMenuItems: TopMenuProps["items"];
  orders: OrderTableProps["orders"];
  sales: SalesHistoryProps["sales"];
};

type DashboardContainerProps = {
  children: React.ReactNode;
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
}) => {
  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto bg-slate-200 p-4 lg:p-10">
      <div className="w-full space-y-6">{children}</div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  orders,
  sales,
  topMenuItems,
}) => {
  const { name } = useContext(RestaurantContext);
  return (
    <DashboardContainer>
      <header>
        <h1 className="text-xl">
          Welcome, <span className="font-semibold">{name}</span>
        </h1>
      </header>
      <Stats {...stats} />
      <TopMenu items={topMenuItems} />
      <div className="flex items-stretch justify-between gap-4 w-full max-w-full flex-wrap max-md:flex-col">
        <NewOrdersTable orders={orders} />
        <SalesHistory sales={sales} />
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
