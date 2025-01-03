import React, { useMemo, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useInventoryStore } from "@/lib/contexts/inventory-context";

const ViewStockModal = () => {
  const [stockItemId, setStockItemId] = useState<string | null>(null);
  const { stockItems } = useInventoryStore();
  const stockItem = useMemo(() => {
    if (!stockItems) return null;
    return stockItems.find((item) => item.id === stockItemId);
  }, [stockItems, stockItemId]);
  const expiryDate = useMemo(() => {
    if (!stockItem?.expirationDate) return null;
    return new Date(
      stockItem.expirationDate.year,
      stockItem.expirationDate.month - 1
    );
  }, [stockItem]);
  const formattedExpiryDate = useMemo(() => {
    if (!expiryDate) return "N/A";
    return expiryDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [expiryDate]);

  const onOpen = (params: { id: string }) => {
    const { id } = params;
    setStockItemId(id);
  };

  return (
    // @ts-expect-error ...
    <Modal id="view-stock-item/:id" onOpen={onOpen}>
      <Modal.Header>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">Stock Item Details</h2>
          <Button
            variant="ghost"
            size="icon"
            data-modal-trigger={`edit-stock-item/${stockItemId}`}
            data-modal-hide
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="space-y-6">
          {/* Image and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              {stockItem?.image ? (
                <Image
                  width={96}
                  height={96}
                  src={stockItem.image}
                  alt={stockItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl text-gray-400">
                    {stockItem?.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{stockItem?.name}</h3>
              <p className="text-sm text-gray-500">{stockItem?.category}</p>
              <p className="text-lg font-medium mt-2">
                ₦{stockItem?.purchasePrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Stock Information */}
          <Card className="p-4">
            <h4 className="font-medium mb-4">Stock Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">
                  {stockItem?.quantity} {stockItem?.measuringUnit}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock Alert</p>
                <p className="font-medium">
                  {stockItem?.lowStockThreshold} {stockItem?.measuringUnit}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Measuring Unit</p>
                <p className="font-medium">{stockItem?.measuringUnit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-medium">{formattedExpiryDate}</p>
              </div>
            </div>
          </Card>

          {/* Stock Status */}
          <Card className="p-4">
            <h4 className="font-medium mb-4">Stock Status</h4>
            <div className="space-y-3">
              {/* Stock Level Indicator */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">
                    Current Stock Level
                  </span>
                  <span className="text-sm font-medium">
                    {stockItem &&
                      stockItem.quantity &&
                      stockItem.lowStockThreshold &&
                      Math.round(
                        (stockItem.quantity / stockItem.lowStockThreshold) * 100
                      )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${
                        stockItem
                          ? Math.min(
                              (stockItem.quantity /
                                stockItem.lowStockThreshold) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Stock Warning */}
              {stockItem &&
                stockItem.quantity <= stockItem.lowStockThreshold && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                    Stock is below the minimum threshold. Consider restocking
                    soon.
                  </div>
                )}
            </div>
          </Card>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" data-modal-hide>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewStockModal;
