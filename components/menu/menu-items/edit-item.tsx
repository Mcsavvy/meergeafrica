import { useState, useCallback, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageDropzone from "@/components/ui/image-dropzone";
import SelectAddons from "./addon-selector";
import SelectPairedItems from "./pairing-selector";
import { NairaInput } from "@/components/ui/currency";
import UnitInput from "@/components/ui/unit-input";
import CreateableSelect from "react-select/creatable";
import Select from "react-select";
import { useZodForm } from "@/lib/hooks/form";
import { MenuItemFormSchema } from "@/lib/zod/forms/menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DurationInput from "@/components/ui/duration";
import { useMenuItemsStore } from "@/lib/contexts/menu-items-context";
import { MenuItem } from "@/types/menu";

const sizeUnits = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
];

const menuCategories = [
  { value: "Soups & Swallows", label: "Soups & Swallows" },
  { value: "Stews & Sauces", label: "Stews & Sauces" },
  { value: "Rice Dishes", label: "Rice Dishes" },
  { value: "Pastries & Small chops", label: "Pastries & Small chops" },
  { value: "Grills & Barbecue", label: "Grills & Barbecue" },
  { value: "Local Appetizers", label: "Local Appetizers" },
  { value: "Seafood Dishes", label: "Seafood Dishes" },
  { value: "Pepper soups", label: "Pepper soups" },
  { value: "Breakfast", label: "Breakfast" },
  { value: "Pasta", label: "Pasta" },
  { value: "Desserts", label: "Desserts" },
  { value: "Continental Dishes", label: "Continental Dishes" },
  { value: "Foreign Dish", label: "Foreign Dish" },
  { value: "Chef Specials", label: "Chef Specials" },
];

const itemStatus = [
  { value: "available", label: "Available" },
  { value: "unlisted", label: "Unlisted" },
];

interface EditMenuItemProps {
  menuItem: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

const EditMenuItem = ({ menuItem, isOpen, onClose }: EditMenuItemProps) => {
  const form = useZodForm({
    schema: MenuItemFormSchema,
    defaultValues: {
      name: menuItem.name,
      image: menuItem.image,
      price: menuItem.price,
      portions: menuItem.portions,
      size: menuItem.size,
      ingredients: menuItem.ingredients,
      status: menuItem.status,
      category: menuItem.category,
      readyTime: menuItem.readyTime,
      addOns: menuItem.addOns,
      pairedItems: menuItem.pairedItems,
    },
  });

  const { updateMenuItem } = useMenuItemsStore();

  const handleSubmit = form.handleSubmit(
    useCallback(
      async (values) => {
        await updateMenuItem(menuItem, values);
        onClose();
      },
      [updateMenuItem, menuItem, onClose]
    )
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <Modal
          id={`edit-menu-item-${menuItem.id}`}
          className="max-w-3xl"
          isOpen={isOpen}
          onClose={onClose}
        >
          <Modal.Header className="md:px-8">Edit Menu Item</Modal.Header>
          <Modal.Body className="overflow-y-auto md:p-8">
            <EditMenuItemForm form={form} menuItem={menuItem} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </form>
    </Form>
  );
};

const EditMenuItemForm = ({
  form,
  menuItem,
}: {
  form: ReturnType<typeof useZodForm>;
  menuItem: MenuItem;
}) => {
  const [category, setCategory] = useState<{
    label: string;
    value: string;
  } | null>(() => {
    const cat = menuCategories.find((c) => c.value === menuItem.category);
    return cat
      ? {
          label: cat.value,
          value: cat.value,
        }
      : null;
  });

  const [status, setStatus] = useState<{ label: string; value: string } | null>(
    () => {
      const stat = itemStatus.find((s) => s.value === menuItem.status);
      return stat
        ? {
            label: stat.value,
            value: stat.value,
          }
        : null;
    }
  );

  const setSize = useCallback(
    (v: { amount: number; unit: string }) => {
      form.setValue("size", v);
    },
    [form]
  );

  const setImage = useCallback(
    (v?: File) => {
      if (v) {
        form.setValue("image", "");
        return;
      }
    },
    [form]
  );

  useEffect(() => {
    if (category) {
      form.setValue("category", category.value);
    }
  }, [category, form]);

  useEffect(() => {
    if (status) {
      form.setValue("status", status.value);
    }
  }, [status, form]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Menu Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Item Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Price</FormLabel>
              <FormControl>
                <NairaInput placeholder="0.00" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portions"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Portion (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Number of portions"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Size</FormLabel>
              <FormControl>
                <UnitInput
                  units={sizeUnits}
                  placeholder="0.00kg/g"
                  {...field}
                  onChange={setSize}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Ingredients Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Add description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Item Status</FormLabel>
              <FormControl>
                <Select
                  options={itemStatus}
                  placeholder="Select status"
                  {...field}
                  value={status}
                  onChange={setStatus}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Menu Category</FormLabel>
              <FormControl>
                <CreateableSelect
                  options={menuCategories}
                  placeholder="Select category"
                  formatCreateLabel={(input) => `Create category "${input}"`}
                  {...field}
                  value={category}
                  onChange={setCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="readyTime"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Ready in</FormLabel>
              <FormControl>
                <DurationInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="addOns"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Add-Ons</FormLabel>
              <FormControl>
                <SelectAddons {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pairedItems"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Best Paired With</FormLabel>
              <FormControl>
                <SelectPairedItems {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel>Menu Item Image</FormLabel>
              <FormControl>
                <ImageDropzone
                  name="image"
                  value={form.watch("image")}
                  onChange={setImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EditMenuItem;
