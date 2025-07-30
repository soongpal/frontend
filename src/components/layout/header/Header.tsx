import type React from "react";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { PersonCircle, PersonFill, Search } from 'react-bootstrap-icons';
import "../../../styles/Header.css"

const Header : React.FC = () =>{

    return(
        <div className="mb-5">
            <div className="navbar">
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col>
                            <a href="/">
                                <img src="/logo/Soongpal.svg" alt="logo" width={100} />
                            </a>
                        </Col>
                    
                        <Col>
                            <a href="/auth/login" className="d-flex  justify-content-end align-items-center text-decoration-none text-dark">
                                <PersonFill className="me-2" />
                                로그인/회원가입
                            </a>
                            <a href="/user/mypage" className="d-flex  justify-content-end align-items-center text-decoration-none text-dark">
                                <PersonCircle className="me-2"/>마이페이지 확인용
                            </a>
                        </Col>
                    </Row>
           
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col>
                            <div className="d-flex align-items-center">
                                <a href="/product/grouppurchase" className="me-3 text-decoration-none text-dark">공동구매</a>
                                <a href="/product/usedtrade" className="text-decoration-none text-dark">중고거래</a>
                            </div>
                        </Col>

                        <Col>
                            <InputGroup>
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

            <div style={{height:"152px"}}></div>

        </div>
    );
}

export default Header;
