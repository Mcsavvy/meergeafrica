import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockItem } from "@/lib/schema/inventory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Image from "next/image";

const StockItemImage = ({ src, alt }: { src: string; alt: string }) => (
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

const StockItemActions: React.FC<StockItem> = ({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem data-modal-trigger={`view-stock-item/${id}`}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem data-modal-trigger={`edit-stock-item/${id}`}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          data-modal-trigger={`delete-stock-item/${id}`}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const stockColumns: ColumnDef<StockItem>[] = [
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
    cell: async ({ row }) => {
      return (
        <StockItemImage src={row.original.image!} alt={row.original.name} />
      );
    },
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "purchasePrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p className="text-left pl-4">
        ₦{row.getValue<number>("purchasePrice").toLocaleString()}
      </p>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p className="text-left pl-4">{row.getValue<number>("quantity")}</p>
    ),
  },
  {
    accessorKey: "measuringUnit",
    header: "Measuring Unit",
  },
  {
    id: "actions",
    cell: ({ row }) => <StockItemActions {...row.original} />,
    enableSorting: false,
    enableGlobalFilter: false,
  },
];
