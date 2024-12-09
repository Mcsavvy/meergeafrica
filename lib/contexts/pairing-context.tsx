"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { PairingState, createPairingStore } from "@/lib/stores/pairing-store";
import { DemoContext } from "./demo";
import { demoPairedItems } from "@/data";

export type PairingStoreAPI = ReturnType<typeof createPairingStore>;

const PairingContext = createContext<PairingStoreAPI | undefined>(undefined);

export interface PairingProviderProps {
  children: ReactNode;
  initialState?: PairingState;
}

function addDemoPairedItems(initialState?: PairingState) {
  const pairedItems = (initialState?.pairedItems || []).filter(
    (item) => !demoPairedItems.some((demoItem) => demoItem.id === item.id)
  );
  return {
    ...initialState,
    pairedItems: [...pairedItems, ...demoPairedItems],
  };
}

function removeDemoPairedItems(initialState?: PairingState) {
  return {
    ...initialState,
    pairedItems: (initialState?.pairedItems || []).filter(
      (item) => !demoPairedItems.some((demoItem) => demoItem.id === item.id)
    ),
  };
}

export const PairingProvider = ({
  children,
  initialState,
}: PairingProviderProps) => {
  const { demo } = useContext(DemoContext);
  const store = useRef<PairingStoreAPI>();
  if (!store.current) {
    store.current = createPairingStore(
      demo
        ? {
            ...initialState,
            ...addDemoPairedItems(initialState),
          }
        : removeDemoPairedItems(initialState)
    );
  } else {
    store.current.setState((state) => {
      return {
        ...state,
        ...(demo ? addDemoPairedItems(state) : removeDemoPairedItems(state)),
      };
    });
  }
  return (
    <PairingContext.Provider value={store.current}>
      {children}
    </PairingContext.Provider>
  );
};

export const usePairingStore = () => {
  const store = useContext(PairingContext);
  if (!store) {
    throw new Error("usePairingStore must be used within a PairingProvider");
  }
  return useStore(store);
};
