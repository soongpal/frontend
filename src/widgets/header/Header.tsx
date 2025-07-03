import type React from "react";
import { Container, Nav, Navbar, InputGroup, FormControl, Button } from "react-bootstrap";
import { Search, List } from 'react-bootstrap-icons';

const Header : React.FC = () =>{

    return(
        <div>
            <Navbar sticky="top" bg="light" data-bs-theme="light">
            <Container justify-content-between>
                <Navbar.Brand href="/"><h1>숭팔이로고</h1></Navbar.Brand>
                <Nav>
                    <Nav.Link href="/signup">회원가입</Nav.Link>
                    <Nav.Link href="/login">로그인</Nav.Link>
                    <Nav.Link href="/mypage">마이페이지</Nav.Link>
                </Nav>
            </Container>
            </Navbar>

            <Navbar sticky="top" bg="light" data-bs-theme="light">
            <Container justify-content-between>
                 <Nav className="d-flex align-items-center">
                    <List size={24} />
                    <Nav.Link href="/grouppurchase">공동구매</Nav.Link>
                    <Nav.Link href="/usedtrade">중고거래</Nav.Link>
                </Nav>

                <InputGroup className="w-50">
                    <FormControl
                        placeholder="상품명 입력"
                        aria-label="Search"
                    />
                    <Button variant="outline-secondary">
                        <Search />
                    </Button>
                </InputGroup>
            </Container>
            </Navbar>
        </div>
    );
}

export default Header;
