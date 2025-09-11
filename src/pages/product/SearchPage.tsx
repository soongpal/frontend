//react
import type React from "react";
import { useEffect, useState } from "react";
//component
import ProductGrid from "../../components/product/ProductGrid";
import Filter from "../../components/common/Filter";
import FloatingButton from "../../components/common/FloatingButton";
//store
import { useProductStore } from "../../stores/productStore";
import { useParams } from "react-router-dom";

const SearchPage: React.FC = () =>{

    //검색어 불러오기
    const { Keyword } = useParams<{ Keyword: string }>();
    const [search, setSearch] = useState<string| undefined>(""); // 검색어
    
    useEffect(
        ()=>{
            setSearch(Keyword);
        }, [Keyword]
    );
    
   // 검색결과 불러오기
    const { products, setFilter,  fetchProducts } = useProductStore();

    useEffect(() => {
        setFilter({ keyword: search, category: undefined, status: undefined });
        fetchProducts();
    }, [search]);

    return(
         <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>검색결과</b></h3>
            <Filter></Filter>

            {products && products.length > 0 ? (
                <ProductGrid products={products}></ProductGrid>
                ):(
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3>{search}에 대한 검색결과가 없습니다.</h3>
                    <ul>
                        <li>단어의 철자가 정확한지 확인해 보세요</li>
                        <li>보다 일반적인 검색어로 다시 검색해 보세요</li>
                        <li>검색어의 띄어쓰기를 다르게 해보세요</li>
                        <li>유해/금지어가 아닌지 확인해주세요</li>
                    </ul>
                </div>
                )
            }
            <FloatingButton></FloatingButton>
        </div>
    )
}

export default SearchPage;