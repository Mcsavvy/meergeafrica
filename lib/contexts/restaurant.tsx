"use client";
import { createContext } from "react";

export type Restaurant = {
  id: number;
  name: string;
  slug: string;
};

const RestaurantContext = createContext<Restaurant>({
  id: 0,
  name: "Demo Restaurant",
  slug: "demo",
});

const RestaurantProvider: React.FC<{
  children: React.ReactNode;
  restaurant: Restaurant;
}> = ({ children, restaurant }) => {
  return (
    <RestaurantContext.Provider value={restaurant}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
