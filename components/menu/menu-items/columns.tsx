import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types/menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDuration } from "@/lib/utils";

const StatusBadge = ({ status }: { status: MenuItem["status"] }) => (
  <Badge
    variant={status === "available" ? "default" : "secondary"}
    className="text-nowrap"
  >
    • {status.charAt(0).toUpperCase() + status.slice(1)}
  </Badge>
);

// Menu Item Image Component
const MenuItemImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden">
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className="w-full h-full object-cover"
    />
  </div>
);

const MenuItemActions: React.FC<MenuItem> = (item) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-28 !p-4">
        <div className="flex flex-col items-start">
          <Button
            variant="link"
            size="sm"
            className="hover:text-secondary hover:no-underline"
          >
            View
          </Button>
          <Button
            variant="link"
            size="sm"
            className="hover:text-secondary hover:no-underline"
          >
            Update
          </Button>
          <Button
            variant="link"
            size="sm"
            className="hover:text-secondary hover:no-underline"
          >
            {item.status === "available" ? "Unlist" : "List"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const menuItemsColumns: ColumnDef<MenuItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        className="border-secondary data-[state=checked]:bg-secondary"
        onCheckedChange={(checked) =>
          table.toggleAllRowsSelected(checked as boolean)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className="border-secondary data-[state=checked]:bg-secondary"
        onCheckedChange={(checked) => row.toggleSelected(checked as boolean)}
      />
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <MenuItemImage src={row.original.image} alt={row.original.name} />
    ),
    size: 50,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        Item Name
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p className="text-left pl-4">
        ₦{row.getValue<number>("price").toLocaleString()}
      </p>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "readyTime",
    header: "Ready in",
    cell: ({ row }) => (
      <p className="text-left pl-4">
        {formatDuration(row.getValue("readyTime"))}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <MenuItemActions {...row.original} />,
    enableSorting: false,
    enableGlobalFilter: false,
    size: 16,
  },
];

export default menuItemsColumns;
