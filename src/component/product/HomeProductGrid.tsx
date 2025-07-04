import type React from "react";
import ProductCard from "./ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const HomeProducGrid : React.FC = () =>{
    return(
        <Container>
            <Row xs={1} md={2} lg={3} className = "g-5">
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