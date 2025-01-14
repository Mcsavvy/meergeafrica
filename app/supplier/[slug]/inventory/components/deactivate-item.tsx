"use client";

import { useState } from "react";
import { toast } from "sonner";
import PasswordModal from "./passwordModal";
import SuccessModal from "./successModal";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";

interface DeactivateItemProps {
  itemId: string;
  itemType: "stock" | "store";
  onSuccess?: () => void;
}

export default function DeactivateItem({ itemId, itemType, onSuccess }: DeactivateItemProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { deactivateStockItem, deactivateStore } = useInventoryStore();

  const handleDeactivateConfirm = async () => {
    try {
      setShowPasswordModal(false);
      
      if (itemType === "stock") {
        await deactivateStockItem(itemId, "123456");
      } else {
        await deactivateStore(itemId);
      }
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Auto-hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        onSuccess?.();
      }, 2000);
    } catch (error) {
      console.error(`Failed to deactivate ${itemType}:`, error);
      toast.error(`Failed to deactivate ${itemType}`);
    }
  };

  const handleClose = () => {
    setShowPasswordModal(false);
    onSuccess?.();
  };

  return (
    <>
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handleClose}
        onConfirm={handleDeactivateConfirm}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

export function useDeactivateItem(itemType: "stock" | "store") {
  const [itemToDeactivate, setItemToDeactivate] = useState<string | null>(null);

  const showDeactivateModal = (id: string) => {
    setItemToDeactivate(id);
  };

  const handleSuccess = () => {
    setItemToDeactivate(null);
  };

  const DeactivateModal = itemToDeactivate ? (
    <DeactivateItem
      itemId={itemToDeactivate}
      itemType={itemType}
      onSuccess={handleSuccess}
    />
  ) : null;

  return {
    showDeactivateModal,
    DeactivateModal,
  };
}
