import { AddOn, PairedItem } from "@/types/menu";
import { useAddOnStore } from "../contexts/addon-context";
import { usePairingStore } from "../contexts/pairing-context";

export const useAddOn = (id: AddOn["id"]) => {
  const { addOns } = useAddOnStore();
  return addOns.find((addOn) => addOn.id === id);
};

export const useAddOns = (ids: AddOn["id"][]) => {
  const { addOns } = useAddOnStore();
  return addOns.filter((addOn) => ids.includes(addOn.id));
};

export const usePairedItem = (id: PairedItem["id"]) => {
  const { pairedItems } = usePairingStore();
  return pairedItems.find((pairedItem) => pairedItem.id === id);
};

export const usePairedItems = (ids: PairedItem["id"][]) => {
  const { pairedItems } = usePairingStore();
  return pairedItems.filter((pairedItem) => ids.includes(pairedItem.id));
};
