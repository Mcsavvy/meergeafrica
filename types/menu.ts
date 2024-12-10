import {
  AddOnFormSchema,
  MenuItemFormSchema,
  PairedItemFormSchema,
} from "@/lib/zod/forms/menu";
import { z } from "zod";

export type MenuItem = Omit<z.infer<typeof MenuItemFormSchema>, "image"> & {
  id: string;
  image: string;
};

export type AddOn = Omit<z.infer<typeof AddOnFormSchema>, "image"> & {
  id: string;
  image?: string;
};

export type PairedItem = Omit<z.infer<typeof PairedItemFormSchema>, "image"> & {
  id: string;
  image?: string;
};
