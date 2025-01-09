"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { StockItem } from "@/lib/schemaSupplier/inventory";
import { Store } from "@/lib/contexts/supplier/storeContext";
import { MoreVertical, Eye, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewStockModal from "../popupScreen/viewStock";
import PasswordModal from "../popupScreen/passwordModal";
import SuccessModal from "../popupScreen/successModal";
import { useRouter } from "next/navigation";

interface StockTableProps {
  data: StockItem[];
  stores?: Store[];
  selectedItems?: string[];
  onItemSelect?: (id: string) => void;
  showSelection?: boolean;
  onDeactivateStock?: (stock: StockItem) => void;
  onViewStock?: (stock: StockItem) => void;
  onSelectionChange?: (ids: string[]) => void;
}

export default function StockTable({ 
  data,
  stores = [],
  selectedItems = [], 
  onItemSelect = () => {}, 
  showSelection = false,
  onDeactivateStock = () => {},
  onViewStock = () => {},
  onSelectionChange = () => {}
}: StockTableProps) {
  const [mounted, setMounted] = useState(false);
  const [localData, setLocalData] = useState<StockItem[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [stockToDeactivate, setStockToDeactivate] = useState<StockItem | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    setIsAllSelected(data.length > 0 && selectedItems.length === data.length);
  }, [data, selectedItems]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openMenuId && menuRefs.current[openMenuId] && 
          !menuRefs.current[openMenuId]?.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    // Update local data when data prop changes
    setLocalData(data.filter(item => item.isActive !== false));
  }, [data]);

  // Group stocks by store
  const stocksByStore = useMemo(() => {
    const grouped: { [key: string]: StockItem[] } = {};
    localData.forEach(stock => {
      if (!grouped[stock.store]) {
        grouped[stock.store] = [];
      }
      grouped[stock.store].push(stock);
    });
    return grouped;
  }, [localData]);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleViewStock = (item: StockItem) => {
    setSelectedStock(item);
    setIsViewModalOpen(true);
    setOpenMenuId(null);
    onViewStock(item);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedStock(null);
  };

  const handleDeactivateClick = (stock: StockItem) => {
    setStockToDeactivate(stock);
    setShowPasswordModal(true);
  };

  const handleDeactivateConfirm = async (password: string) => {
    if (!stockToDeactivate) return;
    
    try {
      await onDeactivateStock(stockToDeactivate);
      
      // Update local data to remove the deactivated item
      setLocalData(prevData => 
        prevData.filter(item => item.id !== stockToDeactivate.id)
      );
      
      setShowPasswordModal(false);
      setShowSuccessModal(true);
      setOpenMenuId(null);
    } catch (error) {
      console.error('Failed to deactivate stock:', error);
      // Handle error appropriately
    } finally {
      setStockToDeactivate(null);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      const allIds = data.map(item => item.id);
      onSelectionChange(allIds);
    }
  };

  const onItemSelectChange = (itemId: string) => {
    onItemSelect?.(itemId);
  };

  if (!mounted) {
    return null;
  }

  if (localData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No stock items found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ViewStockModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        stock={selectedStock}
      />
      {stores.map(store => {
        const storeStocks = stocksByStore[store.id] || [];
        if (storeStocks.length === 0) return null;

        return (
          <div key={store.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
              {store.businessSectionName && (
                <p className="text-sm text-gray-500">{store.businessSectionName}</p>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    {showSelection && (
                      <th scope="col" className="w-4 p-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          onChange={handleSelectAll}
                          checked={isAllSelected}
                        />
                      </th>
                    )}
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Item Image
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Item Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Stock Type
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Measuring Unit
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {storeStocks.map((item) => (
                    <tr key={item.id}>
                      {showSelection && (
                        <td className="w-4 p-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => onItemSelectChange(item.id)}
                          />
                        </td>
                      )}
                      <td className="px-4 py-4">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            src={item.image || "/images/placeholder.png"}
                            alt={item.name}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{item.category}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{item.stockType}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">₦{item.purchasePrice.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{item.measuringUnit}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div 
                          className="relative" 
                          ref={(el: HTMLDivElement | null) => {
                            menuRefs.current[item.id] = el;
                          }}
                        >
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                            onClick={() => toggleMenu(item.id)}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          {openMenuId === item.id && (
                            <div 
                              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                              style={{ top: 'auto', bottom: '100%', marginBottom: '0.5rem' }}
                            >
                              <button
                                onClick={() => handleViewStock(item)}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View</span>
                              </button>
                              {item.isActive && (
                                <button
                                  onClick={() => handleDeactivateClick(item)}
                                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <PowerOff className="mr-2 h-4 w-4" />
                                  <span>Deactivate</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handleDeactivateConfirm}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
      />
    </div>
  );
}
