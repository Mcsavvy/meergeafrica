"use client";
import React, { useContext, useMemo, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { MenuItem } from "@/types/menu";
import menuItemsColumns from "@/components/menu/menu-items/columns";
import { MenuItemsFilter } from "@/components/menu/menu-items/filters";
import MenuItemsTable from "@/components/menu/menu-items/table";
import { DemoContext } from "@/lib/contexts/demo";

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Jollof Rice",
    price: 1000,
    category: "Rice Dishes",
    status: "available",
    readyTime: "10 mins",
    image: "/images/food/food-1.png",
  },
  {
    id: "2",
    name: "Fried Rice",
    price: 1200,
    category: "Rice Dishes",
    status: "unlisted",
    readyTime: "10 mins",
    image: "/images/food/food-2.png",
  },
  {
    id: "3",
    name: "Grilled Fish with Fried Plantain",
    price: 2500,
    category: "Grills & BBQ",
    status: "available",
    readyTime: "10 mins",
    image: "/images/food/food-3.png",
  },
  {
    id: "4",
    name: "BBQ Chicken Thighs",
    price: 2000,
    category: "Grills & BBQ",
    status: "unlisted",
    readyTime: "10 mins",
    image: "/images/food/food-4.png",
  },
  {
    id: "5",
    name: "BBQ Chicken Drumsticks",
    price: 1500,
    category: "Grills & BBQ",
    status: "available",
    readyTime: "10 mins",
    image: "/images/food/food-5.png",
  },
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { demo } = useContext(DemoContext);
  const data = useMemo(() => (demo ? menuItems : []), [demo]);

  const table = useReactTable({
    data,
    columns: menuItemsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setSearch,
    state: {
      sorting,
      columnFilters,
      globalFilter: search,
    },
  });

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto p-2 lg:p-4">
      <div className="space-y-4 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Menu Items</h2>
          <MenuItemsFilter search={search} setSearch={setSearch} />
        </div>
        <MenuItemsTable table={table} />
      </div>
    </div>
  );
}
