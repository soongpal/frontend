//공동구매 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import { useEffect } from "react";
import Filter from "../../../components/common/Filter";
import FloatingButton from "../../../components/common/FloatingButton";
import { useProductStore } from "../../../stores/productStore";
import PageButton from "../../../components/common/Pagebutton";

const GroupPurchasePage: React.FC = () =>{
   // 처음 불러오기
    const { products, setFilter,fetchProducts } = useProductStore();

    useEffect(() => {
        setFilter({category: 'GROUP', status: undefined});
    }, []);

    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>공동구매</b></h3>
            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
            <PageButton/>
        </div>
    )
}

export default GroupPurchasePage;