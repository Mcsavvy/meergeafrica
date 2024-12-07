import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DurationInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  onChange: (value: { hours: number; minutes: number }) => void;
  value?: { hours: number; minutes: number };
}

const DurationInput = forwardRef<HTMLInputElement, DurationInputProps>(
  (
    { value = { hours: 0, minutes: 0 }, onChange, className = "", ...props },
    ref
  ) => {
    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const hours = parseInt(e.target.value.replace(/\D/g, ""));
      onChange({ ...value, hours });
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const minutes = parseInt(e.target.value.replace(/\D/g, ""));
      onChange({ ...value, minutes });
    };

    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Input
            ref={ref}
            type="number"
            inputMode="numeric"
            value={value.hours}
            onChange={handleHoursChange}
            className={cn("w-16 text-center", className)}
            placeholder="00"
            max={23}
            min={0}
            {...props}
          />
          <span className="text-sm">Hrs</span>
        </div>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            inputMode="numeric"
            value={value.minutes}
            onChange={handleMinutesChange}
            className={cn("w-16 text-center", className)}
            placeholder="00"
            max={59}
            min={0}
            {...props}
          />
          <span className="text-sm">Mins</span>
        </div>
      </div>
    );
  }
);

DurationInput.displayName = "DurationInput";

export default DurationInput;
