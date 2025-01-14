"use client";

import React, { useState, useEffect } from "react";
import { useInventoryStore } from "@/lib/stores/supplier-inventory-store";
import StockTable from "@/app/supplier/[slug]/inventory/components/stockTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search, Menu } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StockViewModal from "@/app/supplier/[slug]/inventory/components/stockViewModal";
import { StockItem } from "@/lib/schemaSupplier/inventory";
import { toast } from "sonner";

export default function AllStockItems() {
  const { stockItems, stores, deactivateStockItem } = useInventoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<StockItem | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const params = useParams();
  const supplierId = params.slug as string;

  useEffect(() => {
    console.log("State changed:", {
      viewModalOpen,
      selectedStockItem,
      stockItems: stockItems.length
    });
  }, [viewModalOpen, selectedStockItem, stockItems]);

  const filteredStockItems = stockItems.filter((item) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewStock = (stock: StockItem): void => {
    console.log("handleViewStock called with:", stock);
    setSelectedStockItem(stock);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = (): void => {
    console.log("handleCloseViewModal called");
    setViewModalOpen(false);
    setSelectedStockItem(null);
  };

  const handleDeactivateStock = async (stock: StockItem): Promise<void> => {
    console.log("Deactivate clicked:", stock);
    try {
      await deactivateStockItem(stock.id, '123456');
      toast.success('Stock item deactivated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to deactivate stock item');
      }
    }
  };

  const handleItemSelect = (id: string): void => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-semibold">Kadd Stores</h1>
        <div className="flex items-center gap-4">
          <Link href={`/supplier/${supplierId}/inventory/new`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Add Stock
            </Button>
          </Link>
          <Button variant="outline" className="p-2">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="mt-6">
          <StockTable
            data={filteredStockItems}
            stores={stores}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}
            onViewStock={handleViewStock}
            onDeactivateStock={handleDeactivateStock}
          />
        </div>
      </div>

      {selectedStockItem && (
        <StockViewModal
          isOpen={viewModalOpen}
          onClose={handleCloseViewModal}
          stockItem={selectedStockItem}
        />
      )}
    </div>
  );
}
