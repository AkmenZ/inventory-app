"use client";

import { X, TriangleAlert } from "lucide-react";
import { Product } from "@/app/dashboard/columns";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useProductsStore } from "@/store/product";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

async function handleDelete(product: Product) {
  try {
    const response = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export default function DeleteModal(props: DeleteModalProps) {
  const { product } = props;
  const { toast } = useToast();
  const updateProduct = useProductsStore((state) => state.updateProduct);

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary shadow-xl max-w-md w-full p-4 space-y-4">
        <div className="flex flex-row justify-center">
          <TriangleAlert className="text-red-500 h-10 w-10"></TriangleAlert>
        </div>

        <h3 className="text-2xl text-center">Uzmanību</h3>
        <p className="text-md text-center">Produkts {props.product.name} tiks neatgriezeniski dzēsts!</p>

        <div className="flex flex-row justify-center gap-4">
          <Button className="text-white" onClick={props.onClose}>
            Atcelt
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-700 text-white"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();

              try {
                await handleDelete(product);
                toast({
                  variant: "success",
                  title: "Zaibiss :)",
                  description: "Produkts dzēsts veiksmīgi!",
                });
              } catch (error) {
                console.log(error);
                toast({
                  variant: "destructive",
                  title: "Ak nē... :(",
                  description: "Produkts netika izdzēsts.",
                });
              }
              props.onClose();
            }}
          >
            Dzēst
          </Button>
        </div>
      </div>
    </div>
  );
}
