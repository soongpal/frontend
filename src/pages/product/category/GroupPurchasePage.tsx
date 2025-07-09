//공동구매 페이지

import type React from "react";
import HomeProducGrid from "../../../components/product/HomeProductGrid";

const GroupPurchasePage: React.FC = () =>{
    return(
        <div>
            <h3 className="text-center mb-5"><b>공동구매</b></h3>
            <HomeProducGrid></HomeProducGrid>
        </div>
    )
}

export default GroupPurchasePage;