"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { StockItem } from "@/providers/supplier/stockItem";

interface StockViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItem: StockItem | null; // Make stockItem nullable
}

const StockViewModal: React.FC<StockViewModalProps> = ({
  isOpen,
  onClose,
  stockItem,
}) => {
  if (!stockItem) {
    return null; // Don't render anything if no stockItem is provided
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-auto p-8 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {stockItem.itemName} Details
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {stockItem.itemImage && (
            <div className="flex justify-center">
              <Image
                src={stockItem.itemImage}
                alt={stockItem.itemName}
                width={200} // Adjust width as needed
                height={200} // Adjust height as needed
                className="rounded-md object-cover"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {/* Use grid for layout */}
            <div>
              <p className="font-medium">Item Name :</p>
              <p>{stockItem.itemName}</p>
            </div>
            <div>
              <p className="font-medium">Category :</p>
              <p>{stockItem.category}</p>
            </div>
            <div>
              <p className="font-medium">Stock Type :</p>
              <p>{stockItem.stockType}</p>
            </div>
            <div>
              <p className="font-medium">Price :</p>
              <p>N{stockItem.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium">Quantity :</p>
              <p>
                {stockItem.quantity} {stockItem.measuringUnit}
              </p>
            </div>
            <div>
              <p className="font-medium">Expiry Date :</p>
              <p>{stockItem.expiryDate}</p>
            </div>
            <div>
              <p className="font-medium">Low Stock Alert Unit :</p>
              <p>{stockItem.lowStockAlert}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockViewModal;
