//맨처음 페이지임, 최신상품을 보여줄것
import Banner from "../components/banner/Banner";
import ProductGrid from "../components/product/ProductGrid";
import FloatingButton from "../components/common/FloatingButton";
import { useProductStore } from '../stores/productStore';
import { useEffect } from "react";

const Home: React.FC = () =>{

    const { products, setFilter, fetchProducts } = useProductStore();
    
    useEffect(() => {
        setFilter({category: undefined, status: undefined, keyword: undefined});
        fetchProducts();
    }, []);

    return(
        <div className="container">
            <h3 className="text-center mt-3 mb-5"><b>최신 상품</b></h3>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
            <Banner></Banner>
        </div>
    );
}

export default Home;