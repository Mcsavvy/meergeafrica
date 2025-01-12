"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import { useParams, useSearchParams } from "next/navigation";
import StockTable from "@/components/supplier-dashboard/layouts/stockTable";
import { StockItem } from "@/lib/schemaSupplier/inventory";
import CreateStockModal from "@/components/supplier-dashboard/popupScreen/addStock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrentStoreProvider } from "@/lib/contexts/supplier/inventory-context";
import { toast } from "sonner";
import SuccessModal from "@/components/supplier-dashboard/popupScreen/successModal";
import InventoryActions from "@/components/supplier-dashboard/layouts/inventory-actions";

const StockScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStockItems, setSelectedStockItems] = useState<string[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filteredStockItems, setFilteredStockItems] = useState<StockItem[]>([]);

  const { stores, stockItems, deactivateStockItem } = useInventoryStore();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const isAllStockPage = slug === "all-stocks";

  useEffect(() => {
    setMounted(true);
    // Set default store to Kadd Store
    if (stores.length > 0) {
      const defaultStore =
        stores.find((store) => store.id === "default") || stores[0];
      setSelectedStoreId(defaultStore.id);
    }

    // Check if we should open the add stock modal
    const shouldOpenModal = searchParams.get("addStock") === "true";
    if (shouldOpenModal) {
      setIsModalOpen(true);
    }
  }, [stores, searchParams]);

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
      await deactivateStockItem(stock.id, "123456");
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to deactivate stock:", error);
      toast.error("Failed to deactivate stock item");
    }
  };

  // Filter stock items by store and search query
  useEffect(() => {
    const filtered = stockItems.filter((item) => {
      if (!selectedStoreId && !isAllStockPage) return false;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStore = isAllStockPage || item.store === selectedStoreId;
      const isActive = item.isActive !== false;
      return matchesSearch && matchesStore && isActive;
    });
    setFilteredStockItems(filtered);
  }, [stockItems, selectedStoreId, searchQuery, isAllStockPage]);

  if (!mounted) return null;

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your inventory items
          </p>
        </div>
      </div>

      <InventoryActions onAddStock={() => setIsModalOpen(true)} />

      {selectedStoreId && (
        <CurrentStoreProvider storeId={selectedStoreId}>
          <CreateStockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </CurrentStoreProvider>
      )}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          {!isAllStockPage && (
            <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
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
        stores={stores.map((store) => ({
          ...store,
          image: store.image
            ? store.image instanceof File
              ? URL.createObjectURL(store.image)
              : store.image
            : undefined,
        }))}
        showSelection={true}
        selectedItems={selectedStockItems}
        onItemSelect={handleStockSelect}
        onDeactivateStock={handleDeactivateStock}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default StockScreen;
