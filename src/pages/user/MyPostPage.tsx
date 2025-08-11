//쓴글 목록 페이지

import type React from "react";
import { useProductStore } from "../../stores/ProductStore";
import { useState } from "react";
import type { Status } from "../../types/product";
import Filter from "../../components/common/Filter";
import ProductList from "../../components/product/ProductList";
import { useUserStore } from "../../stores/UserStore";
import GoMypage from "../../components/common/GoMypage";

const MyPostPage: React.FC = () =>{
    // 제품 불러오기
    const { products } = useProductStore();
    // 유저 정보 불러오기
    const { user } = useUserStore();

       
    //필터 영역
    const [filter, setFilter] = useState<Status | null>(null);
       
    const handleFilter = (filter:Status | null)=>{
        setFilter(filter);
    };
    
    //제품 목록 불러오기
    const myProducts = products.filter((product) => {
        if (filter === null) {
            return product.sellerId === user.id;
        }
        return (
            product.sellerId === user.id &&
            product.status === filter
        );
    });

    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>내가 쓴 글</b>
                </h3>
            <Filter onFilterSelect = {handleFilter}></Filter>
            <ProductList products={myProducts}></ProductList>
        </div>
    )
}

export default MyPostPage;