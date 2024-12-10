import { AddOn, MenuItem, PairedItem } from "@/types/menu";
import { createStore } from "zustand/vanilla";
import { convertToBase64 } from "../utils";

export type MenuItemsState = {
  menuItems: MenuItem[];
};

type CreateMenuItemData = Omit<
  MenuItem,
  "id" | "addOns" | "pairedItems" | "image"
> & {
  image?: File | string;
  addOns: AddOn["id"][];
  pairedItems: PairedItem["id"][];
};

type UpdateMenuItemData = Partial<
  Omit<MenuItem, "id" | "addOns" | "pairedItems" | "image">
> & {
  image?: File | string;
  addOns?: AddOn["id"][];
  pairedItems?: PairedItem["id"][];
};

export type MenuItemsActions = {
  createMenuItem: (data: CreateMenuItemData) => Promise<void>;
  updateMenuItem: (
    menuItem: MenuItem,
    update: UpdateMenuItemData
  ) => Promise<void>;
  deleteMenuItem: (menuItem: MenuItem) => Promise<void>;
  getMenuItem: (menuItem: string) => Promise<MenuItem | undefined>;
  searchMenuItems: (query: string) => Promise<MenuItem[]>;
};

export type MenuItemsStore = MenuItemsState & MenuItemsActions;

export const defaultMenuItemsState: MenuItemsState = {
  menuItems: [],
};

export const createMenuItemsStore = (
  initialState: MenuItemsState = defaultMenuItemsState
) => {
  return createStore<MenuItemsStore>((set) => ({
    ...initialState,
    createMenuItem: async (data: CreateMenuItemData) => {
      // Create new menu item
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newMenuItem: MenuItem = {
        ...data,
        addOns: data.addOns.map((id) => id),
        pairedItems: data.pairedItems.map((id) => id),
        image:
          typeof data.image == "string"
            ? data.image
            : await convertToBase64(data.image as File),
        id: Math.random().toString(36).slice(2, 9),
      };
      set((state) => {
        return {
          ...state,
          menuItems: [...state.menuItems, newMenuItem],
        };
      });
    },
    updateMenuItem: async (menuItem: MenuItem, update: UpdateMenuItemData) => {
      // Update menu item
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const image = update.image
        ? typeof update.image == "string"
          ? update.image
          : await convertToBase64(update.image as File)
        : menuItem.image;
      set((state) => {
        const index = state.menuItems.findIndex((m) => m.id === menuItem.id);
        if (index === -1) return state;
        const updatedMenuItem = {
          ...menuItem,
          ...update,
          addOns: update.addOns
            ? update.addOns.map((id) => id)
            : menuItem.addOns,
          pairedItems: update.pairedItems
            ? update.pairedItems.map((id) => id)
            : menuItem.pairedItems,
          image: image,
        };
        state.menuItems[index] = updatedMenuItem;
        return {
          ...state,
          menuItems: [...state.menuItems],
        };
      });
    },
    deleteMenuItem: async (menuItem: MenuItem) => {
      // Delete menu item
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => {
        return {
          ...state,
          menuItems: state.menuItems.filter((m) => m.id !== menuItem.id),
        };
      });
    },
    getMenuItem: async (menuItem: string) => {
      // Get menu item
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return initialState.menuItems.find((m) => m.id === menuItem);
    },
    searchMenuItems: async (query: string) => {
      // Search menu items
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return initialState.menuItems.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase())
      );
    },
  }));
};
