import { PairedItem } from "@/types/menu";
import { createStore } from "zustand/vanilla";
import {
  emitPairedItemCreated,
  emitPairedItemDeleted,
  emitPairedItemSelected,
  emitPairedItemUpdated,
} from "@/lib/events/pairing-events";

export type PairingState = {
  pairedItems: PairedItem[];
};

export type PairingActions = {
  createPairedItem: (
    data: Omit<PairedItem, "id">,
    emitSelected?: boolean
  ) => Promise<void>;
  updatePairedItem: (
    pairedItem: PairedItem,
    update: Partial<Omit<PairedItem, "id">>
  ) => Promise<void>;
  deletePairedItem: (pairedItem: PairedItem) => Promise<void>;
  getPairedItem: (pairedItemId: string) => Promise<PairedItem | undefined>;
  searchPairedItems: (query: string) => Promise<PairedItem[]>;
};

export type PairingStore = PairingState & PairingActions;

export const defaultPairingState: PairingState = {
  pairedItems: [],
};

export const createPairingStore = (
  initialState: PairingState = defaultPairingState
) => {
  return createStore<PairingStore>((set) => ({
    ...initialState,
    createPairedItem: async (
      data: Omit<PairedItem, "id">,
      emitSelected?: boolean
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newPairedItem: PairedItem = {
        ...data,
        id: Math.random().toString(36).slice(2, 9),
      };
      set((state) => ({
        ...state,
        pairedItems: [...state.pairedItems, newPairedItem],
      }));
      emitPairedItemCreated({ pairedItem: newPairedItem });
      if (emitSelected) {
        emitPairedItemSelected({ pairedItem: newPairedItem });
      }
    },
    updatePairedItem: async (
      pairedItem: PairedItem,
      update: Partial<Omit<PairedItem, "id">>
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        ...state,
        pairedItems: state.pairedItems.map((p) =>
          p.id === pairedItem.id ? { ...p, ...update } : p
        ),
      }));
      emitPairedItemUpdated({ pairedItem: { ...pairedItem, ...update } });
    },
    deletePairedItem: async (pairedItem: PairedItem) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        ...state,
        pairedItems: state.pairedItems.filter((p) => p.id !== pairedItem.id),
      }));
      emitPairedItemDeleted({ pairedItem });
    },
    getPairedItem: async (pairedItemId: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const pairedItem = initialState.pairedItems.find(
            (p) => p.id === pairedItemId
          );
          resolve(pairedItem);
        }, 1000);
      });
    },
    searchPairedItems: async (query: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const pairedItems = initialState.pairedItems.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
          );
          resolve(pairedItems);
        }, 1000);
      });
    },
  }));
};
