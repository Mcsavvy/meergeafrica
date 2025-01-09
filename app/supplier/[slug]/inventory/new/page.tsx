"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import StockTable from "@/components/supplier-dashboard/layouts/stockTable";
import { StockItem, Store } from "@/lib/schemaSupplier/inventory";
import CreateStockModal from "@/components/supplier-dashboard/popupScreen/addStock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrentStoreProvider } from "@/lib/contexts/supplier/inventory-context";

const StockScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStockItems, setSelectedStockItems] = useState<string[]>([]);
  const { stores, stockItems, deactivateStockItem } = useInventoryStore();
  const { slug } = useParams();
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const isAllStockPage = slug === "all-stocks";

  useEffect(() => {
    setMounted(true);
    // Only set default store if not on all-stock page
    if (stores.length > 0 && !isAllStockPage) {
      setSelectedStoreId(stores[0].id);
    }
  }, [stores, isAllStockPage]);

  const handleStockSelect = (id: string) => {
    setSelectedStockItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeactivateStock = async (stock: StockItem) => {
    try {
      await deactivateStockItem(stock.id, '123456');
    } catch (error) {
      console.error('Failed to deactivate stock:', error);
    }
  };

  // Filter stock items by store and search query
  const filteredStockItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = isAllStockPage ? true : (selectedStoreId ? item.store === selectedStoreId : true);
    const isActive = item.isActive !== false; // Only show active items
    return matchesSearch && matchesStore && isActive;
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Kadd Stores</h1>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedStoreId}
            className="bg-[#0A1F5C] text-white hover:bg-[#0A1F5C]/90"
          >
            Add stock
          </Button>
          <Link href="stores">
            <Button variant="outline" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12H3M3 12L6 9M3 12L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 17V18C9 19.6569 10.3431 21 12 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H12C10.3431 3 9 4.34315 9 6V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Stores
            </Button>
          </Link>
          <Button variant="outline" className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          {!isAllStockPage && (
            <Select
              value={selectedStoreId}
              onValueChange={setSelectedStoreId}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
      </div>

      <StockTable
        data={filteredStockItems}
        stores={stores}
        showSelection={true}
        selectedItems={selectedStockItems}
        onItemSelect={handleStockSelect}
        onDeactivateStock={handleDeactivateStock}
      />

      {isModalOpen && (isAllStockPage || selectedStoreId) && (
        <CurrentStoreProvider storeId={selectedStoreId || stores[0]?.id}>
          <CreateStockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </CurrentStoreProvider>
      )}
    </div>
  );
};

export default StockScreen;
