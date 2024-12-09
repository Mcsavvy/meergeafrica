"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { AddOnState, createAddOnStore } from "@/lib/stores/addon-store";
import { DemoContext } from "./demo";
import { demoAddOns } from "@/data";

export type AddOnStoreAPI = ReturnType<typeof createAddOnStore>;

const AddOnContext = createContext<AddOnStoreAPI | undefined>(undefined);

export interface AddOnProviderProps {
  children: ReactNode;
  initialState?: AddOnState;
}

function addDemoAddOns(initialState?: AddOnState) {
  const addOns = (initialState?.addOns || []).filter(
    (item) => !demoAddOns.some((demoItem) => demoItem.id === item.id)
  );
  return {
    ...initialState,
    addOns: [...addOns, ...demoAddOns],
  };
}

function removeDemoAddOns(initialState?: AddOnState) {
  return {
    ...initialState,
    addOns: (initialState?.addOns || []).filter(
      (item) => !demoAddOns.some((demoItem) => demoItem.id === item.id)
    ),
  };
}

export const AddOnProvider = ({
  children,
  initialState,
}: AddOnProviderProps) => {
  const store = useRef<AddOnStoreAPI>();
  const { demo } = useContext(DemoContext);
  if (!store.current) {
    store.current = createAddOnStore(
      demo
        ? {
            ...initialState,
            ...addDemoAddOns(initialState),
          }
        : removeDemoAddOns(initialState)
    );
  } else {
    store.current.setState((state) => {
      return {
        ...state,
        ...(demo ? addDemoAddOns(state) : removeDemoAddOns(state)),
      };
    });
  }
  return (
    <AddOnContext.Provider value={store.current}>
      {children}
    </AddOnContext.Provider>
  );
};

export const useAddOnStore = () => {
  const store = useContext(AddOnContext);
  if (!store) {
    throw new Error("useAddOnStore must be used within a AddOnProvider");
  }
  return useStore(store);
};
