"use client";

import { useState, useEffect } from "react";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import { useSearchParams } from "next/navigation";
import StockTable from "@/app/supplier/[slug]/inventory/components/stockTable";
import { StockItem, Store } from "@/lib/schemaSupplier/inventory";
import CreateStockModal from "@/app/supplier/[slug]/inventory/components/addStock";
import CreateStoreModal from "@/app/supplier/[slug]/inventory/components/create-store-modal";
import Image from "next/image";
import { CurrentStoreProvider } from "@/lib/contexts/supplier/inventory-context";
import SuccessModal from "@/app/supplier/[slug]/inventory/components/successModal";
import { useDeactivateItem } from "@/app/supplier/[slug]/inventory/components/deactivate-item";

const StockScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedStockItems, setSelectedStockItems] = useState<string[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filteredStockItems, setFilteredStockItems] = useState<StockItem[]>([]);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | undefined>();

  const { stores, stockItems } = useInventoryStore();
  const searchParams = useSearchParams();
  const { showDeactivateModal, DeactivateModal } = useDeactivateItem("stock");

  useEffect(() => {
    // Set default store to Kadd Store
    if (stores.length > 0) {
      const defaultStore =
        stores.find((store) => store.id === "default") || stores[0];
      setSelectedStoreId(defaultStore.id);
      setSelectedStore(defaultStore);
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

  const handleStoreSelect = (store: Store) => {
    setSelectedStoreId(store.id);
    setSelectedStore(store);
    setIsStoreDropdownOpen(false);
  };

  // Filter stock items by store 
  useEffect(() => {
    const filtered = stockItems.filter((item) => {
      const isActive = item.isActive !== false;
      return isActive;
    });
    setFilteredStockItems(filtered);
  }, [stockItems]);

  return (
    <div className="flex-grow h-full">
      <div className="px-4">
        {/* Store Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {selectedStore?.image ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image 
                  src={typeof selectedStore.image === 'string' ? selectedStore.image : URL.createObjectURL(selectedStore.image)}
                  alt={selectedStore.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">
                  {selectedStore?.name?.substring(0, 2).toUpperCase() || "ST"}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-medium">{selectedStore?.name || "Store"}</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{selectedStore?.location}</span>
                </div>
                {selectedStore?.businessSectionName && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span>({selectedStore.businessSectionName})</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#14214D] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a5e] transition-colors"
            >
              Add stock
            </button>
            <button 
              onClick={() => setIsStoreModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create Store
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Stores
              </button>
              
              {isStoreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    {stores.map((store) => (
                      <div 
                        key={store.id}
                        onClick={() => handleStoreSelect(store)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        {store.image ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image 
                              src={typeof store.image === 'string' ? store.image : URL.createObjectURL(store.image)}
                              alt={store.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {store.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{store.name}</div>
                          <div className="text-sm text-gray-500">{store.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-2">
                    <button 
                      onClick={() => setIsStoreDropdownOpen(false)}
                      className="w-full text-sm text-gray-500 hover:bg-gray-50 p-2 rounded-lg text-right"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Settings
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </div>
        </div>

        {selectedStoreId && (
          <CurrentStoreProvider storeId={selectedStoreId}>
            <CreateStockModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </CurrentStoreProvider>
        )}

        <CreateStoreModal 
          isOpen={isStoreModalOpen}
          onClose={() => setIsStoreModalOpen(false)}
        />

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
          onDeactivateStock={(stock) => showDeactivateModal(stock.id)}
        />

        {DeactivateModal}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
    </div>
  );
};

export default StockScreen;
