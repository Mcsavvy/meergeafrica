import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RestaurantContext } from "@/lib/contexts/restaurant";
import { Filter, Plus, Search, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export function StockItemsFilter({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  const restaurant = useContext(RestaurantContext);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" asChild>
        <Link href={`/restaurant/${restaurant.slug}/inventory/`}>
          <StoreIcon className="h-4 w-4 mr-2" />
          <span className="hidden md:inline">Stores</span>
        </Link>
      </Button>
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search here..."
          className="pl-8 w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button variant="outline">
        <Filter className="h-4 w-4" />
        <span className="hidden md:inline">Filter</span>
      </Button>
      <Button variant="outline" data-modal-trigger="create-stock-item-modal">
        <Plus className="h-4 w-4 mr-1" />
        <span className="hidden md:inline">Add New Item</span>
      </Button>
    </div>
  );
}
