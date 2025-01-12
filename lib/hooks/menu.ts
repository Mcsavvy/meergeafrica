import { AddOn, PairedItem } from "@/types/menu";
import { useAddOnStore } from "../contexts/addon-context";
import { usePairingStore } from "../contexts/pairing-context";
import { useMemo } from "react";

export const useAddOn = (id: AddOn["id"]) => {
  const { addOns: allAddOns } = useAddOnStore();
  const addOn = useMemo(() => {
    return allAddOns.find((addOn) => addOn.id === id);
  }, [id, allAddOns]);
  return addOn;
};

export const useAddOns = (ids: AddOn["id"][]) => {
  const { addOns: allAddOns } = useAddOnStore();
  const addOns = useMemo(() => {
    return allAddOns.filter((addOn) => ids.includes(addOn.id));
  }, [ids, allAddOns]);
  return addOns;
};

export const usePairedItem = (id: PairedItem["id"]) => {
  const { pairedItems } = usePairingStore();
  const pairedItem = useMemo(() => {
    return pairedItems.find((pairedItem) => pairedItem.id === id);
  }, [id, pairedItems]);
  return pairedItem;
};

export const usePairedItems = (ids: PairedItem["id"][]) => {
  const { pairedItems: allPairedItems } = usePairingStore();
  const pairedItems = useMemo(() => {
    return allPairedItems.filter((pairedItem) => ids.includes(pairedItem.id));
  }, [ids, allPairedItems]);
  return pairedItems;
};
