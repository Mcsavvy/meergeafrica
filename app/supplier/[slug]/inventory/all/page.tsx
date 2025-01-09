"use client";

import React, { useState, useEffect } from "react";
import { useInventoryStore } from "@/lib/stores/supplier-inventory-store";
import StockTable from "@/components/supplier-dashboard/layouts/stockTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search, Menu } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StockViewModal from "@/components/supplier-dashboard/popupScreen/stockViewModal";

import { StockItem } from "@/lib/schemaSupplier/inventory";
import { toast } from "sonner";

export default function AllStockItems() {
  const { stockItems, stores, deactivateStockItem } = useInventoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<StockItem | null>(null);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showDeactivateSuccess, setShowDeactivateSuccess] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const params = useParams();
  const supplierId = params.slug as string;

  // Debug useEffect for initial load
  useEffect(() => {
    console.log("Initial stock items:", stockItems);
  }, []);

  // Debug useEffect for state changes
  useEffect(() => {
    console.log("State changed:", {
      viewModalOpen,
      selectedStockItem,
      stockItems: stockItems.length
    });
  }, [viewModalOpen, selectedStockItem, stockItems]);

  // Filter stock items based on search query
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

  const handleDeactivateClick = (stock: StockItem): void => {
    console.log("Deactivate clicked:", stock); // Debug log
    setSelectedStockItem(stock);
    setShowDeactivateConfirm(true);
  };

  const handleDeactivateConfirm = async (password: string): Promise<void> => {
    if (!selectedStockItem) return;

    try {
      await deactivateStockItem(selectedStockItem.id, password);
      setShowDeactivateConfirm(false);
      setShowDeactivateSuccess(true);
      toast.success('Stock item deactivated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to deactivate stock item');
      }
    }
  };

  const handleSuccessClose = (): void => {
    setShowDeactivateSuccess(false);
    setSelectedStockItem(null);
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
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-semibold">Kadd Stores</h1>
        <div className="flex items-center gap-4">
          <Link href={`/supplier/${supplierId}/inventory/new`}>
            <Button className="bg-[#18204A] hover:bg-[#18204A]/90 text-white px-6">
              Add stock
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Stores
          </Button>
          <Button variant="ghost" className="w-10 h-10 p-0">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-8 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search stock items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stock Table */}
      <div className="px-8 pb-8">
        <StockTable 
          data={filteredStockItems} 
          stores={stores}
          onViewStock={handleViewStock}
          onDeactivateStock={handleDeactivateClick}
          showSelection={true}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
        />
      </div>

      {/* Modals */}
      <StockViewModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        stockItem={selectedStockItem}
      />
    
    
    </div>
  );
}
