//상품관련 라우트

import { Route, Routes } from "react-router-dom";
import GroupPurchasePage from "../pages/product/category/GroupPurchasePage";
import UsedTradePage from "../pages/product/category/UsedTradePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";


const ProductRouter : React.FC = () => {
    return(
        <Routes>
             <Route path="grouppurchase" element={<GroupPurchasePage />}/>
                        <Route path="usedtrade" element={<UsedTradePage />}/>
                        <Route path="productdetail/:ProductId" element={<ProductDetailPage />}/>
        </Routes>
    )
}

export default ProductRouter;