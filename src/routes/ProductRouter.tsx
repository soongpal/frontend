//상품관련 라우트

import { Route, Routes } from "react-router-dom";
import GroupPurchasePage from "../pages/product/category/GroupPurchasePage";
import UsedTradePage from "../pages/product/category/UsedTradePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import SearchPage from "../pages/product/SearchPage";

//product
const ProductRouter : React.FC = () => {
    return(
        <Routes>
            <Route path="grouppurchase" element={<GroupPurchasePage />}/>
            <Route path="usedtrade" element={<UsedTradePage />}/>
            <Route path="productdetail/:ProductId" element={<ProductDetailPage />}/>
            <Route path="search/:Keyword" element={<SearchPage />}/>
        </Routes>
    )
}

export default ProductRouter;