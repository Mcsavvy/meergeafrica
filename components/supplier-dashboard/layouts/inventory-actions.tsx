"use client";

import { Plus, Store as StoreIcon, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import CreateStoreModal from "@/app/supplier/[slug]/inventory/stores/create-store-modal";

interface InventoryActionsProps {
  onAddStock: () => void;
  className?: string;
}

export default function InventoryActions({ onAddStock, className = "" }: InventoryActionsProps) {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  return (
    <>
      <div className={`fixed right-8 top-24 flex items-center gap-3 ${className}`}>
        <Button 
          variant="default"
          className="bg-[#0E2254] hover:bg-[#0E2254]/90 text-white flex items-center gap-2 h-12 px-6 text-base"
          onClick={onAddStock}
        >
          <Plus className="h-5 w-5" />
          Add stock
        </Button>
        <Link href="stores">
          <Button 
            variant="outline"
            className="flex items-center gap-2 h-12 px-6 text-base"
          >
            <StoreIcon className="h-5 w-5" />
            Stores
          </Button>
        </Link>
        <Button 
          variant="outline"
          className="flex items-center gap-2 h-12 px-6 text-base"
          onClick={() => setIsStoreModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Create store
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2 h-12 px-6 text-base"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2 h-12 px-6 text-base"
        >
          <Menu className="h-5 w-5" />
          Menu
        </Button>
      </div>
      <CreateStoreModal isOpen={isStoreModalOpen} onClose={() => setIsStoreModalOpen(false)} />
    </>
  );
}
