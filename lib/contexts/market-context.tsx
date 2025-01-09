"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createMarketStore, MarketState } from "@/lib/stores/market-store";
import { DemoContext } from "./demo";
import { demoProducts } from "@/data";
import { Product } from "../schema/market";

export type MarketStoreAPI = ReturnType<typeof createMarketStore>;

const MarketContext = createContext<MarketStoreAPI | undefined>(undefined);

export interface MarketProviderProps {
  children: ReactNode;
  initialState?: MarketState;
}

function addDemoProducts(existingProducts: Product[] = []): Product[] {
  // Filter out existing demo products
  const filteredExistingProducts = existingProducts.filter(
    (product) => !demoProducts.some((demo) => demo.id === product.id)
  );

  // Combine with demo products
  const allProducts = [...filteredExistingProducts, ...demoProducts];

  return allProducts;
}

function removeDemoProducts(existingProducts: Product[] = []): Product[] {
  return existingProducts.filter(
    (product) => !demoProducts.some((demo) => demo.id === product.id)
  );
}

export const MarketProvider = ({
  children,
  initialState,
}: MarketProviderProps) => {
  const store = useRef<MarketStoreAPI>();
  const { demo } = useContext(DemoContext);

  if (!store.current) {
    store.current = createMarketStore(
      demo
        ? {
            cart: initialState?.cart || [],
            orders: initialState?.orders || [],
            isLoading: initialState?.isLoading || false,
            filter: initialState?.filter || { search: "", category: "" },
            products: addDemoProducts(initialState?.products),
          }
        : {
            cart: initialState?.cart || [],
            orders: initialState?.orders || [],
            isLoading: initialState?.isLoading || false,
            filter: initialState?.filter || { search: "", category: "" },
            products: removeDemoProducts(initialState?.products),
          }
    );
  } else {
    store.current.setState((state) => ({
      ...state,
      ...(demo
        ? { products: addDemoProducts(state.products) }
        : { products: removeDemoProducts(state.products) }),
    }));
  }

  return (
    <MarketContext.Provider value={store.current}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const store = useContext(MarketContext);
  if (!store) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return useStore(store);
};
