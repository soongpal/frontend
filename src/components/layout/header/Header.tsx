import type React from "react";
import { Row, Col } from "react-bootstrap";
import { PersonCircle, PersonFill, Search } from 'react-bootstrap-icons';
import "../../../styles/Header.css"
import { useLocation } from 'react-router-dom';

const Header : React.FC = () =>{
    //조건부 렌더링(로그인, 회원가입 페이지에서 두번째 Row사라지게 하는 용도)
    const location = useLocation();
    const hideSecondRow = ["/auth/login", "/auth/signup"].includes(location.pathname);
    
    return(
        <div className="mb-3">
            <div className="navbar">
                    <Row className="d-flex justify-content-between align-items-center my-3">
                        <Col>
                            <a href="/">
                                <img src="/logo/Soongpal.svg" alt="logo" width={50} />
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

                {!hideSecondRow && (
                    <Row className="d-flex justify-content-between align-items-center my-3">
                        <Col>
                            <div className="d-flex align-items-center">
                                <a href="/product/grouppurchase" className="me-3 text-decoration-none text-dark">공동구매</a>
                                <a href="/product/usedtrade" className="text-decoration-none text-dark">중고거래</a>
                            </div>
                        </Col>

                        <Col>
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="상품명 입력"
                                    aria-label="Search"
                                    className="search-bar"
                                />
                                <button type="button" className="search-button">
                                    <Search/>
                                </button>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>

            <div style={{height:"154px"}}></div>

        </div>
    );
}

export default Header;
