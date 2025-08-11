//제품 상세보기 페이지(제품 클릭시 나오는 페이지)

import type React from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../stores/ProductStore";

import { ChevronRight, Heart, HeartFill, Share, ChatDots } from "react-bootstrap-icons";
import "../../styles/ProductDetailPage.css"

import { timeAgo } from "../../utils/time";

const ProductDetailPage: React.FC= () =>{
    //상품 id값 받아오기
    const { ProductId } = useParams();
    //전체 상품 store불러오기
    const products = useProductStore((state) => state.products);
    //상품id값으로 상품 찾기
    const product = products.find((p) =>p.id === Number(ProductId));

    if (!product) return <div>상품을 찾을 수 없습니다.</div>;

    //하트 버튼 함수
    const updateProduct = useProductStore((state) => state.updateProduct);

    const handleHeartClick = () => {
        updateProduct(product.id, { liked: !product.liked });
    };

    return(
        <div className="container d-flex flex-column justify-content-center">
            {/* 이미지영역 */}
            <div className="d-flex justify-content-center">
                <img src={product.images[0]} alt={product.title} className="thumbnail-img"/>
            </div>

            <div className="d-flex justify-content-between align-items-center my-3">
                <p className="gray-row">{product.category==='GROUP'?'공동구매':'중고거래'}<ChevronRight size={13} className="ms-2"/></p>
                <div className="d-flex align-items-center">
                    <button>
                        <Share color="gray" size={13}/>
                    </button>

                    <div className="d-flex align-items-center">
                        <button onClick={handleHeartClick}>
                            {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="gray"></Heart>}
                        </button>
                        {/* 이거 useeffect 처리할것 */}
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

                        <tr>
                            <th>판매자</th>
                            <td>{product.seller.sellerName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductDetailPage;