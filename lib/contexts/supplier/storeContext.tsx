// contexts/supplier/storeContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

export interface Store {
  name: string;
  image: string;
  section: string;
  description: string;
  address: string;
}

interface StoreContextType {
  storeName: string | null;
  setStoreName: (name: string | null) => void;
  stores: Store[];
  setStores: (stores: Store[]) => void;
}

const StoreContext = createContext<StoreContextType>({
  storeName: null,
  setStoreName: () => {},
  stores: [], // Provide an empty array as the initial value for stores
  setStores: () => {}, // Provide an empty function as the initial value for setStores
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeName, setStoreName] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem("storeName");
    if (storedName) {
      setStoreName(storedName);
    }
  }, []);

  useEffect(() => {
    if (storeName !== null) {
      localStorage.setItem("storeName", storeName);
    } else {
      localStorage.removeItem("storeName");
    }
  }, [storeName]);

  useEffect(() => {
    const storedStores = localStorage.getItem("stores");
    if (storedStores) {
      setStores(JSON.parse(storedStores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

  return (
    <StoreContext.Provider
      value={{ storeName, setStoreName, stores, setStores }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
