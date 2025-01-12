"use client";

import { useState } from "react";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import CreateStoreModal from "./create-store-modal";
import CreateStockModal from "@/components/supplier-dashboard/popupScreen/addStock";
import { CurrentStoreProvider } from "@/lib/contexts/supplier/inventory-context";
import InventoryActions from "@/components/supplier-dashboard/layouts/inventory-actions";

export default function Stores() {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const { stores } = useInventoryStore();

  // Get the first store or undefined if no stores exist
  const currentStore = stores[0];

  return (
    <div className="flex-grow h-full">
      <div className="px-4">
        {/* Store Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl">Store</h2>
            <span className="text-gray-500">(default store created for you)</span>
          </div>
        </div>

        <InventoryActions 
          onAddStock={() => setIsAddStockModalOpen(true)} 
        />

        {/* Content Area */}
        <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">All stock items added will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Create Store Modal */}
      <CreateStoreModal 
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />

      {/* Add Stock Modal */}
      {currentStore && (
        <CurrentStoreProvider storeId={currentStore.id}>
          <CreateStockModal 
            isOpen={isAddStockModalOpen}
            onClose={() => setIsAddStockModalOpen(false)}
          />
        </CurrentStoreProvider>
      )}
    </div>
  );
}
