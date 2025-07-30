//좋아요 목록 페이지
import dummy from "../../data/dummy.json"
import type React from "react";
import Filter from "../../components/common/Filter";
import { useEffect, useState } from "react";
import type { Product, Status } from "../../types/product";
import ProductGrid from "../../components/product/ProductGrid";

const  FavoritesPage: React.FC = () =>{
    //불러올 제품 목록
    const [products, setProducts] = useState<Product[]>([]);

    //필터 기능
    const [filter, setFilter] = useState<Status | null>(null);
    
    const handleFilter = (filter:Status | null)=>{
         setFilter(filter);
    };

    //제품 목록 불러오기
    useEffect(() => {
        const allProducts: Product[] = dummy as Product[];

        const likedProducts = allProducts.filter((product) => {
        if (filter === null) {
            return product.liked === true;
        }
        return (
            product.liked === true &&
            product.status === filter
        );
        });

        setProducts(likedProducts);
    }, [filter]);

    return(
        <div className="container">
            <h3 className="text-center mt-3 mb-3"><b>관심 목록</b></h3>
            <Filter onFilterSelect = {handleFilter}></Filter>
            <ProductGrid products={products}></ProductGrid>

        </div>
    )
}

export default FavoritesPage;