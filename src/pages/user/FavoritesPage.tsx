//좋아요 목록 페이지
import type React from "react";
import Filter from "../../components/common/Filter";
import { useState } from "react";
import type { Status } from "../../types/product";
import ProductGrid from "../../components/product/ProductGrid";
import { useProductStore } from "../../stores/productStore";
import GoMypage from "../../components/common/GoMypage";

const  FavoritesPage: React.FC = () =>{
   // 처음 불러오기
    const { products } = useProductStore();
   
    //필터 영역
    const [filter, setFilter] = useState<Status | null>(null);
   
    const handleFilter = (filter:Status | null)=>{
        setFilter(filter);
    };

    //제품 목록 불러오기
    const likedProducts = products.filter((product) => {
        if (filter === null) {
            return product.liked === true;
        }
        return (
            product.liked === true &&
            product.status === filter
        );
    });

    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>관심 목록</b>
            </h3>

            <Filter onFilterSelect = {handleFilter}></Filter>
            <ProductGrid products={likedProducts}></ProductGrid>

        </div>
    )
}

export default FavoritesPage;