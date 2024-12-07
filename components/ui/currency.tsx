import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";

type NairaInputProps = React.ComponentProps<"input"> & {
  value?: number;
  onChange?: (value: number) => void;
};

export const NairaInput = React.forwardRef<HTMLInputElement, NairaInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (onChange) {
        onChange(parseFloat(value));
      }
    };

    return (
      <div className="relative">
        <Input
          value={value}
          onChange={handleChange}
          className={cn("font-mono pl-10", className)}
          ref={ref}
          {...props}
        />
        <span className="absolute inset-y-0 left-2 flex items-center pr-3 text-sm text-gray-400">
          NGN
        </span>
      </div>
    );
  }
);

NairaInput.displayName = "NairaINput";
