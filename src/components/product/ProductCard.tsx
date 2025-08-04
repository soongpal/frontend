import "../../styles/ProductCard.css";
import { Card } from "react-bootstrap";
import SoldoutTag from "../common/SoldoutTag";
import { type Product } from "../../types/product";
import { useProductStore } from '../../stores/productStore';  
import { Heart, HeartFill } from "react-bootstrap-icons";


type ProductCardProps = {
  product: Product;
};

const ProductCard = ( { product }: ProductCardProps)=>{
  //몇분전 표기 함수
  const now = new Date();
  const createdAt = new Date(product.createdAt);

  const diffMilliseconds = now.getTime() - createdAt.getTime();
  const minutesPassed = Math.floor(diffMilliseconds / (1000 * 60));

  let timeAgo: string;
  if (minutesPassed < 1) {
    timeAgo = '방금 전';
  } else if (minutesPassed < 60) {
    timeAgo = `${minutesPassed}분 전`;
  } else if (minutesPassed < 60 * 24) { 
    const hours = Math.floor(minutesPassed / 60);
    timeAgo = `${hours}시간 전`;
  } else {
    timeAgo = createdAt.toLocaleDateString('ko-KR');
  } 

  //상품 업데이트 함수
  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleHeartClick = () => {
    updateProduct(product.id, { liked: !product.liked });
  };

  return (
    <div>
      <Card className="product-card">
        <div className="product-card-img-wrapper">
          <Card.Img
            variant="top"
            src={product.images}
            className="product-card-img"
          />
          {product.status==='SOLD_OUT'&&<SoldoutTag />}
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-header">
            <div className="product-card-title">{product.title}</div>
              <button onClick={handleHeartClick}>
                  {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="grey"></Heart>}
              </button>
          </div>

          <Card.Text className="product-card-price">{product.price}원</Card.Text>
          <Card.Text className="product-card-time">{timeAgo}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;