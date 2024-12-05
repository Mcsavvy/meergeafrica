import Image from "next/image";
import React from "react";

type StatItemProps = {
  value: number;
  title: string;
  percentage: number;
  iconUrl: string;
  indicatorColor?: string;
};

export type StatsProps = {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  totalSales: number;
  totalOrdersPercentage: number;
  pendingOrdersPercentage: number;
  confirmedOrdersPercentage: number;
  totalSalesPercentage: number;
};

const StatItem: React.FC<StatItemProps> = ({
  value,
  title,
  percentage,
  iconUrl,
  indicatorColor,
}) => (
  <div className="flex flex-col items-start justify-start bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-full">
    <div className="flex w-full items-center justify-between">
      <h2 className="text-3xl font-medium">{value}</h2>
      <div className="relative rounded-full p-3 bg-secondary/25">
        <Image
          src={iconUrl}
          width={24}
          height={24}
          alt="Icon"
          className="w-6 h-6"
        />
        {indicatorColor && (
          <div
            className={`absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full ${indicatorColor}`}
          />
        )}
      </div>
    </div>
    <p className="text-gray-500 text-sm capitalize">{title}</p>
    <span className="text-gray-500 self-end mt-auto">{percentage}%</span>
    <div className="relative w-full h-3 bg-gray-300 rounded-lg mt-2">
      <div
        className="absolute top-0 left-0 h-full bg-secondary rounded-lg"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const Stats: React.FC<StatsProps> = ({
  totalOrders,
  pendingOrders,
  confirmedOrders,
  totalSales,
  totalOrdersPercentage,
  pendingOrdersPercentage,
  confirmedOrdersPercentage,
  totalSalesPercentage,
}) => (
  <section
    id="stats"
    className="grid grid-cols-2 md:grid-cols-4 max-w-full w-full gap-4 overflow-x-clip"
  >
    <StatItem
      value={totalOrders}
      title="Total orders today"
      percentage={totalOrdersPercentage}
      iconUrl="/assets/svgs/calendar.svg"
    />
    <StatItem
      value={pendingOrders}
      title="Pending orders today"
      percentage={pendingOrdersPercentage}
      iconUrl="/assets/svgs/calendar.svg"
      indicatorColor="bg-orange-500"
    />
    <StatItem
      value={confirmedOrders}
      title="Confirmed orders today"
      percentage={confirmedOrdersPercentage}
      iconUrl="/assets/svgs/calendar.svg"
      indicatorColor="bg-green-500"
    />
    <StatItem
      value={totalSales}
      title="Total sales today"
      percentage={totalSalesPercentage}
      iconUrl="/assets/svgs/coins.svg"
    />
  </section>
);

export default Stats;
