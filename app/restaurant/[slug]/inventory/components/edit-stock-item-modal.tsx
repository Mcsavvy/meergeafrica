import React, { useMemo, useState } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageDropzone from "@/components/ui/image-dropzone";
import { useInventoryStore } from "@/lib/contexts/inventory-context";
import { useZodForm } from "@/lib/hooks/form";
import { StockItemUpdateSchema } from "@/lib/schema/inventory";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const EditStockModal = () => {
  const { updateStockItem, stockItems } = useInventoryStore();
  const [stockItemId, setStockItemId] = useState<string | null>(null);

  const stockItem = useMemo(() => {
    if (!stockItems || !stockItemId) return null;
    return stockItems.find((item) => item.id === stockItemId);
  }, [stockItems, stockItemId]);

  const form = useZodForm({
    schema: StockItemUpdateSchema,
  });

  const onOpen = (params: { id: string }) => {
    const { id } = params;
    setStockItemId(id);

    if (stockItem) {
      form.reset({
        quantity: stockItem.quantity,
        lowStockThreshold: stockItem.lowStockThreshold,
        purchasePrice: stockItem.purchasePrice,
        image: stockItem.image,
      });
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (!stockItem) return;

    try {
      await updateStockItem(stockItem, data);
      form.reset();
      setStockItemId(null);
    } catch (error) {
      console.error("Failed to update stock item:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        {/* @ts-expect-error ... */}
        <Modal id={`edit-stock-item/:id`} onOpen={onOpen}>
          <Modal.Header>
            <h2 className="text-xl font-semibold">Edit Stock Item</h2>
          </Modal.Header>

          <Modal.Body>
            <div className="space-y-4">
              {/* Current Stock Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Current Stock Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Item Name</p>
                    <p className="font-medium">{stockItem?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium">{stockItem?.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Measuring Unit</p>
                    <p className="font-medium">{stockItem?.measuringUnit}</p>
                  </div>
                </div>
              </div>

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
                    <FormLabel>Purchase Price</FormLabel>
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
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" data-modal-hide>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
              >
                Save Changes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </Form>
  );
};

export default EditStockModal;
