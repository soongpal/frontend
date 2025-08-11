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

  loading: boolean;
  error: string | null;

  // actions
  setFilter: (filter: Partial<Filter>) => void;
  setPage: (page: number) => void;
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filter: {},
  page: 0,
  totalPages: 0,

  loading: false, // 로딩 여부
  error: null, // 에러 메시지 저장

//필터 변경 함수
  setFilter: (newFilter) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
      page: 1 // 필터 바뀌면 페이지 초기화
    }));
    get().fetchProducts();
  },

  //페이지 변경 함수
  setPage: (newPage) => {
    set({ page: newPage });
    get().fetchProducts();
  },

  //상품 목록 패치 함수
  fetchProducts: async () => {
    //로딩 시작, 에러메세지 초기화
    set({ loading: true, error: null });
    //필터, 페이지 정보 불러오기
    const { filter, page } = get();
    //api호출
    const res = await productApi.getProductList({ ...filter, page });

    set({
      products: res.products,
      totalPages: res.totalPages
    });
  }
}));

export default useProductStore;


