"use client";

import { X } from "lucide-react";
import { Product } from "@/app/dashboard/columns";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { useProductsStore } from "@/store/product";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

async function handleUpdate(product: Product) {
  try {
    const response = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          id: product.id,
          name: product.name,
          date: product.date,
          quantity: product.quantity,
          priceVAT: product.priceVAT,
          priceSale: product.priceSale,
          store: product.store,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export default function EditModal(props: EditModalProps) {
  const { product } = props;
  const { toast } = useToast();
  const updateProduct = useProductsStore((state) => state.updateProduct);
  const form = useForm({
    defaultValues: {
      id: product.id,
      name: product.name,
      date: product.date,
      quantity: product.quantity,
      priceVAT: product.priceVAT,
      priceSale: product.priceSale,
      store: product.store,
    },
  });

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary shadow-xl max-w-md w-full p-1">
        <div className="flex w-full justify-end">
          <Button variant="ghost" onClick={props.onClose}>
            <X></X>
          </Button>
        </div>
        <h1 className="text-2xl text-center">{props.product.name}</h1>

        <Form {...form}>
          <form className="space-y-2 p-2">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nosaukums</FormLabel>
                  <FormControl>
                    <Input placeholder="Nosaukums..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage /> */}
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <FormField
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Skaits</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Skaits..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="store"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Veikals</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Veikals..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tukums">Tukums</SelectItem>
                          <SelectItem value="Rīga">Rīga</SelectItem>
                          <SelectItem value="Kandava">Kandava</SelectItem>
                          <SelectItem value="Bauska">Bauska</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* submit button */}
            <Button
              className="bg-green-600 hover:bg-green-800 text-white"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();

                const formData = form.getValues() as Product;
                formData.quantity = parseInt(formData.quantity as any, 10);

                try {
                  const updatedProduct = await handleUpdate(formData);
                  // update the store with the new product data
                  updateProduct(updatedProduct);

                  toast({
                    variant: "success",
                    title: "Zaibiss :)",
                    description: "Izmaiņas saglabātas veiksmīgi!",
                  });
                } catch (error) {
                  console.log(error);
                  toast({
                    variant: "destructive",
                    title: "Ak nē... :(",
                    description: "Izmaiņas netika saglabātas.",
                  });
                }
                props.onClose();
              }}
            >
              Saglabāt
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
