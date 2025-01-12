import {
  Store,
  StockItem,
  StoreCreate,
  StockItemCreate,
  StockItemUpdate,
} from "../schemaSupplier/inventory";
import { create } from "zustand";
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
  deactivateStockItem: (id: string, password: string) => Promise<void>;
};

export type InventoryStore = InventoryState & InventoryActions;

const STORAGE_KEY = 'supplier_inventory';

const loadPersistedState = (): InventoryState => {
  if (typeof window === 'undefined') return defaultInventoryState;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultInventoryState;
    
    const parsed = JSON.parse(stored);
    return {
      stores: parsed.stores || [],
      stockItems: parsed.stockItems || [],
    };
  } catch (error) {
    console.error('Failed to load persisted inventory state:', error);
    return defaultInventoryState;
  }
};

const persistState = (state: InventoryState) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      stores: state.stores,
      stockItems: state.stockItems,
    }));
  } catch (error) {
    console.error('Failed to persist inventory state:', error);
  }
};

const defaultInventoryState: InventoryState = {
  stores: [],
  stockItems: [],
};

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  ...loadPersistedState(),
  createStore: async (data: StoreCreate) => {
    try {
      const newStore: Store = {
        ...data,
        id: crypto.randomUUID(),
        image: data.image
          ? await convertToBase64(data.image as File)
          : undefined,
      };
      
      set((state) => {
        const newState = {
          stores: [...state.stores, newStore],
          stockItems: state.stockItems,
        };
        persistState(newState);
        return newState;
      });
      
      return newStore;
    } catch (error) {
      console.error('Failed to create store:', error);
      throw new Error('Failed to create store. Please try again.');
    }
  },
  searchStores: async (query: string) => {
    const state = get();
    return state.stores.filter((store) =>
      store.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  createStockItem: async (data: StockItemCreate) => {
    try {
      const newStockItem: StockItem = {
        ...data,
        id: crypto.randomUUID(),
        isActive: true,
        createdAt: new Date().toISOString(),
        image: data.image
          ? await convertToBase64(data.image as File)
          : undefined,
      };
      
      set((state) => {
        const newState = {
          stores: state.stores,
          stockItems: [...state.stockItems, newStockItem],
        };
        persistState(newState);
        return newState;
      });
      
      return newStockItem;
    } catch (error) {
      console.error('Failed to create stock item:', error);
      throw new Error('Failed to create stock item. Please try again.');
    }
  },
  updateStockItem: async (stockItem: StockItem, update: StockItemUpdate) => {
    try {
      set((state) => {
        const index = state.stockItems.findIndex((item) => item.id === stockItem.id);
        if (index === -1) {
          throw new Error('Stock item not found');
        }

        // Convert File to string if present in the update
        const processedUpdate = {
          ...update,
          image: update.image instanceof File ? URL.createObjectURL(update.image) : update.image,
        };

        const updatedItem = {
          ...stockItem,
          ...processedUpdate,
          updatedAt: new Date().toISOString(),
        };

        const newStockItems = [...state.stockItems];
        newStockItems[index] = updatedItem;

        const newState = {
          stores: state.stores,
          stockItems: newStockItems,
        };
        persistState(newState);
        return newState;
      });
    } catch (error) {
      console.error('Failed to update stock item:', error);
      throw new Error('Failed to update stock item. Please try again.');
    }
  },
  searchStockItems: async (query: string) => {
    const state = get();
    return state.stockItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  deleteStockItem: async (stockItemId: StockItem["id"]) => {
    try {
      set((state) => {
        const newState = {
          stores: state.stores,
          stockItems: state.stockItems.filter((item) => item.id !== stockItemId),
        };
        persistState(newState);
        return newState;
      });
    } catch (error) {
      console.error('Failed to delete stock item:', error);
      throw new Error('Failed to delete stock item. Please try again.');
    }
  },
  deactivateStockItem: async (id: string, password: string) => {
    // Validate password - in a real app, this would be done on the server
    if (password !== '123456') {
      throw new Error('Invalid password');
    }

    try {
      set((state) => {
        const index = state.stockItems.findIndex(item => item.id === id);
        if (index === -1) {
          throw new Error('Stock item not found');
        }

        const deactivationDate = new Date().toISOString();

        const newStockItems = [...state.stockItems];
        newStockItems[index] = {
          ...newStockItems[index],
          isActive: false,
          deactivatedAt: deactivationDate,
          lastKnownQuantity: newStockItems[index].quantity,
          quantity: 0,
          deactivationReason: 'Manual deactivation by user'
        };

        const newState = {
          ...state,
          stockItems: newStockItems
        };
        persistState(newState);
        return newState;
      });
    } catch (error) {
      console.error('Failed to deactivate stock item:', error);
      throw new Error('Failed to deactivate stock item. Please try again.');
    }
  }
}));
