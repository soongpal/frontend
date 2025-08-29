//쓴글 목록 페이지

//library
import type React from "react";
import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
//component
import Filter from "../../components/common/Filter";
import ProductList from "../../components/product/ProductList";
import GoMypage from "../../components/common/GoMypage";
//api
import { myPost } from "../../sevices/userService";


const MyPostPage: React.FC = () =>{

/// 좋아요 목록 불러오기
    const [products, setProducts] = useState<Product[] | null >();
    //const [currentPage, setCurrentPage] = useState(0);
    //나중에 페이지네이션 추가
    
    useEffect(()=>{
        const fetchFavorites = async () => {
            try {
                const productList : Product[] = await myPost(0);
                setProducts(productList); 
            } catch (error) {
                console.error('내가 쓴 글 목록 불러오기 실패:', error);
                setProducts(null);
            }
        };
            
        fetchFavorites();
       }, []);
    
    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>내가 쓴 글</b>
                </h3>
            {products && products.length > 0 ? (
                <ProductList products={products}></ProductList>
            ) : (
                <div>쓴글이 없습니다.</div>
            )}
        </div>
    )
}

export default MyPostPage;