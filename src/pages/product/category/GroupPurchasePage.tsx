//공동구매 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import dummy from "../../../data/dummy.json"
import { useEffect, useState } from "react";
import type { Product } from "../../../types/product";
import Filter from "../../../components/common/Filter";
import { Container } from "react-bootstrap";
import FloatingButton from "../../../components/common/FloatingButton";

const GroupPurchasePage: React.FC = () =>{

    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const allProducts: Product[] = dummy as Product[];
        const groupPurchaseProducts = allProducts.filter(
            (product) => product.category === 'GROUP_PURCHASE');
        setProducts(groupPurchaseProducts);
    }, []);


    return(
        <Container>
            <h3 className="text-start mt-4 mb-5"><b>공동구매</b></h3>
            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
        </Container>
    )
}

export default GroupPurchasePage;