"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GearIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons";
// import { useStore } from "@/lib/contexts/supplier/storeContext"; // Import the store context
import { useStore } from "@//providers/supplier/storeProvider";
import AddStockModal from "@/components/supplier-dashboard/popupScreen/addStock";
import { useState } from "react";
import StockTable from "@/components/supplier-dashboard/layouts/stockTable";
import { StockItem } from "@/providers/supplier/stockItem";

// interface StockItem {
//   itemImage: string;
//   itemName: string;
//   category: string;
//   stockType: string;
//   price: number;
//   quantity: number;
//   measuringUnit: string;
//   id: string;
//   storeId: string;
// }

const StockScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [selectedStockItems, setSelectedStockItems] = useState<string[]>([]); // Define selectedStockItems
  const { stores, storeName } = useStore();
  const currentStore = stores.find((store) => store.name === storeName) || null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStock = (newStock: StockItem) => {
    if (!currentStore) {
      alert("Please select a store first."); // Or handle this more gracefully
      return;
    }
    setStockItems([...stockItems, newStock]);
  };

  const handleStockSelect = (id: string) => {
    setSelectedStockItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <div className="flex h-full">
      <div className="flex-grow p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          {/* Display current store name */}
          <h1 className="text-2xl font-bold">
            {storeName ? `Kadd Stores - ${storeName}` : "Kadd Stores"}
          </h1>
          <div className="flex items-center space-x-3">
            <Input placeholder="Search stores..." className="w-64 rounded-md" />
            <Button className="rounded-md">
              <HomeIcon className="mr-2 h-4 w-4" />
              Stores
            </Button>
            <Button className="rounded-md">
              <GearIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleOpenModal}
              className="rounded-md bg-blue-700 hover:bg-blue-800 text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
            <AddStockModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onAddStock={handleAddStock}
              currentStore={currentStore}
            />
          </div>
        </div>
        <Card className="rounded-lg h-[calc(100vh-160px)] overflow-y-auto">
          <CardContent className="h-full">
            {/* Content will go here later */}
            {stores.length > 0 ? (
              // No need for another check, use selected store if available
              <StockTable
                stockItems={stockItems}
                setStockItems={setStockItems}
                selectedStockItems={selectedStockItems}
                handleStockSelect={handleStockSelect}
                currentStore={
                  storeName
                    ? stores.find((store) => store.name === storeName) || null
                    : null
                } // Pass current store if available
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  No stores yet. Create one to add stock.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockScreen;
