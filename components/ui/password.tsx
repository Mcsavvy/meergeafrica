import React from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  loading?: boolean;
};

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        ref={ref}
        className="pr-10"
      />
      {
        // Show loading spinner if loading
        props.loading ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin h-5 w-5 text-secondary" />
          </div>
        ) : (
          <Button
            type="button"
            size={"icon"}
            variant={"link"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        )
      }
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
