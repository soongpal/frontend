//맨처음 페이지임, 최신상품을 보여줄것
import { useEffect, useState } from "react";
import Banner from "../components/banner/Banner";
import ProductGrid from "../components/product/ProductGrid";
import dummy from "../data/dummy.json"
import { type Product } from "../types/product";
import FloatingButton from "../components/common/FloatingButton";


const Home: React.FC = () =>{

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        setProducts(dummy as Product[]);
    }, []);

    return(
        <div className="container">
            <Banner></Banner>
            <h3 className="text-center mt-3 mb-5"><b>최신 상품</b></h3>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
            <Banner></Banner>
        </div>
    );
}

export default Home;