import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";

export function MenuItemsFilter({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
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
      <Button variant="outline" data-modal-trigger="create-menu-item-modal">
        <Plus className="h-4 w-4 mr-1" />
        <span className="hidden md:inline">Add New Item</span>
      </Button>
    </div>
  );
}
