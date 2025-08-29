//library
import type React from "react";
import { useLocation } from 'react-router-dom';
//style
import { Row, Col } from "react-bootstrap";
import { PersonCircle, PersonFill, Search } from 'react-bootstrap-icons';
import "../../../styles/Header.css";
//store
import { useAuthStore } from '../../../stores/UserStore';


const Header : React.FC = () =>{

    //로그인 여부 불러오기
    const isLogin = useAuthStore((state) => state.isLogin);

    //로그인, 회원가입 페이지에서 두번째 Row없애기
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
                            {isLogin ? (
                                //로그인일때->마이페이지
                                <a href="/user/mypage" className="d-flex  justify-content-end align-items-center text-decoration-none text-dark">
                                    <PersonCircle className="me-2"/>마이페이지
                                </a>
                                ) : (
                                //로그아웃일때->로그인/회원가입
                                <a href="/auth/login" className="d-flex  justify-content-end align-items-center text-decoration-none text-dark">
                                    <PersonFill className="me-2" />
                                    로그인/회원가입
                                </a>
                                )}
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
