import type React from "react";
import { Carousel } from "react-bootstrap";
import '../../styles/Banner.css';
import banner1 from "../../assets/images/banners/banner1.png";

const Banner : React.FC = () =>{
    return(
        <div className="container mt-3">
            <Carousel>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src= {banner1} alt="banner1" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src={banner1} alt="banner2" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src={banner1}alt="banner3" />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>

    )
}

export default Banner;