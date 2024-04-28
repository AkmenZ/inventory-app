"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import readExcelFile from "read-excel-file";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InventoryPage() {
  const [jsonData, setJsonData] = useState<Product[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // convert .xlsx to json
  const handleConvert = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      readExcelFile(file)
        .then((rows: any[]) => {
          const json: Product[] = rows.slice(1).map((row) => {
            const obj: any = {};
            rows[0].forEach((header: string, i: number) => {
              obj[header] = row[i];
            });
            return obj as Product;
          });
          console.log(json);
          setJsonData(json);
        })
        .catch((error) => {
          console.error("Error reading file:", error);
          setJsonData([]);
        });
    }
  };

  return (
    <div className="container flex flex-col h-screen items-center justify-start">
      <h1 className="text-2xl font-semibold py-4">Pievienot Failu</h1>

      <div className="flex w-full items-end justify-between">
        <div className="flex flex-row items-end space-x-2">
          <div>
            <Label htmlFor="text" className="text-primary text-xs font-light">
              Derīgs formāts .xlsx, .xls
            </Label>
            <Input
              type="file"
              accept=".xls,.xlsx"
              ref={fileInputRef}
              className="bg-secondary"
            />
          </div>
          <Button className="text-white" onClick={handleConvert}>
            Apstrādāt
          </Button>
        </div>
        {jsonData.length > 0 && (
          <Button className="ml-2 text-white bg-green-600 hover:bg-green-800">
            Saglabāt
          </Button>
        )}
      </div>

      {jsonData.length > 0 && (
        <div className="w-full py-4">
          <DataTable columns={columns} data={jsonData} />
        </div>
      )}
    </div>
  );
}
