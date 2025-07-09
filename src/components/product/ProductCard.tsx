import { Card } from "react-bootstrap";
import { HeartFill } from 'react-bootstrap-icons';

import product2 from '../../assets/images/products/product2.jpg';
import SoldoutTag from "../common/SoldoutTag";

const ProductCard: React.FC = () =>{
    return(
    <div className="h-100">
      <Card border="0" className="p-2">
        <div className="position-relative">
          <Card.Img variant="top" src= {product2} alt="상품명" className="rounded-1"/>
          <SoldoutTag></SoldoutTag>
        </div>
        <Card.Body className="d-flex flex-column justify-content-between text-start">
          <div className="d-flex justify-content-between">
            <Card.Title>제목</Card.Title>
            <HeartFill color="red" ></HeartFill>
          </div>
          <Card.Text className="fw-bold">개당 20원</Card.Text>
          <Card.Text className="text-muted mt-auto">30분전</Card.Text>
        </Card.Body>
      </Card>
    </div>
    )
}

export default ProductCard;