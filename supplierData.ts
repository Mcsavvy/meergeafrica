import { StockItem, Store } from "./lib/schemaSupplier/inventory";
import { uniqueId } from "./lib/utils";

import { AddOn, MenuItem, PairedItem } from "./types/menu";

export const demoAddOns: AddOn[] = [
  {
    id: uniqueId(),
    name: "Plantain",
    price: 500,
    image: "/images/food/plantain.jpg",
  },
  {
    id: uniqueId(),
    name: "ColeSlaw",
    price: 1000,
    image: "/images/food/coleslaw.jpeg",
  },
];

export const demoPairedItems: PairedItem[] = [
  {
    id: uniqueId(),
    name: "Pepsi",
    price: 400,
    image: "/images/food/pepsi.jpg",
  },
  {
    id: uniqueId(),
    name: "Coke",
    price: 450,
    image: "/images/food/coke.jpg",
  },
];

export const demoMenuItems: MenuItem[] = [
  {
    id: uniqueId(),
    price: 1000,
    name: "Jollof Rice",
    category: "Rice Dishes",
    status: "available",
    portions: 2,
    ingredients: "...",
    size: { amount: 1, unit: "kg" },
    readyTime: { hours: 0, minutes: 10 },
    image: "/images/food/food-1.png",
    pairedItems: [demoPairedItems[0].id, demoPairedItems[1].id],
    addOns: [demoAddOns[0].id, demoAddOns[1].id],
  },
  {
    id: uniqueId(),
    name: "Fried Rice",
    price: 1200,
    category: "Rice Dishes",
    status: "unlisted",
    readyTime: { hours: 0, minutes: 10 },
    image: "/images/food/food-2.png",
    portions: 2,
    ingredients: "...",
    size: { amount: 1, unit: "kg" },
    pairedItems: [demoPairedItems[0].id, demoPairedItems[1].id],
    addOns: [demoAddOns[0].id, demoAddOns[1].id],
  },
  {
    id: uniqueId(),
    name: "Grilled Fish with Fried Plantain",
    price: 2500,
    category: "Grills & BBQ",
    status: "available",
    readyTime: { hours: 0, minutes: 10 },
    image: "/images/food/food-3.png",
    portions: 2,
    ingredients: "...",
    size: { amount: 1, unit: "kg" },
    pairedItems: [demoPairedItems[0].id, demoPairedItems[1].id],
    addOns: [demoAddOns[0].id, demoAddOns[1].id],
  },
  {
    id: uniqueId(),
    name: "BBQ Chicken Thighs",
    price: 2000,
    category: "Grills & BBQ",
    status: "unlisted",
    readyTime: { hours: 0, minutes: 10 },
    image: "/images/food/food-4.png",
    portions: 2,
    ingredients: "...",
    size: { amount: 1, unit: "kg" },
    pairedItems: [demoPairedItems[0].id, demoPairedItems[1].id],
    addOns: [demoAddOns[0].id, demoAddOns[1].id],
  },
  {
    id: uniqueId(),
    name: "BBQ Chicken Drumsticks",
    price: 1500,
    category: "Grills & BBQ",
    status: "available",
    readyTime: { hours: 0, minutes: 10 },
    image: "/images/food/food-5.png",
    portions: 2,
    ingredients: "...",
    size: { amount: 1, unit: "kg" },
    pairedItems: [demoPairedItems[0].id, demoPairedItems[1].id],
    addOns: [demoAddOns[0].id, demoAddOns[1].id],
  },
];

export const demoStores: Store[] = [
  {
    id: "default",
    name: "Kadd Stores",
    description: "Main store for general inventory",
    image: "/images/store/store-1.png",
  }
];

export const demoStockItems: StockItem[] = [
  {
    id: uniqueId(),
    name: "Mama Gold Rice",
    store: demoStores[0].id,
    image: "/images/store/mama-gold-rice.jpg",
    expirationDate: { month: 12, year: 2025 },
    measuringUnit: "25kg",
    lowStockThreshold: 5,
    category: "Grain Products",
    purchasePrice: 70000,
    quantity: 20,
    stockType: "Raw",
    isActive: true,
    unit: "bags"
  },
  {
    id: uniqueId(),
    name: "Golden Penny Semovita",
    store: demoStores[0].id,
    image: "/images/store/golden-penny-semovita.jpg",
    expirationDate: { month: 12, year: 2025 },
    measuringUnit: "2kg",
    lowStockThreshold: 5,
    category: "Grain Products",
    purchasePrice: 4000,
    quantity: 10,
    stockType: "Raw",
    isActive: true,
    unit: "bags"
  },
  {
    id: uniqueId(),
    name: "Peak Full Cream Milk",
    store: demoStores[0].id,
    image: "/images/store/peak-milk.jpg",
    expirationDate: { month: 6, year: 2025 },
    measuringUnit: "3l",
    lowStockThreshold: 10,
    category: "Dairy Products",
    purchasePrice: 2000,
    quantity: 20,
    stockType: "Perishable",
    isActive: true,
    unit: "cartons"
  },
  {
    id: uniqueId(),
    name: "King's Vegetable Oil",
    store: demoStores[0].id,
    image: "/images/store/kings-oil.jpg",
    expirationDate: { month: 12, year: 2025 },
    measuringUnit: "25kg",
    lowStockThreshold: 8,
    category: "Oil & Fat",
    purchasePrice: 17000,
    quantity: 30,
    stockType: "Oil & Fat",
    isActive: true,
    unit: "cartons"
  },
  {
    id: uniqueId(),
    name: "Flour",
    store: demoStores[0].id,
    image: "/images/store/flour.jpg",
    expirationDate: { month: 6, year: 2025 },
    measuringUnit: "50kg",
    lowStockThreshold: 5,
    category: "Baking Products",
    purchasePrice: 17000,
    quantity: 15,
    stockType: "Perishable",
    isActive: true,
    unit: "bags"
  },
  {
    id: uniqueId(),
    name: "Coca-cola",
    store: demoStores[0].id,
    image: "/images/store/coca-cola.jpg",
    expirationDate: { month: 12, year: 2025 },
    measuringUnit: "40l",
    lowStockThreshold: 10,
    category: "Drinks & Beverages",
    purchasePrice: 13000,
    quantity: 40,
    stockType: "Perishable",
    isActive: true,
    unit: "Packs"
  }
];
