//공동구매 페이지

import type React from "react";
import ProducGrid from "../../../components/product/ProductGrid";

const GroupPurchasePage: React.FC = () =>{
    return(
        <div>
            <h3 className="text-center mt-4 mb-5"><b>공동구매</b></h3>
            <ProductGrid></ProductGrid>
        </div>
    )
}

export default GroupPurchasePage;