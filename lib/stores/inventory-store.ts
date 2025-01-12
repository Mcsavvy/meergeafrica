import {
  Store,
  StockItem,
  StoreCreate,
  StockItemCreate,
  StockItemUpdate,
} from "../schema/inventory";
import { createStore } from "zustand/vanilla";
import { convertToBase64 } from "../utils";

export type InventoryState = {
  stores: Store[];
  stockItems: StockItem[];
};

export type InventoryActions = {
  createStore: (data: StoreCreate) => Promise<Store>;
  searchStores: (query: string) => Promise<Store[]>;
  createStockItem: (data: StockItemCreate) => Promise<StockItem>;
  updateStockItem: (
    stockItem: StockItem,
    update: StockItemUpdate
  ) => Promise<void>;
  searchStockItems: (query: string) => Promise<StockItem[]>;
  deleteStockItem: (stockItemId: StockItem["id"]) => Promise<void>;
};

export type InventoryStore = InventoryState & InventoryActions;

export const defaultInventoryState: InventoryState = {
  stores: [],
  stockItems: [],
};

export const createInventoryStore = (
  initialState: InventoryState = defaultInventoryState
) => {
  return createStore<InventoryStore>((set) => ({
    ...initialState,
    createStore: async (data: StoreCreate) => {
      // Create new store
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newStore: Store = {
        ...data,
        id: Math.random().toString(36).slice(2, 9),
        image: data.image
          ? await convertToBase64(data.image as File)
          : undefined,
      };
      set((state) => ({
        stores: [...state.stores, newStore],
        stockItems: state.stockItems,
      }));
      return newStore;
    },
    searchStores: async (query: string) => {
      // Search stores
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return initialState.stores.filter((store) =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    createStockItem: async (data: StockItemCreate) => {
      // Create new stock item
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newStockItem: StockItem = {
        ...data,
        id: Math.random().toString(36).slice(2, 9),
        image: data.image
          ? await convertToBase64(data.image as File)
          : undefined,
      };
      set((state) => ({
        stores: state.stores,
        stockItems: [...state.stockItems, newStockItem],
      }));
      return newStockItem;
    },
    updateStockItem: async (stockItem, update) => {
      // Update stock item
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const image = update.image
        ? typeof update.image === "string"
          ? update.image
          : await convertToBase64(update.image as File)
        : stockItem.image;

      set((state) => ({
        stores: state.stores,
        stockItems: state.stockItems.map((item) =>
          item.id === stockItem.id ? { ...stockItem, ...update, image } : item
        ),
      }));
    },
    searchStockItems: async (query: string) => {
      // Search stock items
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return initialState.stockItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    deleteStockItem: async (stockItemId) =>
      set((state) => ({
        stores: state.stores,
        stockItems: state.stockItems.filter((item) => item.id !== stockItemId),
      })),
  }));
};
