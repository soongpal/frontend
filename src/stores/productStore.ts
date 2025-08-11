// stores/productStore.ts
import { create } from "zustand";
import { type Product, type Category, type Status } from "../types/product";
import * as productApi from "../sevices/productService";

interface Filter {
  category?: Category;
  status?: Status;
  keyword?: string;
}

interface ProductState {
  products: Product[];
  filter: Filter;
  page: number;
  totalPages: number;

  // actions
  setFilter: (filter: Partial<Filter>) => void;
  setPage: (page: number) => void;
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filter: {},
  page: 1,
  totalPages: 0,

  setFilter: (newFilter) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
      page: 1 // 필터 바뀌면 페이지 초기화
    }));
    get().fetchProducts();
  },

  setPage: (newPage) => {
    set({ page: newPage });
    get().fetchProducts();
  },

  fetchProducts: async () => {
    const { filter, page } = get();
    const res = await productApi.getProductList({ ...filter, page });
    set({
      products: res.products,
      totalPages: res.totalPages
    });
  }
}));

export default useProductStore;


