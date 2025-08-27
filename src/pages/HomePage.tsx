//메인 홈페이지

//component
import Banner from "../components/banner/Banner";
import ProductGrid from "../components/product/ProductGrid";
import FloatingButton from "../components/common/FloatingButton";
//library
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
//store
import { useAuthStore } from "../stores/UserStore";
import { useProductStore } from '../stores/productStore';

const Home: React.FC = () =>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    useEffect(() => {
        //access token불러오기
        const accessToken = searchParams.get("access_token");

        if (accessToken) {
            //access token설정(이미잇다면 그걸사용..)
            setAccessToken(accessToken);
        
            //url에서 토큰 정보 제거
            searchParams.delete("access_token");

            navigate(window.location.pathname, { replace: true, state: {} });
        }
    }, [searchParams, navigate, setAccessToken]);




    //product store사용할것들
    const { products, setFilter, fetchProducts } = useProductStore();
    
    //필터 리셋해서 상품 불러오기
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