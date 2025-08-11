import "../../styles/ProductCard.css";
import { Card } from "react-bootstrap";
import SoldoutTag from "../common/SoldoutTag";
import { type Product } from "../../types/product";
import { useProductStore } from '../../stores/ProductStore';  
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/time";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ( { product }: ProductCardProps)=>{

  //상품 업데이트 함수
  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleHeartClick = () => {
    updateProduct(product.id, { liked: !product.liked });
  };

  //상품 상세페이지 함수
  const navigate = useNavigate();
    
  const gotoDetailpage = () => {
    navigate(`/product/productdetail/${product.id}`);
  };
    
  return (
    <div onClick={gotoDetailpage}>
      <Card className="product-card">
        <div className="product-card-img-wrapper">
          <Card.Img
            variant="top"
            src={product.images[0]}
            className="product-card-img"
          />
          {product.status==='COMPLETED'&&<SoldoutTag />}
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-header">
            <div className="product-card-title">{product.title}</div>
              <button onClick={handleHeartClick}>
                  {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="grey"></Heart>}
              </button>
          </div>

          <Card.Text className="product-card-price">{product.price}원</Card.Text>
          <Card.Text className="product-card-time">{timeAgo(product)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;