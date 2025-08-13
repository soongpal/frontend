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
    try{
        const res = await axios.get(`${BASE_URL}/api/board`, { params });
        return res.data.result as {
            products: Product[];
        };
    } 
    catch(err){
        console.error(err);
        throw err;
    }
 
};

// 상세 조회
export const getProductDetail = async (id: number) => {
    try{
        const res = await axios.get(`${BASE_URL}/api/board/${id}`);
        return res.data.result as Product;
    } 
    catch(err){
        console.error(err);
        throw err;
    }
};

// 생성
export const createProduct = async (data: FormData) => {
    try{
        const res = await axios.post(`${BASE_URL}/api/board`, data);
        return res.data.result as Product;
    } 
    catch(err){
        console.error(err);
        throw err;
    }
  
};

// 수정
export const updateProduct = async (id: number, data: Partial<Product>) => {
    try{
        const res = await axios.put(`${BASE_URL}/api/board/${id}`, data);
        return res.data.result as Product;
    }
    catch(err){
        console.error(err);
        throw err;
    }
  
};

// 삭제
export const deleteProduct = async (id: number) => {
    try{
        await axios.delete(`${BASE_URL}/api/board/${id}`);
    }
    catch(err){
        console.error(err);
        throw err;
    }

};

// 개별 좋아요 개수 조회
export const productLikeCount = async (id: number) => {
    try{
        const res = await axios.get(`${BASE_URL}/api/board/${id}/like`);
        return res.data as { likeCount: number };
    }
    catch(err){
        console.error(err);
        throw err;
    }

};

// 좋아요 생성
export const likeProduct = async (id: number) => {
    try{
        await axios.post(`${BASE_URL}/api/board/${id}/like`);
    }
    catch(err){
        console.error(err);
        throw err;
    }

};

// 좋아요 삭제
export const unLikeProduct = async (id: number) => {
    try{
        await axios.delete(`${BASE_URL}/api/board/${id}/like`);
    }
    catch(err){
        console.error(err);
        throw err;
    }

};
