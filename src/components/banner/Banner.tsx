import type React from "react";
import { Carousel } from "react-bootstrap";
import '../../styles/Banner.css';

const Banner : React.FC = () =>{
    return(
        <div className="container mt-3">
            <Carousel>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src= '/images/banner/banner1.png' alt="banner1" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src='/images/banner/banner1.png' alt="banner2" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src='/images/banner/banner1.png'alt="banner3" />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>

    )
}

export default Banner;