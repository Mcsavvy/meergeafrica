"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Store as StoreIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventoryStore } from "@/lib/contexts/supplier/inventory-context";
import CreateStoreModal from "./create-store-modal";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface StoreCard {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  href?: string;
  onClick?: () => void;
  bgColor?: string;
  hasStockItems?: boolean;
}

interface StoreCardComponentProps {
  card: StoreCard;
  isMounted: boolean;
}

export default function Stores() {
  const { stores, stockItems } = useInventoryStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default store cards
  const defaultStoreCards: StoreCard[] = [
    {
      id: "create",
      title: "Create store",
      description: "Create and view your store...",
      icon: <Plus className="h-8 w-8 text-gray-400" />,
      onClick: () => setIsModalOpen(true),
      bgColor: "bg-gray-50"
    },
    {
      id: "kadd",
      title: "Kadd Stores",
      description: "Your go-to store for premium...",
      image: "/kadd-logo.png",
      href: `/supplier/${slug}/inventory/new`,
      hasStockItems: mounted ? stockItems.some(item => item.store === "kadd" && item.isActive) : undefined
    }
  ];

  // Management cards
  const managementCards: StoreCard[] = [
    {
      id: "stores",
      title: "Stores",
      description: "Default store created for...",
      icon: <StoreIcon className="h-8 w-8 text-white" />,
      href: `/supplier/${slug}/inventory/stores/all`,
      bgColor: "bg-[#FFF1E7]"
    },
    {
      id: "settings",
      title: "Store settings",
      description: "Manage and update store...",
      icon: <Settings className="h-8 w-8 text-white" />,
      href: `/supplier/${slug}/inventory/stores/settings`,
      bgColor: "bg-[#F0F9FF]"
    }
  ];

  // User created store cards
  const userStoreCards: StoreCard[] = mounted ? stores
    .filter(store => store.id !== "kadd") // Exclude Kadd store
    .map(store => ({
      id: store.id,
      title: store.name,
      description: "Manage your store inventory...",
      icon: <StoreIcon className="h-8 w-8 text-gray-600" />,
      href: stockItems.some(item => item.store === store.id && item.isActive)
        ? `/supplier/${slug}/inventory/new?store=${store.id}`
        : `/supplier/${slug}/inventory/new/add?store=${store.id}`,
      bgColor: "bg-[#F5F6F7]",
      hasStockItems: stockItems.some(item => item.store === store.id && item.isActive)
    })) : [];

  return (
    <div className="flex-grow h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-8 bg-[#F9FAFB]">
          <h1 className="text-2xl font-semibold">Stores</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-[#F9FAFB]">
          <div className="space-y-8">
            {/* Default stores section */}
            <div className="relative ml-8">
              <h2 className="text-lg font-semibold mb-4">Default Stores</h2>
              <div className="grid grid-cols-2 gap-6">
                {defaultStoreCards.map((card) => (
                  <StoreCardComponent key={card.id} card={card} isMounted={mounted} />
                ))}
              </div>
            </div>

            {/* Management section */}
            <div className="relative ml-8">
              <div className="grid grid-cols-2 gap-6">
                {managementCards.map((card) => (
                  <StoreCardComponent key={card.id} card={card} isMounted={mounted} />
                ))}
              </div>
            </div>

            {/* User created stores section - only show after mounting */}
            {mounted && userStoreCards.length > 0 && (
              <div className="relative ml-8">
                <h2 className="text-lg font-semibold mb-4">Your Stores</h2>
                <div className="grid grid-cols-2 gap-6">
                  {userStoreCards.map((card) => (
                    <StoreCardComponent key={card.id} card={card} isMounted={mounted} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateStoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// Store card component
const StoreCardComponent: React.FC<StoreCardComponentProps> = ({ card, isMounted }) => {
  return (
    <div
      className="relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
      style={{
        width: "510px",
        height: "330px"
      }}
    >
      {card.onClick ? (
        <button
          onClick={card.onClick}
          className="w-full h-full p-6 text-left flex items-center justify-center"
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgColor || 'bg-[#F5F6F7]'}`}>
              {card.icon}
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <Link
          href={card.href || "#"}
          className="block w-full h-full p-6 flex items-center justify-center"
        >
          <div className="flex items-center">
            {card.icon ? (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgColor || 'bg-[#F5F6F7]'}`}>
                {card.icon}
              </div>
            ) : card.image && (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            <div className="ml-4 flex-grow">
              <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
