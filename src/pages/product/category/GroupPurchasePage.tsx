//공동구매 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import dummy from "../../../data/dummy.json"
import { useEffect, useState } from "react";
import type { Product } from "../../../types/product";

const GroupPurchasePage: React.FC = () =>{

 const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        setProducts(dummy as Product[]);
    }, []);


    return(
        <div>
            <h3 className="text-center mt-4 mb-5"><b>공동구매</b></h3>
            <ProductGrid products={products}></ProductGrid>
        </div>
    )
}

export default GroupPurchasePage;