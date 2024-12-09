import React, { useCallback, useEffect, useMemo, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Pencil, Trash2 } from "lucide-react";
import { PairedItem } from "@/types/menu";
import Image from "next/image";
import { usePairingStore } from "@/lib/contexts/pairing-context";
import {
  emitPairedItemCreate,
  emitPairedItemSelected,
  emitPairedItemUpdate,
  onPairedItemSelected,
  onPairedItemUpdated,
  PairedItemUpdatedEvent,
} from "@/lib/events/pairing-events";

interface PairedItemOption {
  value: string;
  label: string;
  pairedItem?: PairedItem;
}

interface PairingComponentsProps {
  selectedPairedItems: PairedItem[];
}

export const PairingSelector: React.FC<PairingComponentsProps> = ({
  selectedPairedItems,
}) => {
  const { pairedItems } = usePairingStore();

  const options: PairedItemOption[] = useMemo(
    () =>
      pairedItems.map((item) => ({
        value: item.id,
        label: item.name,
        pairedItem: item,
      })),
    [pairedItems]
  );

  const availableOptions = useMemo(
    () =>
      options.filter(
        (option) => !selectedPairedItems.some((p) => p.id === option.value)
      ),
    [options, selectedPairedItems]
  );

  const searchPairedItems = useCallback(
    async (input: string): Promise<PairedItemOption[]> => {
      return new Promise((resolve) =>
        setTimeout(() => {
          const items = options.filter((p) =>
            p.label.toLowerCase().includes(input.toLowerCase())
          );
          resolve(items);
        }, 1000)
      );
    },
    [options]
  );

  return (
    <div className="space-y-4">
      <AsyncCreatableSelect<PairedItemOption>
        options={availableOptions}
        value={null}
        loadOptions={searchPairedItems}
        defaultOptions={availableOptions}
        placeholder="Search paired items"
        formatCreateLabel={(input) => `Create paired item "${input}"`}
        onChange={(option) => {
          if (option?.pairedItem) {
            emitPairedItemSelected({ pairedItem: option.pairedItem });
          }
        }}
        onCreateOption={(input) => {
          emitPairedItemCreate({ name: input });
        }}
        isClearable={false}
      />
    </div>
  );
};

export const SelectedPairedItem = ({
  pairedItem,
  removePairedItem,
}: {
  pairedItem: PairedItem;
  removePairedItem: () => void;
}) => {
  return (
    <div className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      {pairedItem.image && (
        <div className="w-8 h-8 flex-shrink-0">
          <Image
            src={pairedItem.image}
            alt={pairedItem.name}
            width={32}
            height={32}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-grow ml-4">
        <h3 className="font-semibold text-gray-800">{pairedItem.name}</h3>
        <p className="text-green-600 text-xs">₦{pairedItem.price.toFixed(2)}</p>
      </div>
      <div className="flex gap-1 ml-2">
        <button
          type="button"
          onClick={() => emitPairedItemUpdate({ pairedItem })}
          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={removePairedItem}
          type="button"
          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const SelectPairedItems = ({
  onChange,
}: {
  onChange: (items: PairedItem["id"][]) => void;
}) => {
  const [selectedPairedItems, setSelectedPairedItems] = useState<PairedItem[]>(
    []
  );

  const handlePairedItemRemove = (pairedItemId: string) => {
    setSelectedPairedItems(
      selectedPairedItems.filter((item) => item.id !== pairedItemId)
    );
  };

  const handlePairedItemUpdated = (e: PairedItemUpdatedEvent) => {
    setSelectedPairedItems((items) =>
      items.map((item) =>
        item.id === e.detail.pairedItem.id ? e.detail.pairedItem : item
      )
    );
  };

  useEffect(() => {
    return onPairedItemSelected((e) => {
      setSelectedPairedItems((items) => [...items, e.detail.pairedItem]);
    });
  }, []);

  useEffect(() => {
    onChange(selectedPairedItems.map((item) => item.id));
  }, [selectedPairedItems, onChange]);

  useEffect(() => {
    return onPairedItemUpdated(handlePairedItemUpdated);
  }, []);

  return (
    <>
      <PairingSelector selectedPairedItems={selectedPairedItems} />
      <div className="flex items-center flex-wrap gap-2">
        {selectedPairedItems.map((item) => (
          <SelectedPairedItem
            pairedItem={item}
            key={item.id}
            removePairedItem={() => handlePairedItemRemove(item.id)}
          />
        ))}
      </div>
    </>
  );
};

export default SelectPairedItems;
