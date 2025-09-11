//r검색 결과 페이지
//react
import type React from "react";
import { useEffect } from "react";
//component
import ProductGrid from "../../components/product/ProductGrid";
import Filter from "../../components/common/Filter";
import FloatingButton from "../../components/common/FloatingButton";
//store
import { useProductStore } from "../../stores/productStore";

const SearchPage: React.FC = () =>{
   // 처음 불러오기
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>검색결과</b></h3>
            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
        </div>
    )
}

export default SearchPage;