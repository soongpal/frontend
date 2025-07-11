import { Card } from "react-bootstrap";
import { HeartFill } from 'react-bootstrap-icons';
import product2 from '../../assets/images/products/product2.jpg';
import SoldoutTag from "../common/SoldoutTag";
import "../../styles/ProductCard.css";

const ProductCard: React.FC = () => {
  return (
    <div>
      <Card className="product-card">
        <div className="product-card-img-wrapper">
          <Card.Img
            variant="top"
            src={product2}
            className="product-card-img"
          />
          <SoldoutTag />
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-header">
            <Card.Title>제목</Card.Title>
            <HeartFill color="red" />
          </div>

          <Card.Text className="product-card-price">개당 20원</Card.Text>
          <Card.Text className="product-card-time">30분전</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;