//중고거래 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import Filter from "../../../components/common/Filter";
import FloatingButton from "../../../components/common/FloatingButton";
import { useProductStore } from '../../../stores/productStore';
import { useEffect } from "react";
import PageButton from "../../../components/common/Pagebutton";
import KakaoAdFit from "../../../components/banner/KakaoAdFit";



const UsedTradePage: React.FC = () =>{
  // 처음 불러오기
    const { products, setFilter } = useProductStore();

    useEffect(() => {
        setFilter({category: 'USED', status: undefined});
    }, []);    

    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>중고거래</b></h3>
            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
            <PageButton/>
            <div className="d-flex justify-content-center">
                <KakaoAdFit/>
            </div>
        </div>
    )
}

export default UsedTradePage;