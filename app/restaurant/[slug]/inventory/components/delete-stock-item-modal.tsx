import React, { useMemo, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useInventoryStore } from "@/lib/contexts/inventory-context";

const DeleteStockModal = () => {
  const { deleteStockItem, stockItems } = useInventoryStore();
  const [stockItemId, setStockItemId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const stockItem = useMemo(() => {
    if (!stockItems || !stockItemId) return null;
    return stockItems.find((item) => item.id === stockItemId);
  }, [stockItems, stockItemId]);

  const onOpen = (params: { id: string }) => {
    const { id } = params;
    console.log("id", id);
    if (!id) return;
    setStockItemId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!stockItemId) return;

    try {
      setIsDeleting(true);
      await deleteStockItem(stockItemId);
      setStockItemId(null);
    } catch (error) {
      console.error("Failed to delete stock item:", error);
    } finally {
      setIsDeleting(false);
      setModalOpen(false);
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      id={`delete-stock-item/:id`}
      // @ts-expect-error ...
      onOpen={onOpen}
      onClose={() => setModalOpen(false)}
    >
      <Modal.Header>
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Delete Stock Item</h2>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="space-y-4">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-medium">{stockItem?.name}</span>? This action
            cannot be undone.
          </p>

          {/* Current Stock Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Stock Item Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{stockItem?.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Current Quantity</p>
                <p className="font-medium">
                  {stockItem?.quantity} {stockItem?.measuringUnit}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Purchase Price</p>
                <p className="font-medium">
                  ₦{stockItem?.purchasePrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            data-modal-hide
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Stock Item"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteStockModal;
