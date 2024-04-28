"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import EditModal from "@/components/edit-modal";
import DeleteModal from "@/components/delete-modal";
import ProductActionsCell from "@/components/product-actions-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  name: string;
  date: string;
  quantity: number;
  priceVAT: number;
  priceSale: number;
  store: "Tukums" | "Bauska" | "Rīga" | "Kandava";
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "actions",
    header: () => {
      return(
        <SlidersHorizontal className="h-4 w-4 ml-2"></SlidersHorizontal>
      );
    },
    cell: ({ row }) => <ProductActionsCell {...row.original} />
    // cell: ({ row }) => {
    //   const [isEditModalOpen, setEditModalOpen] = useState(false);
    //   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    //   const product = row.original;

    //   const closeModal = () => {
    //     setEditModalOpen(false);
    //   };

    //   const closeDeleteModal = () => {
    //     setDeleteModalOpen(false);
    //   };

    //   return (
        // <>
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button variant="ghost" className="h-8 w-8 p-0">
        //         <span className="sr-only">Open menu</span>
        //         <MoreHorizontal className="h-4 w-4" />
        //       </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="start">
        //       <DropdownMenuLabel className="text-center text-white bg-yellow-600">
        //         {product.name}
        //       </DropdownMenuLabel>
        //       <DropdownMenuSeparator />
        //       {/* <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(product.id)}
        //     >
        //       Copy ID
        //     </DropdownMenuItem> */}
        //       <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
        //         <div className="w-full flex flex-row items-center justify-between">
        //           <p>Rediģēt</p>
        //           <Pencil className="h-4 w-4"></Pencil>
        //         </div>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
        //         <div className="w-full flex flex-row text-red-500 items-center justify-between">
        //           <p>Dzēst</p>
        //           <Trash2 className="h-4 w-4"></Trash2>
        //         </div>
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>

        //   {/* edit modal component */}
        //   <EditModal
        //     isOpen={isEditModalOpen}
        //     onClose={closeModal}
        //     product={product}
        //   ></EditModal>
        //   {/* delete modal component */}
        //   <DeleteModal
        //     isOpen={isDeleteModalOpen}
        //     onClose={closeDeleteModal}
        //     product={product}
        //   ></DeleteModal>
        // </>
    //   );
    // },
  },
  {
    accessorKey: "name",
    header: "Nosaukums",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Datums</p>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      const formatted = format(new Date(date), "dd/MM/yyyy");

      return formatted;
    },
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
    header: "Veikals",
  },
];
