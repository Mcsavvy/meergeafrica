// components/StockTable.tsx
"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Store } from "@/providers/supplier/storeProvider";
import StockViewModal from "../popupScreen/stockViewModal";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { StockItem } from "@/providers/supplier/stockItem";

interface StockTableProps {
  stockItems: StockItem[];
  setStockItems: Dispatch<SetStateAction<StockItem[]>>;
  selectedStockItems: string[];
  handleStockSelect: (id: string) => void;
  currentStore: Store | null;
}

const StockTable: React.FC<StockTableProps> = ({
  stockItems,
  setStockItems,
  selectedStockItems,
  handleStockSelect,
  currentStore,
}) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<StockItem | null>(
    null
  );
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const dropdownKey = `dropdown-${stockItem.id}-${filteredStockItems.indexOf(
  //   stockItem
  // )}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredStockItems = currentStore
    ? stockItems.filter((stockItem) => stockItem.storeId === currentStore.id)
    : stockItems; // Show all if no store is selected

  const handleViewClick = (stockItem: StockItem) => {
    setSelectedStockItem(stockItem);
    setViewModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedStockItem(null);
  };

  const handleDeactivateClick = async (stockItemToDelete: StockItem) => {
    try {
      // Simulate deactivation (remove from local state)
      setStockItems((prevStockItems: StockItem[]) =>
        prevStockItems.filter((item) => item.id !== stockItemToDelete.id)
      );

      // If you have an API, uncomment this:
      // const response = await fetch(`/api/stock/${stockItem.id}/deactivate`, {
      //   method: "PATCH", // Or PUT, depending on your API
      // });

      // if (!response.ok) {
      //   const errorData = await response.json()
      //   throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      // }
      setOpenDropdownId(null); // Close dropdown after deactivation
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deactivating stock:", error.message);
        alert(error.message);
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred."); // Provide a generic message
      }
    }
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div>
      <table className="w-full border-collapse">
        {filteredStockItems.length > 0 && (
          <thead>
            <tr>
              <th className="border p-2"></th>
              <th className="border p-2">Item Image</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Stock Type</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Measuring Unit</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
        )}
        <tbody>
          {filteredStockItems.map((stockItem, index) => {
            const dropdownKey = `dropdown-${index}`;
            return (
              <tr key={stockItem.id}>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedStockItems.includes(stockItem.id)}
                    onChange={() => handleStockSelect(stockItem.id)}
                  />
                </td>
                <td className="border p-2">{stockItem.itemImage}</td>
                <td className="border p-2">{stockItem.itemName}</td>
                <td className="border p-2">{stockItem.category}</td>
                <td className="border p-2">{stockItem.stockType}</td>
                <td className="border p-2">
                  N{stockItem.price.toLocaleString()}
                </td>
                <td className="border p-2">{stockItem.quantity}</td>
                <td className="border p-2">{stockItem.measuringUnit}</td>
                <td className="border p-2 relative align-middle">
                  <div className="inline-block" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(dropdownKey)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="group-hover:text-blue-500">
                        {" "}
                        {/* Hover style */}
                        <DotsHorizontalIcon className="h-6 w-6 cursor-pointer" />
                      </div>
                    </button>
                    <div
                      className={`absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10 ${
                        openDropdownId === dropdownKey ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() => handleViewClick(stockItem)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeactivateClick(stockItem)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <StockViewModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        stockItem={selectedStockItem}
      />
    </div>
  );
};

export default StockTable;
