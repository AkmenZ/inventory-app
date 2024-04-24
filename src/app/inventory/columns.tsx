"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  name: string;
  date: string;
  quantity: number;
  priceVAT: number;
  priceSale: number;
  store: "Tukums" | "Bauska" | "Rīga" | "Kandava"
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "status",
    header: "Statuss",
  },
  {
    accessorKey: "name",
    header: "Nosaukums",
  },
  {
    accessorKey: "date",
    header: "Datums",
  },
  {
    accessorKey: "quantity",
    header: "Skaits",
  },
  {
    accessorKey: "priceVAT",
    header: "Cena(PVN)",
  },
  {
    accessorKey: "priceSale",
    header: "Cena(Pārdošnai)",
  },
  {
    accessorKey: "store",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Veikals
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
];
