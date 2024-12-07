import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";

type NairaInputProps = React.ComponentProps<"input"> & {
  value?: string;
  onChange?: (value: string) => void;
};

export const NairaInput = React.forwardRef<HTMLInputElement, NairaInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const formatValue = (val: string) => {
      // Remove non-digit characters except decimal point
      let cleaned = val.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = cleaned.split(".");
      if (parts.length > 2) {
        cleaned = `${parts[0]}.${parts[1]}`;
      }

      // Limit to 2 decimal places
      if (parts.length === 2 && parts[1].length > 2) {
        cleaned = `${parts[0]}.${parts[1].slice(0, 2)}`;
      }

      // Add thousand separators
      const [integer, decimal] = cleaned.split(".");
      const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return `₦${formatted}${decimal ? `.${decimal}` : ""}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formattedValue = formatValue(rawValue);
      onChange?.(formattedValue);
    };

    return (
      <Input
        value={value}
        onChange={handleChange}
        className={cn("font-mono", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

NairaInput.displayName = "NairaINput";
