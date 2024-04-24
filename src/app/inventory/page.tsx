import { Button } from "@/components/ui/button";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Dzeltena Tulpe",
      date: "23/04/2024",
      quantity: 100,
      priceVAT: 80,
      priceSale: 90,
      store: "Rīga",
      status: "success",
    },
    {
      id: "728ed52f",
      name: "Pienenes",
      date: "23/04/2024",
      quantity: 200,
      priceVAT: 100,
      priceSale: 120,
      store: "Tukums",
      status: "success",
    },
    {
      id: "728ed52f",
      name: "Sarkana Roze",
      date: "23/04/2024",
      quantity: 200,
      priceVAT: 100,
      priceSale: 120,
      store: "Kandava",
      status: "success",
    },
    {
      id: "728ed52f",
      name: "Balta Roze",
      date: "23/04/2024",
      quantity: 200,
      priceVAT: 100,
      priceSale: 120,
      store: "Tukums",
      status: "success",
    },
    {
      id: "728ed52f",
      name: "Dižskabardzis",
      date: "24/04/2024",
      quantity: 300,
      priceVAT: 100,
      priceSale: 120,
      store: "Bauska",
      status: "success",
    },
    {
      id: "728ed52f",
      name: "Sarkana Roze",
      date: "24/04/2024",
      quantity: 50,
      priceVAT: 70,
      priceSale: 85,
      store: "Rīga",
      status: "success",
    },
    // ...
  ];
}

export default async function InventoryPage() {
  const data = await getData();

  return (
    <div className="container flex flex-col h-screen items-center justify-start">
      <h1 className="text-2xl font-semibold py-4">
        Bāzes Inventorijas Kopskats
      </h1>

      <div className="w-full flex justify-end">
        <Button className="text-white">Augšuplādēt CSV</Button>
      </div>

      <div className="w-full py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
