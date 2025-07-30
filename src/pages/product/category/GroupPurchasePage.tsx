//공동구매 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import dummy from "../../../data/dummy.json"
import { useEffect, useState } from "react";
import type { Product, Status } from "../../../types/product";
import Filter from "../../../components/common/Filter";
import FloatingButton from "../../../components/common/FloatingButton";

const GroupPurchasePage: React.FC = () =>{
    // 처음 불러오기
    const [products, setProducts] = useState<Product[]>([]);

    //필터 영역
    const [filter, setFilter] = useState<Status | null>(null);

    const handleFilter = (filter:Status)=>{
        setFilter(filter);
    };
    

    useEffect(() => {
        const allProducts: Product[] = dummy as Product[];

        const groupPurchaseProducts = allProducts.filter((product) => {
        if (filter === null) {
            return product.category === 'GROUP_PURCHASE';
        }
        return (
            product.category === 'GROUP_PURCHASE' &&
            product.status === filter
        );
        });

        setProducts(groupPurchaseProducts);
    }, [filter]);

    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>공동구매</b></h3>
            <Filter onFilterSelect = {handleFilter}></Filter>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
        </div>
    )
}

export default GroupPurchasePage;