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
import { myFavorites } from "../../api/userAPI";

const  FavoritesPage: React.FC = () =>{

// 좋아요 목록 불러오기
const [products, setProducts] = useState<Product[] | null >();
//const [currentPage, setCurrentPage] = useState(0);
//나중에 페이지네이션 추가

   useEffect(()=>{
        const fetchFavorites = async () => {
                    try {
                        const Favorites = await myFavorites(0);
                        setProducts(Favorites.products); 
                    } catch (error) {
                        console.error('좋아요 목록 불러오기 실패:', error);
                        setProducts(null);
                    }
                };
        
        fetchFavorites();
   }, []);    

    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>관심 목록</b>
            </h3>

            {products && products.length > 0 ? (
                <ProductGrid products={products}></ProductGrid>
            ) : (
                <div>좋아요한 글이 없습니다.</div>
            )}


        </div>
    )
}

export default FavoritesPage;