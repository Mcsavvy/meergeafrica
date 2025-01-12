import React, { FC } from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";
interface logoProps {
  text?: string;
}
const FormHeader: FC<logoProps> = ({ text }) => {
  return (
    <div className="flex justify-center flex-col">
      <div className="flex items-center gap-3 justify-center">
        <Image
          src={logo}
          alt="Logo Image"
          width={70}
          height={70}
          className="object-contain"
        />
        <span className="text-primary text-3xl font-semibold text-[40px]">
          Meerge Africa
        </span>
      </div>
      <div className="text-center text-3xl text-[30px] my-2">
        {text || "Let's get you started"}
      </div>
      <div className="text-center mb-4">
        Enter your credentials to get started
      </div>
    </div>
  );
};

export default FormHeader;
