"use client";

import { Plus, Store as StoreIcon, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import CreateStoreModal from "@/app/supplier/[slug]/inventory/components/create-store-modal";
import { Store } from "@/lib/schemaSupplier/inventory";

interface InventoryActionsProps {
  onAddStock: () => void;
  selectedStore?: Store;
  className?: string;
}

export default function InventoryActions({ onAddStock, selectedStore, className = "" }: InventoryActionsProps) {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  return (
    <>
      <div className={`flex items-center justify-end gap-2 ${className}`}>
        <Button 
          variant="default"
          className="bg-[#15193B] hover:bg-[#15193B]/90 text-white flex items-center gap-2 h-10"
          onClick={onAddStock}
        >
          Add stock
        </Button>
        <Link href={selectedStore ? `/supplier/${selectedStore.id}/inventory/stores` : "/supplier/all-stocks/inventory/stores"}>
          <Button 
            variant="outline"
            className="flex items-center gap-2 h-10 border-gray-300"
          >
            <StoreIcon className="h-4 w-4" />
            Stores
          </Button>
        </Link>
        <Button 
          variant="outline"
          className="flex items-center gap-2 h-10 border-gray-300"
          onClick={() => setIsStoreModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create Store
        </Button>
        <Button 
          variant="outline"
          size="icon"
          className="h-10 w-10 border-gray-300"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline"
          size="icon"
          className="h-10 w-10 border-gray-300"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <CreateStoreModal isOpen={isStoreModalOpen} onClose={() => setIsStoreModalOpen(false)} />
    </>
  );
}
