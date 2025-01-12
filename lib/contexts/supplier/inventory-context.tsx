"use client";
import { type ReactNode, createContext, useContext } from "react";
import { useInventoryStore } from "@/lib/stores/supplier-inventory-store";
import { Store } from "@/lib/schemaSupplier/inventory";

const CurrentStoreContext = createContext<Store | undefined>(undefined);

export interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider = ({ children }: InventoryProviderProps) => {
  // We no longer need to handle demo data since it's handled in the store
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
