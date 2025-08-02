//프로필 페이지: 닉네임, 이메일(?), 프사등 수정할 수 있는 페이지, 회원탈퇴도 여기서

import type React from "react";
import { useUserStore } from "../../stores/UserStore";
import Input from "../../components/common/Input";
import { Button,Form } from "react-bootstrap";

const SetiingPage: React.FC = () =>{
    //유저 정보 불러오기
    const { user } = useUserStore();
    //회원탈퇴 함수
    const withdraw = () =>{
            alert("회원탈퇴되었습니다")
        }

    return(
        <div className="container mb-4">
            <h3 className="text-center mt-3 mb-3"><b>설정</b></h3>
             <Form>
                <Input 
                    label="아이디"
                    name="userid"
                    value={user.nickname}
                    // onChange={handleChange}
                    error="아이디 입력 오류"
                    buttonText = "중복 확인"
                    >
                </Input>

                <Input 
                    label="비밀번호"
                    name="password"
                    type="password"
                    value={user.password}
                    // onChange={handleChange}
                    error="비밀번호 입력 오류"
                    help="*영어 알파벳과 숫자의 최소 8자리 조합"
                    >
                </Input>

                <Input 
                    label="닉네임"
                    name="username"
                    value={user.nickname}
                    // onChange={handleChange}
                    error="닉네임 입력 오류"
                    buttonText = "중복 확인"
                    >
                </Input>

                <div className="d-flex justify-content-end">
                    <Button type="submit"  variant="dark" className="mb-5">완료</Button>
                </div>
            </Form>
            <a href="" onClick={withdraw} className="text-muted">회원 탈퇴</a>

        </div>
    )
}

export default SetiingPage;