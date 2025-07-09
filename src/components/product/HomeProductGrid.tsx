import type React from "react";
import ProductCard from "./ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const HomeProducGrid : React.FC = () =>{
    return(
        <Container>
            <Row xs={2} md={3} lg={4} className = "g-1">
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
                <Col><ProductCard></ProductCard></Col>
            </Row>
        </Container>
    )
}

export default HomeProducGrid;