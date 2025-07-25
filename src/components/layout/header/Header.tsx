import type React from "react";
import { Container, Nav, Navbar, InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';

const Header : React.FC = () =>{

    return(
        <div className="mb-5">
            <Navbar fixed="top" bg="white" data-bs-theme="light" className="flex-column">
                <Container>
                    <Row className="w-100 align-items-center">
                        <Col className="d-flex justify-content-start">
                            <Navbar.Brand href="/"><h1>숭팔이로고</h1></Navbar.Brand>
                        </Col>
                        
                        <Col className="d-flex justify-content-end">
                            <Nav>
                                <Nav.Link href="/auth/login">로그인/회원가입</Nav.Link>
                                <Nav.Link href="/user/mypage">마이페이지</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="w-100 align-items-center">
                        <Col className="d-flex justify-content-start">
                            <Nav className="d-flex align-items-center">
                                <Nav.Link href="/product/grouppurchase">공동구매</Nav.Link>
                                <Nav.Link href="/product/usedtrade">중고거래</Nav.Link>
                            </Nav>
                        </Col>

                        <Col className="d-flex justify-content-end">
                            <InputGroup className="w-50">
                                <FormControl
                                    placeholder="상품명 입력"
                                    aria-label="Search"
                                    className="border-0 shadow-none"
                                    style={{ backgroundColor: 'white' }}
                                />
                                <Button 
                                variant="outline-secondary"
                                className="border-0"
                                style={{ backgroundColor: 'white' }}
                                >
                                    <Search />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
            
            <div style={{ height: '122px' }}></div>

        </div>
    );
}

export default Header;
