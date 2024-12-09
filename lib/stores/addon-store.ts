import { AddOn } from "@/types/menu";
import { createStore } from "zustand/vanilla";
import {
  emitAddOnCreated,
  emitAddOnDeleted,
  emitAddOnSelected,
  emitAddOnUpdated,
} from "../events/addon-events";

export type AddOnState = {
  addOns: AddOn[];
};

export type AddOnActions = {
  createAddOn: (
    data: Omit<AddOn, "id">,
    emitSelected?: boolean
  ) => Promise<void>;
  updateAddOn: (
    addOn: AddOn,
    update: Partial<Omit<AddOn, "id">>
  ) => Promise<void>;
  deleteAddOn: (addOn: AddOn) => Promise<void>;
  getAddOn: (addOnId: string) => Promise<AddOn | undefined>;
  searchAddOns: (query: string) => Promise<AddOn[]>;
};

export type AddOnStore = AddOnState & AddOnActions;

export const defaultAddOnState: AddOnState = {
  addOns: [],
};

export const createAddOnStore = (
  initialState: AddOnState = defaultAddOnState
) => {
  return createStore<AddOnStore>((set) => ({
    ...initialState,
    createAddOn: async (data: Omit<AddOn, "id">, emitSelected?: boolean) => {
      // Create new add-on
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newAddOn: AddOn = {
        ...data,
        id: Math.random().toString(36).slice(2, 9),
      };
      set((state) => {
        return {
          ...state,
          addOns: [...state.addOns, newAddOn],
        };
      });
      emitAddOnCreated({ addOn: newAddOn });
      if (emitSelected) {
        // Emit selected add-on
        emitAddOnSelected({ addOn: newAddOn });
      }
    },
    updateAddOn: async (addOn: AddOn, update: Partial<Omit<AddOn, "id">>) => {
      // Update add-on
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => {
        return {
          ...state,
          addOns: state.addOns.map((a) =>
            a.id === addOn.id ? { ...a, ...update } : a
          ),
        };
      });
      emitAddOnUpdated({ addOn: { ...addOn, ...update } });
    },
    deleteAddOn: async (addOn: AddOn) => {
      // Delete add-on
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => {
        return {
          ...state,
          addOns: state.addOns.filter((a) => a.id !== addOn.id),
        };
      });
      emitAddOnDeleted({ addOn: addOn });
    },
    getAddOn: async (addOnId: string) => {
      // Get add-on
      return new Promise((resolve) => {
        setTimeout(() => {
          const addOn = initialState.addOns.find((a) => a.id === addOnId);
          resolve(addOn);
        }, 1000);
      });
    },
    searchAddOns: async (query: string) => {
      // Search add-ons
      return await new Promise((resolve) => {
        setTimeout(() => {
          const addOns = initialState.addOns.filter((a) =>
            a.name.toLowerCase().includes(query.toLowerCase())
          );
          console.log(`searchAddOns`, query, addOns);
          resolve(addOns);
        }, 1000);
      });
    },
  }));
};
