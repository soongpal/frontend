import type React from "react";
import { Carousel } from "react-bootstrap";
import '../../styles/Banner.css';

const Banner : React.FC = () =>{
    return(
        <div className="container mt-3">
            <Carousel>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src= '/images/banner/banner1.jpg' alt="banner1" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src='/images/banner/banner2.jpg' alt="banner2" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src='/images/banner/banner3.jpg'alt="banner3" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src='/images/banner/banner4.jpg'alt="banner3" />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>

    )
}

export default Banner;