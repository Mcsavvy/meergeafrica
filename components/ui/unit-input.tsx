import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Unit {
  value: string;
  label: string;
}

interface UnitInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value?: { amount: number; unit: string };
  units: Unit[];
  onChange?: (value: { amount: number; unit: string }) => void;
}

const UnitInput = React.forwardRef<HTMLInputElement, UnitInputProps>(
  (
    {
      units,
      value = { amount: 0, unit: units[0] },
      onChange,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only numbers and decimal point
      const newAmount = parseFloat(e.target.value.replace(/[^\d.]/g, ""));

      onChange?.({
        ...{
          amount: value,
          unit: typeof value.unit === "string" ? value.unit : value.unit.value,
        },
        amount: newAmount,
      });
    };

    const handleUnitChange = (unit: string) => {
      onChange?.({ ...value, unit });
    };

    return (
      <div className="flex gap-2">
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          disabled={disabled}
          value={value.amount}
          onChange={handleAmountChange}
          className={cn("w-32", className)}
          {...props}
        />
        <Select
          value={typeof value.unit === "string" ? value.unit : value.unit.value}
          onValueChange={handleUnitChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit.value} value={unit.value}>
                {unit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

UnitInput.displayName = "UnitInput";

export default UnitInput;
