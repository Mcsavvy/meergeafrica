"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useInventoryStore } from "@/lib/contexts/inventory-context";
import Image from "next/image";
import CreateStoreModal from "./components/create-store-modal";
import Link from "next/link";
import { RestaurantContext } from "@/lib/contexts/restaurant";

const InventoryPage = () => {
  const { stores } = useInventoryStore();
  const restaurant = useContext(RestaurantContext);

  return (
    <div className="p-6 space-y-6">
      <CreateStoreModal />
      {/* Header with buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Stores</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            data-modal-trigger="create-store-modal"
          >
            <Plus className="h-4 w-4" />
            Create Store
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Link
            href={`/restaurant/${restaurant.slug}/inventory/${store.id}/`}
            key={store.id}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                {store.image ? (
                  <Image
                    src={store.image}
                    alt={store.name}
                    width={100}
                    height={100}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-600">
                      {store.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-lg">{store.name}</h3>
                  {store.businessSectionName && (
                    <p className="text-sm text-gray-500">
                      {store.businessSectionName}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{store.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {stores.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No stores yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new store.
          </p>
          <Button className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create your first store
          </Button>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
