export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "available" | "unlisted";
  readyTime: string;
  image: string;
};
