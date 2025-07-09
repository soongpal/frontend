//중고거래 페이지

import type React from "react";
import HomeProducGrid from "../../../components/product/HomeProductGrid";

const UsedTradePage: React.FC = () =>{
    return(
        <div>
            <h3 className="text-center mt-4 mb-5"><b>중고거래</b></h3>
            <HomeProducGrid></HomeProducGrid>
        </div>
    )
}

export default UsedTradePage;