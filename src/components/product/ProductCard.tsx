import "../../styles/ProductCard.css";
import { Card } from "react-bootstrap";
import SoldoutTag from "../common/SoldoutTag";
import HeartButton from "../common/HeartButton";
import { type Product } from "../../types/product";


interface ProductCardProps{
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
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
            <HeartButton></HeartButton>
          </div>

          <Card.Text className="product-card-price">{product.price}원</Card.Text>
          <Card.Text className="product-card-time">{timeAgo}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;