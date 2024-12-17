import React, { useCallback, useEffect, useMemo } from "react";
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
} from "@/lib/events/pairing-events";
import { usePairedItems } from "@/lib/hooks/menu";

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

const SelectPairedItems = React.forwardRef<
  HTMLElement,
  {
    value?: PairedItem["id"][];
    onChange: (items: PairedItem["id"][]) => void;
  }
>(({ value = [], onChange }) => {
  const pairedItems = usePairedItems(value);

  const handlePairedItemRemove = (pairedItemId: string) => {
    onChange(
      pairedItems
        .filter((item) => item.id !== pairedItemId)
        .map((item) => item.id)
    );
  };

  useEffect(() => {
    return onPairedItemSelected((e) => {
      onChange([...pairedItems.map((item) => item.id), e.detail.pairedItem.id]);
    });
  }, [onChange, pairedItems]);

  return (
    <>
      <PairingSelector selectedPairedItems={pairedItems} />
      <div className="flex items-center flex-wrap gap-2">
        {pairedItems.map((item) => (
          <SelectedPairedItem
            pairedItem={item}
            key={item.id}
            removePairedItem={() => handlePairedItemRemove(item.id)}
          />
        ))}
      </div>
    </>
  );
});

SelectPairedItems.displayName = "SelectPairedItems";

export default SelectPairedItems;
