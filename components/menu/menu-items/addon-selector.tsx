import React, { useCallback, useEffect, useMemo } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Pencil, Trash2 } from "lucide-react";
import { AddOn } from "@/types/menu";
import Image from "next/image";
import { useAddOnStore } from "@/lib/contexts/addon-context";
import {
  emitAddOnCreate,
  emitAddOnSelected,
  emitAddOnUpdate,
  onAddOnSelected,
} from "@/lib/events/addon-events";
import { useAddOns } from "@/lib/hooks/menu";

interface AddOnOption {
  value: string;
  label: string;
  addOn?: AddOn;
}

interface AddOnSelectorProps {
  selectedAddOns: AddOn[];
}

export const AddOnSelector: React.FC<AddOnSelectorProps> = ({
  selectedAddOns,
}) => {
  const { addOns } = useAddOnStore();
  // Convert addOns to options format
  const options: AddOnOption[] = useMemo(
    () =>
      addOns.map((addOn) => ({
        value: addOn.id,
        label: addOn.name,
        addOn,
      })),
    [addOns]
  );
  // Filter out already selected add-ons
  const availableOptions = useMemo(
    () =>
      options.filter(
        (option) => !selectedAddOns.some((a) => a.id === option.value)
      ),
    [options, selectedAddOns]
  );

  const searchAddOns = useCallback(
    async (input: string): Promise<AddOnOption[]> => {
      return await new Promise((resolve) =>
        setTimeout(() => {
          const addOns = options.filter((a) =>
            a.label.toLowerCase().includes(input.toLowerCase())
          );
          resolve(addOns);
        }, 1000)
      );
    },
    [options]
  );

  return (
    <div className="space-y-4">
      <AsyncCreatableSelect<AddOnOption>
        options={availableOptions}
        value={null}
        loadOptions={searchAddOns}
        defaultOptions={availableOptions}
        placeholder="Search add-ons"
        formatCreateLabel={(input) => `Create add-on "${input}"`}
        onChange={(option) => {
          if (option?.addOn) {
            emitAddOnSelected({ addOn: option.addOn });
          }
        }}
        onCreateOption={(input) => {
          emitAddOnCreate({ name: input });
        }}
        isClearable={false}
      />
    </div>
  );
};

const SelectedAddOn = ({
  addOn,
  removeAddon,
}: {
  addOn: AddOn;
  removeAddon: () => void;
}) => {
  return (
    <div className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      {addOn.image && (
        <div className="w-8 h-8 flex-shrink-0">
          <Image
            src={addOn.image}
            alt={addOn.name}
            width={32}
            height={32}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-grow ml-4">
        <h3 className="font-semibold text-gray-800">{addOn.name}</h3>
        <p className="text-green-600 text-xs">₦{addOn.price.toFixed(2)}</p>
      </div>
      <div className="flex gap-1 ml-2">
        <button
          type="button"
          onClick={() => emitAddOnUpdate({ addOn })}
          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={removeAddon}
          type="button"
          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const SelectAddons = React.forwardRef<
  HTMLElement,
  {
    value?: AddOn["id"][];
    onChange: (value: AddOn["id"][]) => void;
  }
>(({ value = [], onChange }) => {
  const addOns = useAddOns(value);

  const handleAddOnRemove = (addOnId: string) => {
    onChange(addOns.filter((a) => a.id !== addOnId).map((a) => a.id));
  };

  useEffect(() => {
    return onAddOnSelected((e) => {
      onChange([...addOns.map((a) => a.id), e.detail.addOn.id]);
    });
  }, [onChange, addOns]);
  return (
    <>
      <AddOnSelector selectedAddOns={addOns} />
      <div className="flex items-center flex-wrap gap-2">
        {addOns.map((addOn) => (
          <SelectedAddOn
            addOn={addOn}
            key={addOn.id}
            removeAddon={() => handleAddOnRemove(addOn.id)}
          />
        ))}
      </div>
    </>
  );
});

SelectAddons.displayName = "SelectAddons";

export default SelectAddons;
