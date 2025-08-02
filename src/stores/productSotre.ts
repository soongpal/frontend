import { create} from "zustand";
import { persist } from 'zustand/middleware';
import { type Product } from "../types/product";

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (id: number, updated: Partial<Product>) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),
    }),
    {
      name: 'product-storage', // localStorage에 저장될 키 이름
      partialize: (state) => ({ products: state.products }), // 저장할 항목만 지정 (선택)
    }
  )
);

