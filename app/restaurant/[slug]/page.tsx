"use client";
import Dashboard from "@/components/dashboard/main";
import { SalesHistoryProps } from "@/components/dashboard/sales-history";
import Navbar from "@/components/ui/navbar";
import { DemoContext } from "@/lib/contexts/demo";
import { useContext } from "react";

const dashboardData = {
  restaurantName: "Sample Restaurant",
  stats: {
    totalOrders: 180,
    pendingOrders: 20,
    confirmedOrders: 160,
    totalSales: 50,
    totalOrdersPercentage: 62,
    pendingOrdersPercentage: 30,
    confirmedOrdersPercentage: 79,
    totalSalesPercentage: 50,
  },
  newOrders: [
    {
      id: "RBP-3456",
      items: "BBQ Full Chicken",
      price: 10500,
      type: "Eat-In",
    },
    {
      id: "RBP-4673",
      items: "BBQ Chicken Thighs",
      price: 7000,
      type: "Take-Out",
    },
    {
      id: "RBP-2345",
      items: "Grilled Fish with Fried Plantain With Salad",
      price: 2500,
      type: "Delivery",
    },
  ],
  salesHistory: [
    {
      id: "RBP-0939",
      paymentType: "Credit Card",
      status: "failed",
    },
    {
      id: "RBP-0938",
      paymentType: "Bank Transfer",
      status: "success",
    },
    {
      id: "RBP-0937",
      paymentType: "Bank Transfer",
      status: "success",
    },
    {
      id: "RBP-0936",
      paymentType: "Cash",
      status: "failed",
    },
    {
      id: "RBP-7399",
      paymentType: "Bank Transfer",
      status: "failed",
    },
  ] as SalesHistoryProps["sales"],
  topMenu: [
    {
      id: "1",
      name: "BBQ Full Chicken",
      price: 5400,
      orderCount: 10,
      imageUrl: "/images/food/food-1.png",
    },
    {
      id: "2",
      name: "BBQ Chicken Burger",
      price: 3000,
      orderCount: 7,
      imageUrl: "/images/food/food-2.png",
    },
    {
      id: "3",
      name: "Grilled Fish with Fried Plantain",
      price: 2500,
      orderCount: 5,
      imageUrl: "/images/food/food-3.png",
    },
    {
      id: "4",
      name: "BBQ Chicken Thighs",
      price: 2000,
      orderCount: 4,
      imageUrl: "/images/food/food-4.png",
    },
    {
      id: "5",
      name: "BBQ Chicken Drumsticks",
      price: 1500,
      orderCount: 2,
      imageUrl: "/images/food/food-5.png",
    },
  ],
};

const emptyData = {
  restaurantName: "Sample Restaurant",
  stats: {
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    totalSales: 0,
    totalOrdersPercentage: 0,
    pendingOrdersPercentage: 0,
    confirmedOrdersPercentage: 0,
    totalSalesPercentage: 0,
  },
  newOrders: [],
  salesHistory: [],
  topMenu: [],
};

export default function Home() {
  const { demo } = useContext(DemoContext);
  const data = demo ? dashboardData : emptyData;
  return (
    <>
      <Navbar />
      <Dashboard
        restaurantName={data.restaurantName}
        stats={data.stats}
        orders={data.newOrders}
        sales={data.salesHistory}
        topMenuItems={data.topMenu}
      />
    </>
  );
}
