//중고거래 페이지

import type React from "react";
import ProductGrid from "../../../components/product/ProductGrid";
import dummy from "../../../data/dummy.json"
import type { Product } from "../../../types/product";
import { useEffect, useState } from "react";
import Filter from "../../../components/common/Filter";
import { Container } from "react-bootstrap";


const UsedTradePage: React.FC = () =>{

    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const allProducts: Product[] = dummy as Product[];
        const groupPurchaseProducts = allProducts.filter(
            (product) => product.category === 'USED_TRADE');
        setProducts(groupPurchaseProducts);
    }, []);


    return(
        <Container>
            <h3 className="text-start mt-4 mb-5"><b>중고거래</b></h3>
            <Filter></Filter>
            <ProductGrid products={products}></ProductGrid>
        </Container>
    )
}

export default UsedTradePage;