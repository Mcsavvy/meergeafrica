"use client";
import React, { useMemo, useState } from "react";
import {
  useInventoryStore,
  useCurrentStore,
} from "@/lib/contexts/inventory-context";

import CreateStockModal from "../components/create-stock-item-modal";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { stockColumns } from "../components/stock-items-columns";
import StockItemsTable from "../components/stock-items-table";
import { StockItemsFilter } from "../components/stock-item-filter";
import ViewStockModal from "../components/view-stock-item-modal";
import EditStockModal from "../components/edit-stock-item-modal";
import DeleteStockModal from "../components/delete-stock-item-modal";

const StoreDetailView = () => {
  const store = useCurrentStore();
  const { stockItems } = useInventoryStore();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const storeStockItems = useMemo(() => {
    return stockItems.filter(
      (item) =>
        item.store === store.id &&
        (search === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [stockItems, store.id, search]);
  const table = useReactTable({
    data: storeStockItems,
    columns: stockColumns,
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
      <CreateStockModal />
      <ViewStockModal />
      <EditStockModal />
      <DeleteStockModal />
      <div className="space-y-4 bg-white p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
          <h2 className="text-xl font-semibold">{store.name}</h2>
          <StockItemsFilter search={search} setSearch={setSearch} />
        </div>
        <StockItemsTable table={table} />
      </div>
    </div>
  );
};

export default StoreDetailView;
