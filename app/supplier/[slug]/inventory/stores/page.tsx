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
    };

    setStores([...stores, newStore]); // Add new store to the stores array
    handleCloseModal();
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-16">Stores</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Store</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="w-1/3">Store Name</Label>
              <Input
                className="w-2/3"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-1/3">Store Image</Label>
              <Input
                className="w-2/3"
                value={newStoreImage}
                onChange={(e) => setNewStoreImage(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-1/3">Business Section</Label>
              <Select
                className="w-2/3"
                value={newBusinessSection}
                onValueChange={setNewBusinessSection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="section1">Section 1</SelectItem>
                  <SelectItem value="section2">Section 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Label className="w-1/3">Description</Label>
              <Input
                className="w-2/3"
                value={newStoreDescription}
                onChange={(e) => setNewStoreDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
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

// import React from "react";

// import { Card } from "@/components/ui/card";
// import { Plus, Building, Settings, ChevronRight } from "lucide-react";
// import Link from "next/link";

// export default function Stores() {
//   return (
//     <div className="p-12">
//       {" "}
//       {/* Even more padding around the whole section */}
//       <h1 className="text-5xl font-bold mb-16">Stores</h1>{" "}
//       {/* Larger heading and margin */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//         {" "}
//         {/* Increased gap significantly */}
//         {/* Create Store Card */}
//         <Link href="/dashboard/stores/create">
//           <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
//             {" "}
//             {/* Significantly increased padding and height */}
//             <div className="rounded-full bg-gray-200 p-6 mr-8">
//               {" "}
//               {/* Increased padding and margin */}
//               <Plus className="w-12 h-12 text-gray-500" />{" "}
//               {/* Much larger icon */}
//             </div>
//             <div className="flex-grow">
//               <h2 className="text-3xl font-medium mb-2">Create store</h2>{" "}
//               {/* Larger heading */}
//               <p className="text-xl text-gray-500">
//                 Create and view your store...
//               </p>{" "}
//               {/* Larger text */}
//             </div>
//             <ChevronRight className="w-8 h-8 text-gray-400" />{" "}
//             {/* Larger arrow */}
//           </Card>
//         </Link>
//         {/* Kadd Stores Card */}
//         <Link href="/dashboard/stores/kadd">
//           <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
//             <div className="rounded-full bg-gray-200 p-6 mr-8">
//               <span className="text-4xl font-bold">Kadd</span>
//               {/* Much larger initial text */}
//             </div>
//             <div className="flex-grow">
//               <h2 className="text-3xl font-medium mb-2">Kadd Stores</h2>
//               <p className="text-xl text-gray-500">
//                 Your go-to store for premium...
//               </p>
//             </div>
//             <ChevronRight className="w-8 h-8 text-gray-400" />
//           </Card>
//         </Link>
//         {/* Stores Card */}
//         <Link href="/dashboard/stores/default">
//           <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
//             <div className="rounded-full bg-gray-200 p-6 mr-8">
//               <Building className="w-12 h-12 text-gray-500" />
//             </div>
//             <div className="flex-grow">
//               <h2 className="text-3xl font-medium mb-2">Stores</h2>
//               <p className="text-xl text-gray-500">
//                 Default store created for...
//               </p>
//             </div>
//             <ChevronRight className="w-8 h-8 text-gray-400" />
//           </Card>
//         </Link>
//         {/* Store Settings Card */}
//         <Link href="/dashboard/stores/settings">
//           <Card className="flex items-center p-12 cursor-pointer hover:bg-gray-100 transition h-48">
//             <div className="rounded-full bg-gray-200 p-6 mr-8">
//               <Settings className="w-12 h-12 text-gray-500" />
//             </div>
//             <div className="flex-grow">
//               <h2 className="text-3xl font-medium mb-2">Store settings</h2>
//               <p className="text-xl text-gray-500">
//                 Manage and update store...
//               </p>
//             </div>
//             <ChevronRight className="w-8 h-8 text-gray-400" />
//           </Card>
//         </Link>
//       </div>
//     </div>

//     // <div className="p-8">
//     //   {" "}
//     //   {/* Increased padding */}
//     //   <h1 className="text-4xl font-bold mb-12">Stores</h1>{" "}
//     //   {/* Larger heading and margin */}
//     //   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//     //     {" "}
//     //     {/* Increased gap */}
//     //     {/* Create Store Card */}
//     //     <Link href="/dashboard/stores/create">
//     //       <Card className="flex items-center p-8 cursor-pointer hover:bg-gray-100 transition h-32">
//     //         {" "}
//     //         {/* Increased padding and height */}
//     //         <div className="rounded-full bg-gray-200 p-4 mr-6">
//     //           {" "}
//     //           {/* Increased padding and margin */}
//     //           <Plus className="w-8 h-8 text-gray-500" /> {/* Larger icon */}
//     //         </div>
//     //         <div className="flex-grow">
//     //           <h2 className="text-2xl font-medium mb-1">Create store</h2>{" "}
//     //           {/* Larger heading */}
//     //           <p className="text-lg text-gray-500">
//     //             Create and view your store...
//     //           </p>{" "}
//     //           {/* Larger text */}
//     //         </div>
//     //         <ChevronRight className="w-6 h-6 text-gray-400" />{" "}
//     //         {/* Larger arrow */}
//     //       </Card>
//     //     </Link>
//     //     {/* Kadd Stores Card */}
//     //     <Link href="/dashboard/stores/kadd">
//     //       <Card className="flex items-center p-8 cursor-pointer hover:bg-gray-100 transition h-32">
//     //         <div className="rounded-full bg-gray-200 p-4 mr-6">
//     //           <span className="text-3xl font-bold">Kadd</span>
//     //           {/* Larger initial text */}
//     //         </div>
//     //         <div className="flex-grow">
//     //           <h2 className="text-2xl font-medium mb-1">Kadd Stores</h2>
//     //           <p className="text-lg text-gray-500">
//     //             Your go-to store for premium...
//     //           </p>
//     //         </div>
//     //         <ChevronRight className="w-6 h-6 text-gray-400" />
//     //       </Card>
//     //     </Link>
//     //     {/* Stores Card */}
//     //     <Link href="/dashboard/stores/default">
//     //       <Card className="flex items-center p-8 cursor-pointer hover:bg-gray-100 transition h-32">
//     //         <div className="rounded-full bg-gray-200 p-4 mr-6">
//     //           <Building className="w-8 h-8 text-gray-500" />
//     //         </div>
//     //         <div className="flex-grow">
//     //           <h2 className="text-2xl font-medium mb-1">Stores</h2>
//     //           <p className="text-lg text-gray-500">
//     //             Default store created for...
//     //           </p>
//     //         </div>
//     //         <ChevronRight className="w-6 h-6 text-gray-400" />
//     //       </Card>
//     //     </Link>
//     //     {/* Store Settings Card */}
//     //     <Link href="/dashboard/stores/settings">
//     //       <Card className="flex items-center p-8 cursor-pointer hover:bg-gray-100 transition h-32">
//     //         <div className="rounded-full bg-gray-200 p-4 mr-6">
//     //           <Settings className="w-8 h-8 text-gray-500" />
//     //         </div>
//     //         <div className="flex-grow">
//     //           <h2 className="text-2xl font-medium mb-1">Store settings</h2>
//     //           <p className="text-lg text-gray-500">
//     //             Manage and update store...
//     //           </p>
//     //         </div>
//     //         <ChevronRight className="w-6 h-6 text-gray-400" />
//     //       </Card>
//     //     </Link>
//     //   </div>
//     // </div>

//     // <div>
//     //   <div className="p-6">
//     //     {" "}
//     //     {/* Increased padding */}
//     //     <h1 className="text-3xl font-bold mb-8">Stores</h1>{" "}
//     //     {/* Larger heading */}
//     //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//     //       {" "}
//     //       {/* Adjusted grid and gap */}
//     //       {/* Create Store Card */}
//     //       <Link href="/dashboard/stores/create">
//     //         <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
//     //           {" "}
//     //           {/* Increased padding and fixed height */}
//     //           <div className="rounded-full bg-gray-200 p-4 mb-4">
//     //             {" "}
//     //             {/* Increased padding */}
//     //             <Plus className="w-8 h-8 text-gray-500" /> {/* Larger icon */}
//     //           </div>
//     //           <h2 className="text-xl font-medium mb-2">Create store</h2>{" "}
//     //           {/* Larger heading */}
//     //           <p className="text-base text-gray-500 text-center">
//     //             Create and view your store...
//     //           </p>
//     //         </Card>
//     //       </Link>
//     //       {/* Kadd Stores Card */}
//     //       <Link href="/dashboard/stores/kadd">
//     //         <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
//     //           <div className="rounded-full bg-gray-200 p-4 mb-4">
//     //             <span className="text-2xl font-bold">Kadd</span>{" "}
//     //             {/* Larger text */}
//     //           </div>
//     //           <h2 className="text-xl font-medium mb-2">Kadd Stores</h2>
//     //           <p className="text-base text-gray-500 text-center">
//     //             Your go-to store for premium...
//     //           </p>
//     //         </Card>
//     //       </Link>
//     //       {/* Stores Card */}
//     //       <Link href="/dashboard/stores/default">
//     //         <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
//     //           <div className="rounded-full bg-gray-200 p-4 mb-4">
//     //             <Building className="w-8 h-8 text-gray-500" />
//     //           </div>
//     //           <h2 className="text-xl font-medium mb-2">Stores</h2>
//     //           <p className="text-base text-gray-500 text-center">
//     //             Default store created for...
//     //           </p>
//     //         </Card>
//     //       </Link>
//     //       {/* Store Settings Card */}
//     //       <Link href="/dashboard/stores/settings">
//     //         <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
//     //           <div className="rounded-full bg-gray-200 p-4 mb-4">
//     //             <Settings className="w-8 h-8 text-gray-500" />
//     //           </div>
//     //           <h2 className="text-xl font-medium mb-2">Store settings</h2>
//     //           <p className="text-base text-gray-500 text-center">
//     //             Manage and update store...
//     //           </p>
//     //         </Card>
//     //       </Link>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }
