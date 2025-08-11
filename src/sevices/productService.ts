//상품관련 api(상품 조회, 상품 등록)
import { BASE_URL } from "./api";
import { type Product, type Category, type Status } from "../types/product";

import axios from 'axios';

// 목록 조회 (필터링 포함)
export const getProductList = async (params: {
  category?: Category;
  status?: Status;
  keyword?: string;
  page: number;
}) => {
  const res = await axios.get(`${BASE_URL}/api/board`, { params });
  return res.data as {
    products: Product[];
    totalPages: number;
  };
};

// 상세 조회
export const getProductDetail = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/api/board/${id}`);
  return res.data as Product;
};

// 생성
export const createProduct = async (data: Omit<Product, "id">) => {
  const res = await axios.post(`${BASE_URL}/api/board`, data);
  return res.data as Product;
};

// 수정
export const updateProduct = async (id: number, data: Partial<Product>) => {
  const res = await axios.put(`${BASE_URL}/api/board/${id}`, data);
  return res.data as Product;
};

// 삭제
export const deleteProduct = async (id: number) => {
  await axios.delete(`${BASE_URL}/api/board/${id}`);
};

// 개별 좋아요 개수 조회
export const getProductLikeCount = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/api/board/${id}/like`);
  return res.data as { likeCount: number };
};

// 좋아요 생성
export const addProductLike = async (id: number) => {
  await axios.post(`${BASE_URL}/api/board/${id}/like`);
};

// 좋아요 삭제
export const removeProductLike = async (id: number) => {
  await axios.delete(`${BASE_URL}/api/board/${id}/like`);
};
