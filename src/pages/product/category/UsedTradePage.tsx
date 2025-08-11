//중고거래 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import type { Status } from "../../../types/product";
import { useState } from "react";
import Filter from "../../../components/common/Filter";
import FloatingButton from "../../../components/common/FloatingButton";
import { useProductStore } from '../../../stores/ProductStore';



const UsedTradePage: React.FC = () =>{
  // 처음 불러오기
    const { products, setFilter, fetchProducts } = useProductStore();

    useEffect(() => {
        setFilter({category: 'GROUP'});
        fetchProducts();
    }, []);    


    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>중고거래</b></h3>
            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
        </div>
    )
}

export default UsedTradePage;