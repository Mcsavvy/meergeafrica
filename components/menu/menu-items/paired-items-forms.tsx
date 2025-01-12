import React, { useCallback, useEffect, useState } from "react";
import { PairedItem } from "@/types/menu";
import { usePairingStore } from "@/lib/contexts/pairing-context";
import Modal from "@/components/ui/modal";
import ImageDropzone from "@/components/ui/image-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PairedItemUpdateEvent,
  onPairedItemCreate,
  onPairedItemUpdate,
} from "@/lib/events/pairing-events";
import { useZodForm } from "@/lib/hooks/form";
import { PairedItemFormSchema } from "@/lib/zod/forms/menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { convertToBase64 } from "@/lib/utils";

export const CreatePairedItemModal = () => {
  const { createPairedItem } = usePairingStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreateEvent = (e: CustomEvent) => {
    setOpen(true);
    // check for initial name
    const { name } = e.detail;
    if (name) {
      setName(name);
    }
  };

  const handlePairedItemCreate = useCallback(
    (pairedItem: Omit<PairedItem, "id">) => {
      createPairedItem(pairedItem, true);
      setOpen(false);
    },
    [createPairedItem]
  );

  useEffect(() => {
    return onPairedItemCreate(handleCreateEvent);
  }, []);

  return (
    <Modal
      id="create-paired-item-modal"
      isOpen={open}
      layer="secondary"
      onClose={() => setOpen(false)}
      className="max-w-md"
    >
      <Modal.Header>Create Paired Item</Modal.Header>
      <Modal.Body>
        <CreatePairedItemForm
          name={name}
          onCreatePairedItem={handlePairedItemCreate}
        />
      </Modal.Body>
    </Modal>
  );
};

export const CreatePairedItemForm = ({
  name: initialName = "",
  onCreatePairedItem,
}: {
  name?: string;
  onCreatePairedItem: (pairedItem: Omit<PairedItem, "id">) => void;
}) => {
  const form = useZodForm({
    schema: PairedItemFormSchema,
    defaultValues: {
      name: initialName,
      price: 0,
      description: "",
      image: undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!data.image) {
      return onCreatePairedItem({
        name: data.name,
        price: data.price,
      });
    }
    convertToBase64(data.image).then((image) => {
      onCreatePairedItem({
        name: data.name,
        price: data.price,
        image,
      });
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 group">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="name">
                  Name
                </FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter Item Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="price">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    id="price"
                    placeholder="Enter Item Price"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="image">Image</FormLabel>
              <FormControl>
                <ImageDropzone id="image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="group-invalid:opacity-50 group-invalid:cursor-not-allowed"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Create Paired Item
        </Button>
      </form>
    </Form>
  );
};

export const EditPairedItemModal = () => {
  const { updatePairedItem } = usePairingStore();
  const [open, setOpen] = useState(false);
  const [pairedItem, setPairedItem] = useState<PairedItem | null>(null);

  const handleUpdateEvent = (e: PairedItemUpdateEvent) => {
    setPairedItem(e.detail.pairedItem);
    setOpen(true);
  };

  const handlePairedItemUpdate = useCallback(
    (update: Partial<Omit<PairedItem, "id">>) => {
      updatePairedItem(pairedItem!, update);
      setOpen(false);
    },
    [updatePairedItem, pairedItem]
  );

  useEffect(() => {
    return onPairedItemUpdate(handleUpdateEvent);
  }, []);

  return (
    <Modal
      id="edit-paired-item-modal"
      isOpen={open}
      layer="secondary"
      onClose={() => setOpen(false)}
      className="max-w-md"
    >
      <Modal.Header>Edit Paired Item</Modal.Header>
      <Modal.Body>
        <EditPairedItemForm
          pairedItem={pairedItem}
          onUpdatePairedItem={handlePairedItemUpdate}
        />
      </Modal.Body>
    </Modal>
  );
};

export const EditPairedItemForm = ({
  pairedItem,
  onUpdatePairedItem,
}: {
  pairedItem: PairedItem | null;
  onUpdatePairedItem: (update: Partial<Omit<PairedItem, "id">>) => void;
}) => {
  const form = useZodForm({
    schema: PairedItemFormSchema,
    defaultValues: {
      name: pairedItem?.name,
      price: pairedItem?.price,
      // @ts-expect-error ...
      image: pairedItem?.image,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!pairedItem) return;
    if (!data.image) {
      return onUpdatePairedItem({
        name: data.name,
        price: data.price,
      });
    }
    convertToBase64(data.image).then((image) => {
      onUpdatePairedItem({
        name: data.name,
        price: data.price,
        image,
      });
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 group">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="name">
                  Name
                </FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter Item Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required" htmlFor="price">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    id="price"
                    placeholder="Enter Item Price"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="image">Image</FormLabel>
              <FormControl>
                <ImageDropzone id="image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="group-invalid:opacity-50 group-invalid:cursor-not-allowed"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Update Paired Item
        </Button>
      </form>
    </Form>
  );
};
