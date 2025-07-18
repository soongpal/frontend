import type React from "react";
import ProductCard from "./ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import { type Product } from "../../types/product";

interface ProductGridProps{
    products: Product[];
};

const ProductGrid : React.FC<ProductGridProps> = ({products}) =>{
    return(
        <div>
            <Row xs={2} md={3} lg={4} className = "g-1">
                 {products.map((product) => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                    ))}
            </Row>
        </div>
    )
}

export default ProductGrid;