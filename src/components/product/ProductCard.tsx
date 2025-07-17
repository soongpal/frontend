import "../../styles/ProductCard.css";
import { Card } from "react-bootstrap";
import SoldoutTag from "../common/SoldoutTag";
import HeartButton from "../common/HeartButton";
import { type Product } from "../../types/product";


interface ProductCardProps{
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  return (
    <div>
      <Card className="product-card">
        <div className="product-card-img-wrapper">
          <Card.Img
            variant="top"
            src={product.images}
            className="product-card-img"
          />
          <SoldoutTag />
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-header">
            <div className="product-card-title">{product.title}</div>
            <HeartButton></HeartButton>
          </div>

          <Card.Text className="product-card-price">{product.price}원</Card.Text>
          <Card.Text className="product-card-time">{product.createdAt}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;