import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageDropzone from "@/components/ui/image-dropzone";
import { useInventoryStore } from "@/lib/contexts/inventory-context";
import { useZodForm } from "@/lib/hooks/form";
import { StoreCreateSchema } from "@/lib/schema/inventory";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CreateStoreModal = () => {
  const { createStore } = useInventoryStore();
  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: StoreCreateSchema,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createStore(data);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create store:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Modal
          id="create-store-modal"
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => setOpen(true)}
          isOpen={open}
        >
          <Modal.Header>
            <h2 className="text-xl font-semibold">Create Store</h2>
            <p className="text-sm text-gray-500">
              Start managing orders, menus, and customers with ease
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Store Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium required">
                        Store Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Store Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Section */}
                <FormField
                  control={form.control}
                  name="businessSectionName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Business Section Name
                        <span className="text-gray-400">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a business section name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Store Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium required">
                      Store Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Store Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium required">
                      Store Image
                    </FormLabel>
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
                Back
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </Form>
  );
};

export default CreateStoreModal;
