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
  likeProduct:(id: number) => Promise<void>;
  unlikeProduct: (id: number) => Promise<void>;
  editProduct: () => Promise<void>;
  deletePRoduct: ()=> Promise<void>;

}

export const useProductStore = create<ProductState>((set, get) => ({

  //초기값
  products: [],
  filter: {},
  page: 0,
  totalPages: 0,
  loading: false, 
  error: null,

//필터 변경 함수
  setFilter: (newFilter) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
      page: 0 // 필터 바뀌면 페이지 초기화
    }));

    const { fetchProducts } = get();
    fetchProducts();
  },

//페이지 변경 함수
  setPage: (newPage) => {
    set({ page: newPage });
    get().fetchProducts();
  },

//상품 목록 패치 함수
  fetchProducts: async () => {

    set({ loading: true, error: null });
    
    try{
      const { filter, page } = get();
      //api호출
      const data = await productApi.getProductList({ ...filter, page });

      set({
        products: data.products,
        // totalPages: data.totalPages, 나중 페이지네이션 할때 적용할것
        loading: false
      });
    }
    catch(err: unknown){
      const errorMessage = err instanceof Error? err.message: "상품을 불러오는 중 오류가 발생했습니다.";

      set({
        error: errorMessage,
        loading: false
      });

      console.error("상품 목록 불러오기 에러:", err);
    }

  },

//상품 좋아요 함수
  likeProduct:async (id) => {
     try {
      set({ loading: true });
      //api
      await productApi.likeProduct(id);
      //store내 product값 업데이트
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id
            ? { ...p, liked: true, likeCount: p.likeCount + 1 }
            : p
        ),
        loading: false,
        error: null
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "상품 좋아요 중 오류가 발생했습니다.";

      set({ error: errorMessage, loading: false });
      console.error("상품 좋아요 에러:", err);
    }
  },

//상품 좋아요 취소 함수
  unlikeProduct: async (id) => {
    try {
      set({ loading: true });
      //api
      await productApi.unLikeProduct(id);
      //store product 업데이트
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id
            ? { ...p, liked: false, likeCount: p.likeCount - 1 }
            : p
        ),
        loading: false,
        error: null
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "상품 좋아요 취소 중 오류가 발생했습니다.";

      set({ error: errorMessage, loading: false });
      console.error("상품 좋아요 취소 에러:", err);
    }
  },

//게시 상품 수정 함수
  editProduct: async () => {

  },

//상품 삭제 함수
  deletePRoduct: async () => {

  }


}));

export default useProductStore;


