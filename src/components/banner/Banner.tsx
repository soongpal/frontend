import type React from "react";
import { Carousel, Container } from "react-bootstrap";
import '../../styles/Banner.css';

const Banner : React.FC = () =>{
    return(
        <Container>
            <Carousel>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src="../../assets/images/banners/banner1.png" alt="banner1" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src="../../assets/images/banners/banner1.png" alt="banner2" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="banner-item">
                        <img src="../../assets/images/banners/banner1.png" alt="banner3" />
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>

    )
}

export default Banner;