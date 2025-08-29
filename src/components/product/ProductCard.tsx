//library
import React from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/time";

//component
import SoldoutTag from "../common/SoldoutTag";
import { type Product } from "../../types/product";
import useProductStore from "../../stores/productStore";

//css
import { Heart, HeartFill } from "react-bootstrap-icons";
import "../../styles/ProductCard.css";
import { Card } from "react-bootstrap";



//props정의: 상위에서 product받아서 출력
type ProductCardProps = {
  product: Product;
};

const ProductCard = ( { product }: ProductCardProps)=>{

  //좋아요 버튼 함수
  const { likeProduct, unLikeProduct } = useProductStore();
  const handleHeartClick = () =>{
    if(product.liked===true){
      unLikeProduct(product.id);
    }
    else{
      likeProduct(product.id);
    }

  }
  
  //상품 상세페이지 함수
  const navigate = useNavigate();
    
  const gotoDetailpage = () => {
    navigate(`/product/productdetail/${product.id}`);
  };
    
  return (
    <div onClick={gotoDetailpage}>
      <Card className="product-card">
        {/* 이미지영역 */}
        <div className="product-card-img-wrapper">
          <Card.Img
            variant="top"
            key={product.images?.[0]?.id}
            src={product.images?.[0]?.imageUrl}
            className="product-card-img"
          />
          {product.status==='COMPLETED'&&<SoldoutTag />}
        </div>
        {/* 내용 영역 */}
        <Card.Body className="product-card-body">
          <div className="product-card-header">
            <div className="product-card-title">{product.title}</div>
              <button onClick={(e) => {
                      e.stopPropagation();
                      handleHeartClick();
                    }}>
                  {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="grey"></Heart>}
              </button>
          </div>

          <Card.Text className="product-card-price">{product.price}원</Card.Text>
          <div className="d-flex gap-1">
                        <Card.Text className="product-card-time">{product.authorNickname} ·</Card.Text>
            <Card.Text className="product-card-time">{timeAgo(product)}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default React.memo(ProductCard);