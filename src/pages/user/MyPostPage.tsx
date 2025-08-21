//쓴글 목록 페이지

//library
import type React from "react";
//component
import Filter from "../../components/common/Filter";
import ProductList from "../../components/product/ProductList";
import GoMypage from "../../components/common/GoMypage";
//store
import useProductStore from "../../stores/productStore";


const MyPostPage: React.FC = () =>{

    // 유저 정보 불러오기
    // const { user } = useUserStore();
    // 유저가 쓴 글 목록 api요청 로직 추가(백엔드( 추가한다햇음)
    const {products} = useProductStore(); //임시

    return(
        <div className="container">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>내가 쓴 글</b>
                </h3>
            <Filter></Filter>
            <ProductList products={products}></ProductList>
        </div>
    )
}

export default MyPostPage;