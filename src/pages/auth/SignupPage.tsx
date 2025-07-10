//회원가입 페이지
import type React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../components/common/Input";

const SignupPage: React.FC = () =>{
    return(
        <Container>
            <Form>
                <Input 
                    label="아이디"
                    name="username"
                    // value={form.username}
                    // onChange={handleChange}
                    error="아이디 입력 오류"
                    buttonText = "중복 확인"
                    >
                </Input>

                <Input 
                    label="비밀번호"
                    name="password"
                    type="password"
                    // value={form.password}
                    // onChange={handleChange}
                    error="비밀번호 입력 오류"
                    help="*영어 알파벳과 숫자의 최소 8자리 조합"
                    >
                </Input>

                <div className="d-flex justify-content-end">
                    <Button type="submit"  variant="dark" className="mb-5">회원가입</Button>
                </div>
            </Form>
        </Container>
    )
}

export default SignupPage;