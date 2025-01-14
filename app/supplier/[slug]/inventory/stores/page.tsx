"use client";

import { useState, useMemo } from "react";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import { useParams } from "next/navigation";
import CreateStoreModal from "../components/create-store-modal";
import CreateStockModal from "@/app/supplier/[slug]/inventory/components/addStock";
import StockTable from "@/app/supplier/[slug]/inventory/components/stockTable";
import { CurrentStoreProvider } from "@/lib/contexts/supplier/inventory-context";
import { useDeactivateItem } from "@/app/supplier/[slug]/inventory/components/deactivate-item";
import Image from "next/image";
import { Store } from "@/lib/contexts/supplier/storeContext";

export default function Stores() {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const { stores, stockItems } = useInventoryStore();
  const params = useParams();
  const { showDeactivateModal, DeactivateModal } = useDeactivateItem("stock");

  // Get the current store
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(stores.find(s => s.id === params.slug) || stores[0]);

  // Filter stocks for the selected store
  const storeStocks = useMemo(() => {
    if (!selectedStore) return [];
    return stockItems.filter(stock => stock.store === selectedStore.id);
  }, [stockItems, selectedStore]);

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
    setIsStoreDropdownOpen(false);
  };

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
              onClick={() => setIsAddStockModalOpen(true)}
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
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                        onClick={() => handleStoreSelect(store)}
                      >
                        {store.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image 
                              src={typeof store.image === 'string' ? store.image : URL.createObjectURL(store.image)}
                              alt={store.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {store.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{store.name}</h3>
                          <p className="text-xs text-gray-500">{store.businessSectionName}</p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-2">
                    <button 
                      onClick={() => {
                        setIsStoreDropdownOpen(false);
                      }}
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

        {/* Content Area */}
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow">
            <StockTable 
              data={storeStocks}
              stores={stores}
              onDeactivateStock={(stock) => showDeactivateModal(stock.id)}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateStoreModal 
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />

      {selectedStore && (
        <CurrentStoreProvider storeId={selectedStore.id}>
          <CreateStockModal 
            isOpen={isAddStockModalOpen}
            onClose={() => setIsAddStockModalOpen(false)}
          />
        </CurrentStoreProvider>
      )}

      {/* Deactivation Modal */}
      {DeactivateModal}
    </div>
  );
}
