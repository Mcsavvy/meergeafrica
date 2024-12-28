import React from "react";

import { Card } from "@/components/ui/card"; // Import Shadcn Card
import { Plus, Building, Settings } from "lucide-react"; // Import Icons
import Link from "next/link";

export default function Stores() {
  return (
    <div>
      <div className="p-6">
        {" "}
        {/* Increased padding */}
        <h1 className="text-3xl font-bold mb-8">Stores</h1>{" "}
        {/* Larger heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {" "}
          {/* Adjusted grid and gap */}
          {/* Create Store Card */}
          <Link href="/dashboard/stores/create">
            <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
              {" "}
              {/* Increased padding and fixed height */}
              <div className="rounded-full bg-gray-200 p-4 mb-4">
                {" "}
                {/* Increased padding */}
                <Plus className="w-8 h-8 text-gray-500" /> {/* Larger icon */}
              </div>
              <h2 className="text-xl font-medium mb-2">Create store</h2>{" "}
              {/* Larger heading */}
              <p className="text-base text-gray-500 text-center">
                Create and view your store...
              </p>
            </Card>
          </Link>
          {/* Kadd Stores Card */}
          <Link href="/dashboard/stores/kadd">
            <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
              <div className="rounded-full bg-gray-200 p-4 mb-4">
                <span className="text-2xl font-bold">Kadd</span>{" "}
                {/* Larger text */}
              </div>
              <h2 className="text-xl font-medium mb-2">Kadd Stores</h2>
              <p className="text-base text-gray-500 text-center">
                Your go-to store for premium...
              </p>
            </Card>
          </Link>
          {/* Stores Card */}
          <Link href="/dashboard/stores/default">
            <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
              <div className="rounded-full bg-gray-200 p-4 mb-4">
                <Building className="w-8 h-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-medium mb-2">Stores</h2>
              <p className="text-base text-gray-500 text-center">
                Default store created for...
              </p>
            </Card>
          </Link>
          {/* Store Settings Card */}
          <Link href="/dashboard/stores/settings">
            <Card className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition h-64">
              <div className="rounded-full bg-gray-200 p-4 mb-4">
                <Settings className="w-8 h-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-medium mb-2">Store settings</h2>
              <p className="text-base text-gray-500 text-center">
                Manage and update store...
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
