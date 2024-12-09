"use client";
import React, { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import menuItemsColumns from "@/components/menu/menu-items/columns";
import { MenuItemsFilter } from "@/components/menu/menu-items/filters";
import MenuItemsTable from "@/components/menu/menu-items/table";
import CreateMenuItem from "@/components/menu/menu-items/add-item";
import {
  CreateAddOnModal,
  EditAddOnModal,
} from "@/components/menu/menu-items/addon-forms";
import {
  CreatePairedItemModal,
  EditPairedItemModal,
} from "@/components/menu/menu-items/paired-items-forms";
import { useMenuItemsStore } from "@/lib/contexts/menu-items-context";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { menuItems } = useMenuItemsStore();

  const table = useReactTable({
    data: menuItems,
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
      <CreateMenuItem />
      <CreateAddOnModal />
      <CreatePairedItemModal />
      <EditPairedItemModal />
      <EditAddOnModal />
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
