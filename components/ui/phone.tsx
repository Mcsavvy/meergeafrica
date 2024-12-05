import * as React from "react";
import { Input } from "./input";
import Image from "next/image";


export const PhoneInput = React.forwardRef<HTMLInputElement, Omit<React.ComponentProps<"input">, "type">>(
  (props, ref) => {
    return (
      <div className="flex">
        <div className="flex items-center border border-r-0 rounded-l-lg px-3 shrink-0">
          <Image src="/assets/svgs/nigeria.svg" alt="Nigeria flag" width={20} height={15} className="mr-1" />
          <span className="text-sm">+234</span>
        </div>
        <Input type="tel" {...props} className="border-l-0 rounded-l-none" ref={ref}/>
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";