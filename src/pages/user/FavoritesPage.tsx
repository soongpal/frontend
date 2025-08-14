//좋아요 목록 페이지
import type React from "react";
import Filter from "../../components/common/Filter";
import ProductGrid from "../../components/product/ProductGrid";
import { useProductStore } from "../../stores/productStore";
import GoMypage from "../../components/common/GoMypage";

const  FavoritesPage: React.FC = () =>{
   // 처음 불러오기
    const { products } = useProductStore();

    //내가 좋아요한 상품 목록 불러오기 api추가할것
    //1. liked ===true 인거 product store에서 자체 필터
    // 2. 백엔드 로직 추가?

    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>관심 목록</b>
            </h3>

            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>

        </div>
    )
}

export default FavoritesPage;