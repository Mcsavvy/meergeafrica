import React from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageDropzone from "@/components/ui/image-dropzone";
import {
  useInventoryStore,
  useCurrentStore,
} from "@/lib/contexts/inventory-context";
import { useZodForm } from "@/lib/hooks/form";
import { StockItemCreateSchema } from "@/lib/schema/inventory";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatableSelect from "react-select/creatable";

const predefinedCategories = [
  "Grain Products",
  "Vegetables",
  "Fruits",
  "Meat",
  "Dairy",
  "Beverages",
  "Spices",
];

const predefinedMeasuringUnits = [
  "Kg",
  "G",
  "L",
  "ml",
  "oz",
  "lb",
  "cup",
  "tsp",
  "tbsp",
  "piece",
  "dozen",
];

const CreateStockModal = () => {
  const { createStockItem } = useInventoryStore();
  const [open, setOpen] = React.useState(false);
  const currentStore = useCurrentStore();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const form = useZodForm({
    schema: StockItemCreateSchema,
    defaultValues: {
      store: currentStore.id,
      expirationDate: {
        month: currentMonth,
        year: currentYear,
      },
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createStockItem(data);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create stock item:", error);
    }
  });

  // Generate year options (current year + 5 years)
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + i);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Modal
          isOpen={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          id="create-stock-item-modal"
        >
          <Modal.Header>
            <h2 className="text-xl font-semibold">Add Stock Item</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {/* Stock Item Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Stock Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Mama Gold Rice" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiry Date */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expirationDate.month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">Expiry Date</FormLabel>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <SelectItem key={month} value={month.toString()}>
                                {new Date(2000, month - 1).toLocaleString(
                                  "default",
                                  { month: "long" }
                                )}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expirationDate.year"
                  render={({ field }) => (
                    <FormItem className="pt-8">
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {yearOptions.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Stock Item Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Item Image</FormLabel>
                    <FormControl>
                      <ImageDropzone
                        name="image"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Category</FormLabel>
                    <CreatableSelect
                      isClearable
                      value={
                        field.value
                          ? { label: field.value, value: field.value }
                          : null
                      }
                      onChange={(newValue) =>
                        field.onChange(newValue ? newValue.value : "")
                      }
                      options={predefinedCategories.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      placeholder="Select or create category"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Stock Quantity"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Measuring Unit */}
              <FormField
                control={form.control}
                name="measuringUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Measuring Unit</FormLabel>
                    <FormControl>
                      <CreatableSelect
                        isClearable
                        value={
                          field.value
                            ? { label: field.value, value: field.value }
                            : null
                        }
                        onChange={(newValue) =>
                          field.onChange(newValue ? newValue.value : "")
                        }
                        options={predefinedMeasuringUnits.map((unit) => ({
                          label: unit,
                          value: unit,
                        }))}
                        placeholder="Select or create measuring unit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Low Stock Alert */}
              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      Low Stock Alert
                      <span className="text-red-300 text-sm ml-1">
                        (Alert sent if stock quantity is below this number)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00Kg/G"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Purchase Price */}
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchasing Price*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="₦0,000.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-orange-500 text-sm">
                Details of added stock items cannot be updated!
              </p>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" className="w-full">
              Add Stock
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </Form>
  );
};

export default CreateStockModal;
