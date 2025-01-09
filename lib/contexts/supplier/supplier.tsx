"use client";
import { createContext } from "react";

export type Supplier = {
  id: number;
  name: string;
  slug: string;
};

const SupplierContext = createContext<Supplier>({
  id: 0,
  name: "Demo Supplier",
  slug: "demo",
});

const SupplierProvider: React.FC<{
  children: React.ReactNode;
  restaurant: Supplier;
}> = ({ children, restaurant }) => {
  return (
    <SupplierContext.Provider value={restaurant}>
      {children}
    </SupplierContext.Provider>
  );
};

export { SupplierContext, SupplierProvider };
