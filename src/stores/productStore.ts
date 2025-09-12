// stores/productStore.ts
import { create } from "zustand";
import { type Product, type Category, type Status } from "../types/product";
import * as productApi from "../api/productAPI";

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

  loading: boolean;
  error: string | null;

  // actions
  setFilter: (filter: Partial<Filter>) => void;
  setPage: (page: number) => void;
  fetchProducts: (filterParam?: Filter, pageParam?: number) => Promise<void>;
  likeProduct:(id: number) => Promise<void>;
  unLikeProduct: (id: number) => Promise<void>;
  deleteProduct: (id:number)=> Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  // 초기값
  products: [],
  filter: {},
  page: 0,
  totalPages: 0,
  loading: false,
  error: null,

  // 필터 변경
  setFilter: (newFilter) => {
    const { fetchProducts, filter } = get();
    const updatedFilter = { ...filter, ...newFilter };
    const resetPage = 0;

    // 상태 업데이트
    set({ filter: updatedFilter, page: resetPage });

    // 최신 상태 기반 fetch
    fetchProducts(updatedFilter, resetPage);
  },

  // 페이지 변경
  setPage: (newPage) => {
    const { fetchProducts, filter } = get();
    set({ page: newPage });
    fetchProducts(filter, newPage);
  },

  // 상품 목록 fetch
  fetchProducts: async (filterParam?: Filter, pageParam?: number) => {
    set({ loading: true, error: null });

    try {
      const { filter, page } = get();
      const finalFilter = filterParam || filter;
      const finalPage = pageParam ?? page;

      const data = await productApi.getProductList({ ...finalFilter, page: finalPage });

      set({
        products: data.products,
        totalPages: data.totalPages,
        loading: false
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "상품을 불러오는 중 오류가 발생했습니다.";
      set({ error: errorMessage, loading: false });
      console.error("상품 목록 불러오기 에러:", err);
    }
  },

  // 상품 좋아요
  likeProduct: async (id) => {
    try {
      set({ loading: true });
      await productApi.likeProduct(id);

      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, liked: true, likeCount: p.likeCount + 1 } : p
        ),
        loading: false,
        error: null
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "상품 좋아요 중 오류가 발생했습니다.";
      set({ error: errorMessage, loading: false });
      console.error("상품 좋아요 에러:", err);
    }
  },

  // 상품 좋아요 취소
  unLikeProduct: async (id) => {
    try {
      set({ loading: true });
      await productApi.unLikeProduct(id);

      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, liked: false, likeCount: p.likeCount - 1 } : p
        ),
        loading: false,
        error: null
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "상품 좋아요 취소 중 오류가 발생했습니다.";
      set({ error: errorMessage, loading: false });
      console.error("상품 좋아요 취소 에러:", err);
    }
  },

  // 상품 삭제
  deleteProduct: async (id) => {
    try {
      set({ loading: true });
      await productApi.deleteProduct(id);

      // 삭제 후 최신 상품 목록 fetch
      const { filter, page, fetchProducts } = get();
      fetchProducts(filter, page);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "상품을 삭제하는 중 오류가 발생했습니다.";
      set({ error: errorMessage, loading: false });
      console.error("상품 삭제 에러:", err);
    }
  }
}));

export default useProductStore;
