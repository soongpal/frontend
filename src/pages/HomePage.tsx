//맨처음 페이지임, 최신상품을 보여줄것
import Banner from "../components/banner/Banner";
import HomeProducGrid from "../components/product/HomeProductGrid";

const Home: React.FC = () =>{
    return(
        <div>
            <Banner></Banner>
            <h3 className="text-center mt-4 mb-4"><b>최신 상품</b></h3>
            <HomeProducGrid></HomeProducGrid>
            <Banner></Banner>
        </div>
    );
}

export default Home;