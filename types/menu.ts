export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "available" | "unlisted";
  readyTime: string;
  image: string;
};

export interface AddOn {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface PairedItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}
