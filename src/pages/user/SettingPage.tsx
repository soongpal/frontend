//프로필 페이지: 닉네임, 이메일(?), 프사등 수정할 수 있는 페이지, 회원탈퇴도 여기서

import type React from "react";
import { useUserStore } from "../../stores/UserStore";
import GoMypage from "../../components/common/GoMypage";

const SetiingPage: React.FC = () =>{
    //유저 정보 불러오기
    const { user } = useUserStore();
    //회원탈퇴 함수
    const withdraw = () =>{
            alert("회원탈퇴되었습니다")
            //회원탈퇴로직 추가
        }

    return(
        <div className="container mb-4">
            <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <GoMypage/>
                <b>설정</b>
            </h3>
                
            <a href="" onClick={withdraw} className="text-muted">회원 탈퇴</a>

        </div>
    )
}

export default SetiingPage;