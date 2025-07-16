//중고거래 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";

const UsedTradePage: React.FC = () =>{
    return(
        <div>
            <h3 className="text-center mt-4 mb-5"><b>중고거래</b></h3>
            <ProductGrid></ProductGrid>
        </div>
    )
}

export default UsedTradePage;