"use client"

import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useProductsStore } from "@/store/product";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  // from zustand store
  const setProducts = useProductsStore((state) => state.setProducts);
  const products = useProductsStore((state) => state.products);

  useEffect(() => {
    async function fetchData() {
      if (session) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/products`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: Status ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
      }
    }

    fetchData().catch(error => console.error('Error fetching products:', error));
  }, [session, setProducts]);


  if (status === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div className="container flex flex-col h-screen items-center justify-start">
      <h1 className="text-2xl font-semibold py-4">
        Bāzes Inventorijas Kopskats
      </h1>

      <div className="w-full py-4">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
