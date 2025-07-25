import type React from "react";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { PersonFill, Search } from 'react-bootstrap-icons';

const Header : React.FC = () =>{

    return(
        <div>
            <div className="navbar">
                <div className="container">
                    <Row className="w-100 align-items-center">
                        <Col className="d-flex justify-content-start">
                            <a href="/">
                                <img src="/logo/Soongpal.svg" alt="logo" width={100} />
                            </a>
                        </Col>
                        
                        <Col className="d-flex justify-content-end align-items-center">
                            <a href="/auth/login" className="d-flex align-items-center text-decoration-none text-dark">
                                <PersonFill className="me-2" />
                                로그인/회원가입
                            </a>
                        </Col>
                    </Row>
                </div>
                <div className="container">
                    <Row className="w-100 align-items-center">
                        <Col className="d-flex justify-content-start">
                            <div className="d-flex align-items-center">
                                <a href="/product/grouppurchase" className="me-3 text-decoration-none text-dark">공동구매</a>
                                <a href="/product/usedtrade" className="text-decoration-none text-dark">중고거래</a>
                            </div>
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
                </div>
            </div>

        </div>
    );
}

export default Header;
