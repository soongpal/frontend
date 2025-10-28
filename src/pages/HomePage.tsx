//메인 홈페이지

//component
import Banner from "../components/banner/Banner";
import ProductGrid from "../components/product/ProductGrid";
import FloatingButton from "../components/common/FloatingButton";
import { KakaoAdFit } from "../components/banner/KakaoAdFit"
//library
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
//store
import { useAuthStore } from "../stores/UserStore";
import { useProductStore } from '../stores/productStore';

//api
import { myInfo } from "../api/userAPI";
import PageButton from "../components/common/Pagebutton";

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

    //유저 정보 설정
    const { setUser } = useAuthStore();
    useEffect(() => {
            const fetchUserInfo = async () => {
                try {
                const info = await myInfo();
                setUser(info); // store에 저장
                } catch (error) {
                console.error('유저 정보 불러오기 실패:', error);
                setUser(null);
                }
            };
    
      fetchUserInfo();
    }, []);

    //product store사용할것들
    const { products, setFilter } = useProductStore();
    
    //필터 리셋해서 상품 불러오기
    useEffect(() => {
        setFilter({category: undefined, status: undefined, keyword: undefined});
    }, []);


    return(
        <div className="container">
            <h3 className="text-center mt-3 mb-5"><b>최신 상품</b></h3>
            <ProductGrid products={products}></ProductGrid>
            <FloatingButton></FloatingButton>
            <Banner></Banner>
            <PageButton/>
            <KakaoAdFit/>
        </div>
    );
}

export default Home;