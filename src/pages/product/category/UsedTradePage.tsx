//중고거래 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import type { Status } from "../../../types/product";
import { useState } from "react";
import Filter from "../../../components/common/Filter";
import FloatingButton from "../../../components/common/FloatingButton";
import { useProductStore } from '../../../stores/productStore';



const UsedTradePage: React.FC = () =>{

    // 처음 불러오기
    const { products } = useProductStore();

    //필터 영역
    const [filter, setFilter] = useState<Status | null>(null);

    const handleFilter = (filter:Status | null)=>{
        setFilter(filter);
    };

    const groupPurchaseProducts = products.filter((product) => {
        if (filter === null) {
            return product.category === 'USED_TRADE';
            }
        return (
                product.category === 'USED_TRADE' &&
                product.status === filter
            );
    });

    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>중고거래</b></h3>
            <Filter onFilterSelect = {handleFilter}></Filter>
            <ProductGrid products={groupPurchaseProducts}></ProductGrid>
            <FloatingButton></FloatingButton>
        </div>
    )
}

export default UsedTradePage;