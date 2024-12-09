"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  MenuItemsStore,
  createMenuItemsStore,
} from "@/lib/stores/menu-items-store";
import { DemoContext } from "./demo";
import { demoMenuItems } from "@/data";

export type MenuItemsStoreAPI = ReturnType<typeof createMenuItemsStore>;

const MenuItemsContext = createContext<MenuItemsStoreAPI | undefined>(
  undefined
);

export interface MenuItemsProviderProps {
  children: ReactNode;
  initialState?: MenuItemsStore;
}

function addDemoMenuItems(initialState?: MenuItemsStore) {
  const menuItems = (initialState?.menuItems || []).filter(
    (item) => !demoMenuItems.some((demoItem) => demoItem.id === item.id)
  );
  return {
    ...initialState,
    menuItems: [...menuItems, ...demoMenuItems],
  };
}

function removeDemoMenuItems(initialState?: MenuItemsStore) {
  return {
    ...initialState,
    menuItems: (initialState?.menuItems || []).filter(
      (item) => !demoMenuItems.some((demoItem) => demoItem.id === item.id)
    ),
  };
}

export const MenuItemsProvider = ({
  children,
  initialState,
}: MenuItemsProviderProps) => {
  const store = useRef<MenuItemsStoreAPI>();
  const { demo } = useContext(DemoContext);
  if (!store.current) {
    store.current = createMenuItemsStore(
      demo
        ? {
            ...initialState,
            ...addDemoMenuItems(initialState),
          }
        : removeDemoMenuItems(initialState)
    );
  } else {
    store.current.setState((state) => {
      return {
        ...state,
        ...(demo ? addDemoMenuItems(state) : removeDemoMenuItems(state)),
      };
    });
  }
  return (
    <MenuItemsContext.Provider value={store.current}>
      {children}
    </MenuItemsContext.Provider>
  );
};

export const useMenuItemsStore = () => {
  const store = useContext(MenuItemsContext);
  if (!store) {
    throw new Error(
      "useMenuItemsStore must be used within a MenuItemsProvider"
    );
  }
  return useStore(store);
};
