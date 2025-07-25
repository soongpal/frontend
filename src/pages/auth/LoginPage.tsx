import type React from "react";
import Input from "../../components/common/Input";
import { Button, Form } from "react-bootstrap";

//로그인 페이지
const LoginPage: React.FC = () =>{
    return(
        <div className="container">
            <Form>
                <Input 
                    label="아이디"
                    name="username"
                    // value={form.username}
                    // onChange={handleChange}
                    error="아이디 입력 오류"
                    >
                </Input>

                <Input 
                    label="비밀번호"
                    name="password"
                    type="password"
                    // value={form.password}
                    // onChange={handleChange}
                    error="비밀번호 입력 오류"
                    >
                </Input>
                <div className="d-flex justify-content-end">
                    <Button type="submit"  variant="dark" className="mb-5">로그인</Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginPage;