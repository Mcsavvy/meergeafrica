import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StockItem } from '@/lib/schemaSupplier/inventory';
import Image from 'next/image';

interface ViewStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockItem | null;
}

const ViewStockModal = ({ isOpen, onClose, stock }: ViewStockModalProps) => {
  if (!stock) return null;

  const formatDate = (date?: { month: number; year: number }) => {
    if (!date) return 'N/A';
    return `${String(date.month).padStart(2, '0')}/${date.year}`;
  };

  const details = [
    { label: 'Item Name', value: stock.name },
    { label: 'Category', value: stock.category },
    { label: 'StockType', value: stock.stockType },
    { label: 'Price', value: `N${stock.purchasePrice.toLocaleString()}` },
    { label: 'Quantity', value: stock.quantity },
    { label: 'Measuring Unit', value: stock.measuringUnit },
    { label: 'Expiry Date', value: formatDate(stock.expirationDate) },
    { label: 'Low Stock Alert Unit', value: stock.lowStockThreshold },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="w-48 h-48 relative">
              <Image
                src={stock.image || '/images/placeholder.png'}
                alt={stock.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            {details.map(({ label, value }, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">{label} :</span>
                <span className="text-base text-gray-900 ml-4">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={onClose}
              className="bg-[#FF4400] hover:bg-[#cc3700] text-white px-8"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStockModal;
