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
import Loading from "../../components/common/Loading";

const SearchPage: React.FC = () =>{
    const { Keyword } = useParams<{ Keyword: string }>();
    const [search, setSearch] = useState<string| undefined>(""); // 검색어
    const [isLoading, setIsLoading] = useState<boolean>(true);  //로딩

    //검색어 불러오기
    useEffect(
        ()=>{
            setSearch(Keyword);
        }, [Keyword]
    );
    
   // 검색결과 세팅ㄱㄱ
    const { products, setFilter,  fetchProducts } = useProductStore();

    useEffect(() => {
        if (!search) {
        return;
        }

        const performSearch = async () => {
            setIsLoading(true);
            setFilter({ keyword: search, category: undefined, status: undefined });
            await fetchProducts(); // fetchProducts가 완료될 때까지 기다림
            setIsLoading(false); 
        };

        performSearch();
    }, [search, setFilter, fetchProducts])

    return(
        <div className="container">
            <h3 className="text-start mt-4 mb-4"><b>검색결과</b></h3>
            <Filter></Filter>

        {isLoading ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Loading></Loading>
        </div>

      ) : products && products.length > 0 ? (
        <ProductGrid products={products}></ProductGrid>
      ) : (

        <div className="d-flex flex-column justify-content-center align-items-center my-5">
          <h3>'{search}'에 대한 검색결과가 없습니다.</h3>
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