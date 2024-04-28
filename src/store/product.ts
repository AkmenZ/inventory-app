import { Product } from '@/app/dashboard/columns';
import { create } from 'zustand'

interface ProductsState {
    products: Product[];
    setProducts: (products: Product[]) => void;
    updateProduct: (updatedProduct: Product) => void;
  }

export const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    // updateProduct: (updatedProduct) => set((state) => ({
    //   products: state.products.map(product =>
    //     product.id === updatedProduct.id ? updatedProduct : product
    //   )
    // })),
    updateProduct: (updatedProduct) => set((state) => {
        const newProducts = state.products.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        console.log("New Products Array:", newProducts);
        return { products: newProducts };
      }),
  }));