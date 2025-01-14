// contexts/supplier/storeContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useInventoryStore } from "./inventory-context"; // Import the useInventoryStore hook

export interface Store {
  id: string;
  name: string;
  businessSectionName?: string;
  description: string;
  image?: string | File;
  location?: string;
}

interface StoreContextType {
  currentStore: Store | null;
  setCurrentStore: (store: Store | null) => void;
}

const StoreContext = createContext<StoreContextType>({
  currentStore: null,
  setCurrentStore: () => {},
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const { stores } = useInventoryStore();

  useEffect(() => {
    const storedStoreId = localStorage.getItem("currentStoreId");
    if (storedStoreId) {
      const store = stores.find((s) => s.id === storedStoreId);
      if (store) {
        setCurrentStore(store);
      } else {
        localStorage.removeItem("currentStoreId");
      }
    }
  }, [stores]);

  useEffect(() => {
    if (currentStore) {
      localStorage.setItem("currentStoreId", currentStore.id);
    } else {
      localStorage.removeItem("currentStoreId");
    }
  }, [currentStore]);

  return (
    <StoreContext.Provider value={{ currentStore, setCurrentStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
