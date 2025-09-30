// product detail페이지 이미지 관리(썸네일, 방향키, 이미지 최대 5개)

import { useState } from "react";
import "../../styles/ImageGallery.css"

interface ImageGalleryProps {
   images: { 
        id: number; 
        imageUrl: string 
    }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) =>{

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    //이미지 없을시
    if (!images || images.length === 0) {
        return (
            <div className="gallery-container">
                <div className="main-image-container">
                    <img 
                        src="/images/empty.png" 
                        alt="이미지가 없습니다" 
                        className="main-image" 
                    />
                </div>
                <div className="thumbnail-container"></div>
            </div>
        );
    }

    // 썸네일 클릭시
    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    //이전 화살표 클릭시
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    //다음 화살표 클릭시 
    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };


    return(
        <div className="gallery-container">
            {/* 메인 이미지 영역 */}
            <div className="main-image-container">
                <button onClick={handlePrevClick} className="arrow-btn prev-arrow">
                    &lt;
                </button>
                <img src={images[currentIndex].imageUrl} alt="Main Product" className="main-image" />
                <button onClick={handleNextClick} className="arrow-btn next-arrow">
                    &gt;
                </button>
            </div>
            
            {/* 썸네일 영역 */}
            <div className="thumbnail-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail-image ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageGallery;