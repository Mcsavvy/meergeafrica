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
import { useCallback, useEffect, useMemo, useState } from "react";

const sizeUnits = [
  {
    value: "kg",
    label: "kg",
  },
  {
    value: "g",
    label: "g",
  },
];

const menuCategories = [
  {
    value: "Soups & Swallows",
    label: "Soups & Swallows",
  },
  {
    value: "Stews & Sauces",
    label: "Stews & Sauces",
  },
  {
    value: "Rice Dishes",
    label: "Rice Dishes",
  },
  {
    value: "Pastries & Small chops",
    label: "Pastries & Small chops",
  },
  {
    value: "Grills & Barbecue",
    label: "Grills & Barbecue",
  },
  {
    value: "Local Appetizers",
    label: "Local Appetizers",
  },
  {
    value: "Seafood Dishes",
    label: "Seafood Dishes",
  },
  {
    value: "Pepper soups",
    label: "Pepper soups",
  },
  {
    value: "Breakfast",
    label: "Breakfast",
  },
  {
    value: "Pasta",
    label: "Pasta",
  },
  {
    value: "Desserts",
    label: "Desserts",
  },
  {
    value: "Continental Dishes",
    label: "Continental Dishes",
  },
  {
    value: "Foreign Dish",
    label: "Foreign Dish",
  },
  {
    value: "Chef Specials",
    label: "Chef Specials",
  },
];

const itemStatus = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "unlisted",
    label: "Unlisted",
  },
];

const CreateMenuItem = () => {
  const form = useZodForm({
    schema: MenuItemFormSchema,
  });
  const { createMenuItem } = useMenuItemsStore();
  const [open, setOpen] = useState(false);

  const handleSubmit = useMemo(
    () =>
      form.handleSubmit((values) => {
        console.log(values);
        createMenuItem(values);
        setOpen(false);
      }),
    [createMenuItem, form]
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <Modal
          className="max-w-3xl"
          id="create-menu-item-modal"
          isOpen={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Modal.Header className="md:px-8">Create Menu Item</Modal.Header>
          <Modal.Body className="overflow-y-auto md:p-8">
            <CreateMenuItemForm form={form} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="outline">
              Customize
            </Button>
            <Button type="submit">Add to Menu</Button>
          </Modal.Footer>
        </Modal>
      </form>
    </Form>
  );
};

const CreateMenuItemForm = ({
  form,
}: {
  form: ReturnType<typeof useZodForm>;
}) => {
  const [category, setCategory] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [status, setStatus] = useState<{ label: string; value: string } | null>(
    null
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
        form.setValue("image", v);
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group">
      <div className="space-y-6">
        {/* Menu Item Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required" htmlFor="name">
                Menu Item Name
              </FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter Item Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required" htmlFor="price">
                Price
              </FormLabel>
              <FormControl>
                <NairaInput
                  id="price"
                  placeholder="0.00"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Portion */}
        <FormField
          control={form.control}
          name="portions"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="portions">Portion (optional)</FormLabel>
              <FormControl>
                <Input
                  id="portions"
                  placeholder="Number of portions"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required" htmlFor="size">
                Size
              </FormLabel>
              <FormControl>
                <UnitInput
                  units={sizeUnits}
                  id="size"
                  placeholder="0.00kg/g"
                  {...field}
                  onChange={setSize}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Ingredients Details */}
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required" htmlFor="ingredients">
                Ingredients Details
              </FormLabel>
              <FormControl>
                <Textarea
                  id="ingredients"
                  placeholder="Add description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Item Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required" htmlFor="status">
                Item Status
              </FormLabel>
              <FormControl>
                <Select
                  id="status"
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

        {/* Menu Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="required" htmlFor="category">
                Menu Category
              </FormLabel>
              <FormControl>
                <CreateableSelect
                  id="category"
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
        {/* Ready Time */}
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
        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel className="required">Menu Item Image</FormLabel>
              <FormControl>
                <ImageDropzone
                  name="image"
                  required
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

export default CreateMenuItem;
