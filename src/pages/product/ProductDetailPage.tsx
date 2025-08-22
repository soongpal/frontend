//제품 상세보기 페이지(제품 클릭시 나오는 페이지)

//library
import type React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//style
import { useProductStore } from "../../stores/productStore";
import { ChevronRight, Heart, HeartFill, Share, ChatDots } from "react-bootstrap-icons";
import "../../styles/ProductDetailPage.css"
//api
import { getProductDetail } from "../../sevices/productService"
//util
import { timeAgo } from "../../utils/time";
//type
import type { Product } from "../../types/product";

const ProductDetailPage: React.FC = () => {
    // store함수 불러오기
    const { likeProduct, unLikeProduct } = useProductStore();

    // 상품 id값 받아오기
    const { ProductId } = useParams<{ ProductId: string }>();
    const productId = Number(ProductId);

    // 상품 id로 상품 불러오기
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!isNaN(productId)) {
            getProductDetail(productId)
                .then(setProduct)
                .catch(err => console.error("상품 불러오기 실패:", err));
        }
    }, [productId]);

    // 좋아요 버튼 함수
    const handleHeartClick = () => {
        if (!product) return;
        
        if (product.liked === true) {
            unLikeProduct(product.id);
        } else {
            likeProduct(product.id);
        }
    }

    // 로딩 중
    if (!product) {
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <p>로딩 중...</p>
            </div>
        );
    }

    // 로딩 성공
    return (
        <div className="container d-flex flex-column justify-content-center">
            {/* 이미지영역 */}
            <div className="d-flex justify-content-center">
                <img  key={product.images[0].id} src={product.images[0].imageUrl} alt={product.title} className="thumbnail-img"/>
            </div>

            <div className="d-flex justify-content-between align-items-center my-3">
                <p className="gray-row">{product.category === 'GROUP' ? '공동구매' : '중고거래'}<ChevronRight size={13} className="ms-2"/></p>
                <div className="d-flex align-items-center">
                    <button>
                        <Share color="gray" size={13}/>
                    </button>
                    <div className="d-flex align-items-center">
                        <button onClick={handleHeartClick}>
                            {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="gray"></Heart>}
                        </button>
                        <p className="gray-row">{product.likeCount}</p>
                    </div>
                </div>
            </div>

            {/* 제목 */}
            <h1 className="mt-3 mb-0">{product.title}</h1>

            {/* 날짜 */}
            <p className="gray-row mb-3">{timeAgo(product)}</p>

            {/* 설명란 */}
            <p className="my-3">{product.content}</p>

            {/* 버튼들 */}
            <div className="d-flex justify-content-between my-3">
                <h1>{product.price}</h1>
                <div className="d-flex">
                    <button className="round-button justify-content-center" onClick={handleHeartClick}>
                        {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="gray"></Heart>}
                    </button>
                    <button className="round-button"><ChatDots className="me-2"/>대화하기</button>
                </div>
            </div>

            {/* 부가 설명 */}
            <div className="table-container">
                <table>
                    <tbody>
                        <tr>
                            <th>상품 링크</th>
                            <td><a href={product.url} target="_blank" className="product-link">{product.url}</a></td>
                        </tr>
                        <tr>
                            <th>희망 거래 장소</th>
                            <td>{product.location}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetailPage;