import Image from "next/image";
import React from "react";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  orderCount: number;
  imageUrl: string;
};

type TopMenuItemProps = {
  item: MenuItem;
  placeholder?: boolean;
};

const TopMenuItem: React.FC<TopMenuItemProps> = ({
  item,
  placeholder = false,
}) => {
  if (placeholder) {
    return (
      <div className="relative w-[19%] min-w-56 flex flex-col items-start justify-start">
        <div className="item-count absolute -top-2 -right-2 bg-secondary flex items-center justify-center rounded-full w-7 h-7">
          <span className="text-xs font-medium text-white">0</span>
        </div>
        <div className="item-image">
          <Image
            src="/images/food/placeholder.png"
            width={400}
            height={320}
            alt="Food placeholder"
            className="w-full min-w-full h-auto rounded-lg"
          />
        </div>
        <div className="space-y-2 mt-2 grow flex flex-col items-start justify-between">
          <span className="font-normal">No menu items yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[19%] min-w-56 flex flex-col items-start justify-start">
      <div className="item-count absolute -top-2 -right-2 bg-secondary flex items-center justify-center rounded-full w-7 h-7">
        <span className="text-xs font-medium text-white">
          +{item.orderCount}
        </span>
      </div>
      <div className="item-image">
        <Image
          src={item.imageUrl}
          width={400}
          height={320}
          alt={`${item.name} image`}
          className="w-full min-w-full h-auto rounded-lg"
        />
      </div>
      <div className="space-y-2 mt-2 grow flex flex-col items-start justify-between">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <span className="text-sm font-normal text-green-500">
          ₦{item.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export type TopMenuProps = {
  items: MenuItem[];
  loading?: boolean;
};

const TopMenu: React.FC<TopMenuProps> = ({ items, loading = false }) => {
  return (
    <section
      id="top-menu"
      className="max-w-full w-full overflow-x-hidden gap-4 p-4 lg:p-6 bg-white rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-800 my-4">
        Top Menu Of The Day
      </h2>
      <div className="flex items-stretch justify-start gap-4 max-w-full overflow-x-auto py-6">
        {loading || items.length === 0 ? (
          <TopMenuItem
            placeholder
            item={{ id: "0", name: "", price: 0, orderCount: 0, imageUrl: "" }}
          />
        ) : (
          items.map((item) => <TopMenuItem key={item.id} item={item} />)
        )}
      </div>
    </section>
  );
};

export default TopMenu;
