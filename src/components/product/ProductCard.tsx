import { Card } from "react-bootstrap";
const ProductCard: React.FC = () =>{
    return(
    <div className="h-100">
      <Card border="0">

        <Card.Img variant="top" src="/images/products/product1.jpg" alt="상품명" className="border-0"/>
        
        <Card.Body className="d-flex flex-column justify-content-between text-start">
          <Card.Title>제목</Card.Title>
          <Card.Text className="text-muted">글</Card.Text>
          <Card.Text className="fw-bold">개당 20원</Card.Text>
          <Card.Text className="text-muted mt-auto">30분전</Card.Text>
        </Card.Body>

      </Card>
    </div>
    )
}

export default ProductCard;