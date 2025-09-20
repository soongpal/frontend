//상품관련 api(상품 조회, 상품 등록)
import api, { BASE_URL } from "./api";
import { type Product, type Category, type Status } from "../types/product";

// 목록 조회 (필터링 포함)
export const getProductList = async (params: {
  category?: Category;
  status?: Status;
  keyword?: string;
  page: number;
}) => {
    try{
        const res = await api.get(`${BASE_URL}/api/board`, { params });
        const { boards, currentPage, totalPages } = res.data.result;
  
        return {
            products: boards as Product[],
            currentPage,
            totalPages
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
        const res = await api.get(`${BASE_URL}/api/board/${id}`);
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
        const res = await api.post(`/api/board`, data,  
        );
        return res.data.result as Product;
    } 
    catch(err){
        console.error(err);
        throw err;
    }
  
};

// 상품 수정
export type EditProductData = {
    title: string;
    content: string;
    price: number;
    url: string;
    location: string;
    category: string;
    status: string;
    newImages?: FileList | File[];
    deleteImageIds?: number[];
};

// 수정
export const eidtProduct = async (id: number, data: EditProductData) => {
    try {
        const formData = new FormData();

        // JSON으로 보낼 데이터 객체
        const boardData = {
            title: data.title,
            content: data.content,
            price: data.price,
            url: data.url,
            location: data.location,
            category: data.category,
            status: data.status
        };
        
        // 객체를 FormData에 추가
        const boardBlob = new Blob([JSON.stringify(boardData)], { type: 'application/json' });
        formData.append("board", boardBlob);

        // 삭제할 이미지 ID가 있다면 추가
        if (data.deleteImageIds && data.deleteImageIds.length > 0) {
            const deleteIdsBlob = new Blob([JSON.stringify(data.deleteImageIds)], { type: 'application/json' });
            formData.append("deleteImageIds", deleteIdsBlob);
        }
        
        // 새로 추가할 이미지가 있다면 추가
        if (data.newImages) {
            Array.from(data.newImages).forEach(file => {
                formData.append('newImages', file);
            });
        }

        const res = await api.put(`/api/board/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return res.data.result;
    } catch (error) {

        console.error('상품 수정 실패:', error);
        throw error;
    }
};

// 삭제
export const deleteProduct = async (id: number) => {
    try{
        await api.delete(`/api/board/${id}`);
    }
    catch(err){
        console.error(err);
        throw err;
    }

};

// 개별 좋아요 개수 조회
export const productLikeCount = async (id: number) => {
    try{
        const res = await api.get(`${BASE_URL}/api/board/${id}/like`);
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
        await api.post(`/api/board/${id}/like`);
    }
    catch(err){
        console.error(err);
        throw err;
    }

};

// 좋아요 삭제
export const unLikeProduct = async (id: number) => {
    try{
        await api.delete(`/api/board/${id}/like`);
    }
    catch(err){
        console.error(err);
        throw err;
    }

};
