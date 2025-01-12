"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Store as StoreIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import CreateStoreModal from "./create-store-modal";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CreateStockModal from "@/components/supplier-dashboard/popupScreen/addStock";
import { CurrentStoreProvider } from "@/lib/contexts/supplier/inventory-context";

export default function Stores() {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const { slug } = useParams();
  const router = useRouter();
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
          <div className="flex items-center gap-3">
            <Button 
              variant="default"
              className="bg-[#0E2254] hover:bg-[#0E2254]/90 text-white flex items-center gap-2 h-12 px-6 text-base"
              onClick={() => setIsAddStockModalOpen(true)}
              disabled={!currentStore}
            >
              <Plus className="h-5 w-5" />
              Add stock
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2 h-12 px-6 text-base"
              onClick={() => {}}
            >
              <StoreIcon className="h-5 w-5" />
              Stores
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2 h-12 px-6 text-base"
              onClick={() => setIsStoreModalOpen(true)}
            >
              <Plus className="h-5 w-5" />
              Create Store
            </Button>
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5H16.6667" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 10H16.6667" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 15H16.6667" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33333 5H4.16666" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33333 10H4.16666" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33333 15H4.16666" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

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
