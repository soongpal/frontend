import Banner from "../component/banner/Banner";
import HomeProducGrid from "../component/product/HomeProductGrid";

const Home: React.FC = () =>{
    return(
        <div>
            <Banner></Banner>
            <h3 className="text-center mt-0 mb-4"><b>최신 상품</b></h3>
            <HomeProducGrid></HomeProducGrid>
        </div>
    );
}

export default Home;