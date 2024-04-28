"use client";

import { Product } from '@/app/dashboard/columns'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import EditModal from './edit-modal';
import DeleteModal from './delete-modal';

export default function ProductActionsCell(product: Product) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  
    const closeModal = () => {
      setEditModalOpen(false);
    };
  
    const closeDeleteModal = () => {
      setDeleteModalOpen(false);
    };
  
    return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="text-center text-white bg-yellow-600">
              {product.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            Copy ID
          </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
              <div className="w-full flex flex-row items-center justify-between">
                <p>Rediģēt</p>
                <Pencil className="h-4 w-4"></Pencil>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
              <div className="w-full flex flex-row text-red-500 items-center justify-between">
                <p>Dzēst</p>
                <Trash2 className="h-4 w-4"></Trash2>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* edit modal component */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeModal}
          product={product}
        ></EditModal>
        {/* delete modal component */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          product={product}
        ></DeleteModal>
      </>
    );
}
