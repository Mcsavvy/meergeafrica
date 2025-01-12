"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  InventoryStore,
  createInventoryStore,
} from "@/lib/stores/inventory-store";
import { DemoContext } from "./demo";
import { demoStores, demoStockItems } from "@/data";
import { Store } from "../schema/inventory";

export type InventoryStoreAPI = ReturnType<typeof createInventoryStore>;

const InventoryContext = createContext<InventoryStoreAPI | undefined>(
  undefined
);

const CurrentStoreContext = createContext<Store | undefined>(undefined);

export interface InventoryProviderProps {
  children: ReactNode;
  initialState?: InventoryStore;
}

function addDemoInventory(initialState?: InventoryStore) {
  const stores = (initialState?.stores || []).filter(
    (store) => !demoStores.some((demoStore) => demoStore.id === store.id)
  );
  const stockItems = (initialState?.stockItems || []).filter(
    (stockItem) =>
      !demoStockItems.some((demoStockItem) => demoStockItem.id === stockItem.id)
  );
  return {
    ...initialState,
    stores: [...stores, ...demoStores],
    stockItems: [...stockItems, ...demoStockItems],
  };
}

function removeDemoInventory(initialState?: InventoryStore) {
  return {
    ...initialState,
    stores: (initialState?.stores || []).filter(
      (store) => !demoStores.some((demoStore) => demoStore.id === store.id)
    ),
    stockItems: (initialState?.stockItems || []).filter(
      (stockItem) =>
        !demoStockItems.some(
          (demoStockItem) => demoStockItem.id === stockItem.id
        )
    ),
  };
}

export const InventoryProvider = ({
  children,
  initialState,
}: InventoryProviderProps) => {
  const store = useRef<InventoryStoreAPI>();
  const { demo } = useContext(DemoContext);
  if (!store.current) {
    store.current = createInventoryStore(
      demo
        ? {
            ...initialState,
            ...addDemoInventory(initialState),
          }
        : removeDemoInventory(initialState)
    );
  } else {
    store.current.setState((state) => {
      return {
        ...state,
        ...(demo ? addDemoInventory(state) : removeDemoInventory(state)),
      };
    });
  }

  return (
    <InventoryContext.Provider value={store.current}>
      {children}
    </InventoryContext.Provider>
  );
};

export const CurrentStoreProvider = ({
  children,
  storeId,
}: {
  children: ReactNode;
  storeId: Store["id"];
}) => {
  const inventoryStore = useInventoryStore();
  const store = inventoryStore.stores.find((s) => s.id === storeId);
  return (
    <CurrentStoreContext.Provider value={store}>
      {children}
    </CurrentStoreContext.Provider>
  );
};

export const useInventoryStore = () => {
  const store = useContext(InventoryContext);
  if (!store) {
    throw new Error(
      "useInventoryStore must be used within a InventoryProvider"
    );
  }
  return useStore(store);
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
