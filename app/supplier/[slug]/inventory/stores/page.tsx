"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Building, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { createStore } from "@/app/api/suppliers/store-api";

export default function Stores() {
  const [isCreateStoreOpen, setIsCreateStoreOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreImage, setNewStoreImage] = useState("");
  const [newBusinessSection, setNewBusinessSection] = useState("");
  const [newStoreDescription, setNewStoreDescription] = useState("");
  const [stores, setStores] = useState<
    { name: string; image: string; section: string; description: string }[]
  >([]); // State to hold created stores

  const handleCreateStoreClick = () => {
    setIsCreateStoreOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateStoreOpen(false);
    setNewStoreName("");
    setNewStoreImage("");
    setNewBusinessSection("");
    setNewStoreDescription("");
  };

  const handleCreateStoreSubmit = () => {
    const newStore = {
      name: newStoreName,
      image: newStoreImage,
      section: newBusinessSection,
      description: newStoreDescription,
      address: "Default Address", // Add the address property
    };

    // Add new store to the stores array
    setStores([...stores, newStore]);
    handleCloseModal();
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-16">Stores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Create Store Card */}
        <div onClick={handleCreateStoreClick}>
          <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
            <div className="rounded-full bg-gray-200 p-6 mr-8">
              <Plus className="w-12 h-12 text-gray-500" />
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-medium mb-2">Create Store</h2>
              <p className="text-xl text-gray-500">
                Create and view your store...
              </p>
            </div>
            <ChevronRight className="w-8 h-8 text-gray-400" />
          </Card>
        </div>

        {/* Store Settings Card */}
        <Link href="/supplier/dashboard/inventory/store-settings">
          <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
            <div className="rounded-full bg-gray-200 p-6 mr-8">
              <Settings className="w-12 h-12 text-gray-500" />
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-medium mb-2">Store Settings</h2>
              <p className="text-xl text-gray-500">
                Manage your store settings...
              </p>
            </div>
            <ChevronRight className="w-8 h-8 text-gray-400" />
          </Card>
        </Link>

        {/* Stores Card */}
        <Link href="/supplier/dashboard/inventory/stores">
          <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
            <div className="rounded-full bg-gray-200 p-6 mr-8">
              <Building className="w-12 h-12 text-gray-500" />
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-medium mb-2">Stores</h2>
              <p className="text-xl text-gray-500">
                Default store created for...
              </p>
            </div>
            <ChevronRight className="w-8 h-8 text-gray-400" />
          </Card>
        </Link>

        {/* Display Created Stores */}
        {stores.map((store, index) => (
          <Link
            key={index}
            href={`/supplier/dashboard/inventory/stores/${store.name}`}
          >
            <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
              <div className="rounded-full bg-gray-200 p-6 mr-8">
                {/* Display store image or a default icon */}
                {store.image ? (
                  <Image
                    src={store.image}
                    alt={store.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <Building className="w-12 h-12 text-gray-500" />
                )}
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-medium mb-2">{store.name}</h2>
                <p className="text-xl text-gray-500">{store.description}</p>
              </div>
              <ChevronRight className="w-8 h-8 text-gray-400" />
            </Card>
          </Link>
        ))}
      </div>

      {/* Create Store Modal */}

      <Dialog open={isCreateStoreOpen} onOpenChange={setIsCreateStoreOpen}>
        <DialogContent className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] max-h-[90vh] overflow-y-auto p-8 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Create Store
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {" "}
            {/* Space between form groups */}
            <div>
              <div className="flex items-start">
                {" "}
                {/* Flexbox for label and input alignment */}
                <Label
                  htmlFor="storeName"
                  className="w-1/3 text-sm font-medium text-gray-700 pt-1 mr-4"
                >
                  {" "}
                  {/* Fixed width for label */}
                  Store Name
                  <br />
                  <span className="text-xs text-gray-500">
                    appears on invoice, invoice
                  </span>
                </Label>
                <Input
                  id="storeName"
                  className="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow" // Take remaining space
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-start">
                <Label
                  htmlFor="storeImage"
                  className="w-1/3 text-sm font-medium text-gray-700 pt-1 mr-4"
                >
                  Store Image
                  <br />
                  <span className="text-xs text-gray-500">
                    choose or personalise your store avatar
                  </span>
                </Label>
                <Select value={newStoreImage} onValueChange={setNewStoreImage}>
                  <SelectTrigger className="w-2/3 flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
                    <SelectValue placeholder="Select Image" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kaddstore001 PNG">
                      Kaddstore001 PNG
                    </SelectItem>
                    <SelectItem value="image2">Image 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="flex items-start">
                <Label
                  htmlFor="businessSection"
                  className="w-1/3 text-sm font-medium text-gray-700 pt-1 mr-4"
                >
                  Business Section Name
                  <br />
                  <span className="text-xs text-gray-500">
                    write a business section name
                  </span>
                </Label>
                <Input
                  id="businessSection"
                  className="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                  value={newBusinessSection}
                  onChange={(e) => setNewBusinessSection(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-start">
                <Label
                  htmlFor="storeDescription"
                  className="w-1/3 text-sm font-medium text-gray-700 pt-1 mr-4"
                >
                  Store Description
                  <br />
                  <span className="text-xs text-gray-500">
                    enter stock type
                  </span>
                </Label>
                <textarea
                  id="storeDescription"
                  className="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[80px] flex-grow"
                  value={newStoreDescription}
                  onChange={(e) => setNewStoreDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={handleCloseModal}>
              Back
            </Button>
            <Button onClick={handleCreateStoreSubmit}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
