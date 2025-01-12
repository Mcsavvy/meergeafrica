"use client";
import { type ReactNode, createContext, useContext } from "react";
import { useInventoryStore } from "@/lib/stores/supplier-inventory-store";
import { DemoContext } from "./demo";
import { demoStores, demoStockItems } from "@/supplierData";
import { Store } from "@/lib/schemaSupplier/inventory";

const CurrentStoreContext = createContext<Store | undefined>(undefined);

export interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider = ({ children }: InventoryProviderProps) => {
  const { demo } = useContext(DemoContext);
  const { stores, stockItems } = useInventoryStore();

  // Add or remove demo data based on demo context
  if (demo) {
    const demoStoresFiltered = demoStores.filter(
      (demoStore) => !stores.some((store) => store.id === demoStore.id)
    );
    
    // Only add demo stock items that aren't already in the store and aren't deactivated
    const demoStockItemsFiltered = demoStockItems.filter(
      (demoItem) => {
        const existingItem = stockItems.find(item => item.id === demoItem.id);
        // Don't add if item exists and is deactivated
        if (existingItem && existingItem.isActive === false) {
          return false;
        }
        // Don't add if item already exists
        return !existingItem;
      }
    );

    if (demoStoresFiltered.length > 0 || demoStockItemsFiltered.length > 0) {
      useInventoryStore.setState((state) => {
        // Keep existing items that are deactivated
        const existingDeactivatedItems = state.stockItems.filter(item => item.isActive === false);
        
        return {
          ...state,
          stores: [...state.stores, ...demoStoresFiltered],
          stockItems: [
            ...existingDeactivatedItems,
            ...state.stockItems.filter(item => item.isActive !== false),
            ...demoStockItemsFiltered
          ],
        };
      });
    }
  } else {
    const hasDemoData = stores.some((store) =>
      demoStores.some((demoStore) => demoStore.id === store.id)
    );

    if (hasDemoData) {
      useInventoryStore.setState((state) => ({
        ...state,
        stores: state.stores.filter(
          (store) => !demoStores.some((demoStore) => demoStore.id === store.id)
        ),
        stockItems: state.stockItems.filter(
          (item) => !demoStockItems.some((demoItem) => demoItem.id === item.id)
        ),
      }));
    }
  }

  return children;
};

export const CurrentStoreProvider = ({
  children,
  storeId,
}: {
  children: ReactNode;
  storeId: Store["id"];
}) => {
  const { stores } = useInventoryStore();
  const store = stores.find((s) => s.id === storeId);
  return (
    <CurrentStoreContext.Provider value={store}>
      {children}
    </CurrentStoreContext.Provider>
  );
};

export const useCurrentStore = () => {
  const store = useContext(CurrentStoreContext);
  if (!store) {
    throw new Error(
      "useCurrentStore must be used within a CurrentStoreProvider"
    );
  }
  return store;
};

export { useInventoryStore };
