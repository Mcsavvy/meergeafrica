import React, { useCallback, useEffect, useState } from "react";
import { AddOn } from "@/types/menu";
import { useAddOnStore } from "@/lib/contexts/addon-context";
import Modal from "@/components/ui/modal";
import ImageDropzone from "@/components/ui/image-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AddOnUpdateEvent,
  onAddOnCreate,
  onAddOnUpdate,
} from "@/lib/events/addon-events";
import { useZodForm } from "@/lib/hooks/form";
import { AddOnFormSchema } from "@/lib/zod/forms/menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { convertToBase64 } from "@/lib/utils";

export const CreateAddOnModal = () => {
  const { createAddOn } = useAddOnStore();
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

  const handleAddOnCreate = useCallback(
    (addOn: Omit<AddOn, "id">) => {
      createAddOn(addOn, true);
      setOpen(false);
    },
    [createAddOn]
  );

  useEffect(() => {
    return onAddOnCreate(handleCreateEvent);
  }, []);

  return (
    <Modal
      id="create-add-on-modal"
      isOpen={open}
      layer="secondary"
      onClose={() => setOpen(false)}
      className="max-w-md"
    >
      <Modal.Header>Create Add-On</Modal.Header>
      <Modal.Body>
        <CreateAddOnForm name={name} onCreateAddOn={handleAddOnCreate} />
      </Modal.Body>
    </Modal>
  );
};

export const CreateAddOnForm = ({
  name: initialName = "",
  onCreateAddOn,
}: {
  name?: string;
  onCreateAddOn: (addOn: Omit<AddOn, "id">) => void;
}) => {
  const form = useZodForm({
    schema: AddOnFormSchema,
    // @ts-expect-error ...
    defaultValues: { name: initialName, price: 0, image: "" },
  });
  const handleSubmit = form.handleSubmit((data) => {
    if (!data.image) {
      return onCreateAddOn({ name: data.name, price: data.price });
    }
    convertToBase64(data.image).then((image) => {
      onCreateAddOn({
        name: data.name,
        price: data.price,
        image: image,
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
                  <Input id="name" placeholder="Enter Add-On Name" {...field} />
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
                    placeholder="Enter Add-On Price"
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
              <FormLabel className="required" htmlFor="image">
                Image
              </FormLabel>
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
          Create Add-On
        </Button>
      </form>
    </Form>
  );
};

export const EditAddOnModal = () => {
  const { updateAddOn } = useAddOnStore();
  const [open, setOpen] = useState(false);
  const [addOn, setAddOn] = useState<AddOn | null>(null);

  const handleUpdateEvent = (e: AddOnUpdateEvent) => {
    setAddOn(e.detail.addOn);
    setOpen(true);
  };

  const handleAddOnUpdate = useCallback(
    (update: Partial<Omit<AddOn, "id">>) => {
      updateAddOn(addOn!, update);
      setOpen(false);
    },
    [updateAddOn, addOn]
  );

  useEffect(() => {
    return onAddOnUpdate(handleUpdateEvent);
  }, []);

  return (
    <Modal
      id="edit-add-on-modal"
      isOpen={open}
      layer="secondary"
      onClose={() => setOpen(false)}
      className="max-w-md"
    >
      <Modal.Header>Edit Add-On</Modal.Header>
      <Modal.Body>
        <EditAddOnForm addOn={addOn} onUpdateAddOn={handleAddOnUpdate} />
      </Modal.Body>
    </Modal>
  );
};

export const EditAddOnForm = ({
  addOn,
  onUpdateAddOn,
}: {
  addOn: AddOn | null;
  onUpdateAddOn: (update: Partial<Omit<AddOn, "id">>) => void;
}) => {
  const form = useZodForm({
    schema: AddOnFormSchema,
    defaultValues: {
      name: addOn?.name,
      price: addOn?.price,
      // @ts-expect-error ...
      image: addOn?.image,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!addOn) return;
    if (!data.image) {
      return onUpdateAddOn({ name: data.name, price: data.price });
    }
    return convertToBase64(data.image).then((image) => {
      onUpdateAddOn({
        name: data.name,
        price: data.price,
        image: image,
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
                  <Input id="name" placeholder="Enter Add-On Name" {...field} />
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
                    placeholder="Enter Add-On Price"
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
              <FormLabel className="required" htmlFor="image">
                Image
              </FormLabel>
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
          Update Add-On
        </Button>
      </form>
    </Form>
  );
};
