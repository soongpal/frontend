//좋아요 목록 페이지
//react
import type React from "react";
import { useEffect, useState } from "react";
//component
import ProductGrid from "../../components/product/ProductGrid";
import GoMypage from "../../components/common/GoMypage";
//type
import type { Product } from "../../types/product";

//api
import { myFavorites } from "../../sevices/userService";

const  FavoritesPage: React.FC = () =>{

   // 좋아요 목록 불러오기
   const [products, setProducts] = useState<Product[] | null >();

   useEffect(()=>{
        const fetchFavorites = async () => {
                    try {
                        const productList : Product[] = await myFavorites();
                        setProducts(productList); 
                    } catch (error) {
                        console.error('좋아요 목록 불러오기 실패:', error);
                        setProducts(null);
                    }
                };
        
        fetchFavorites();
   }, []);

   //좋아요한 상품 없을시
   if (!products || products.length === 0) {
        return <div>좋아요한 상품이 없습니다.</div>;
    }
    

    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>관심 목록</b>
            </h3>

            <ProductGrid products={products}></ProductGrid>

        </div>
    )
}

export default FavoritesPage;