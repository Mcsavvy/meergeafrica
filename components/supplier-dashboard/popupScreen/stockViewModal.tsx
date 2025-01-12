"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StockItem } from "@/lib/schemaSupplier/inventory";
// import { X } from "lucide-react";
import Image from "next/image";

interface StockViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItem: StockItem | null;
}

const StockViewModal: React.FC<StockViewModalProps> = ({
  isOpen,
  onClose,
  stockItem,
}) => {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (stockItem) {
      setImageError(false);
    }
  }, [isOpen, stockItem]);

  if (!mounted || !isOpen || !stockItem) {
    return null;
  }

  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex justify-between items-center py-2">
      <p className="text-base font-medium text-gray-900">{label}</p>
      <p className="text-base text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          {/* Image */}
          <div className="flex justify-center mb-8">
            {!imageError && stockItem.image ? (
              <Image
                src={stockItem.image}
                alt={stockItem.name}
                width={256}
                height={256}
                className="object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-3">
            <DetailRow label="Item Name :" value={stockItem.name} />
            <DetailRow label="Category :" value={stockItem.category} />
            <DetailRow label="StockType :" value={stockItem.stockType} />
            <DetailRow
              label="Price :"
              value={`N${stockItem.purchasePrice.toLocaleString()}`}
            />
            <DetailRow label="Quantity:" value={stockItem.quantity} />
            <DetailRow
              label="Measuring Unit :"
              value={stockItem.measuringUnit}
            />
            <DetailRow
              label="Expiry Date :"
              value={
                stockItem.expirationDate
                  ? `${String(stockItem.expirationDate.month).padStart(
                      2,
                      "0"
                    )}/${stockItem.expirationDate.year}`
                  : "N/A"
              }
            />
            <DetailRow
              label="Low Stock Alert Unit :"
              value={stockItem.lowStockThreshold}
            />
          </div>

          {/* Close Button */}
          <div className="mt-8">
            <Button
              onClick={onClose}
              className="w-full bg-[#FF4D15] hover:bg-[#FF3D00] text-white font-medium py-2.5 rounded-md"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockViewModal;
