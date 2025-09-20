//프로필 페이지: 닉네임, 이메일(?), 프사등 수정할 수 있는 페이지, 회원탈퇴도 여기서

import type React from "react";

import GoMypage from "../../components/common/GoMypage";
import { useAuthStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mySetting, withdrawal } from "../../api/userAPI";
import type { UserInfo } from "../../types/user";

const SetiingPage: React.FC = () =>{

    const navigate = useNavigate();

    //유저 정보 불러오기
    const { user, clear, setUser  } = useAuthStore();

    // 닉네임 변경 상태
    const [isEditing, setIsEditing] = useState(false);
    const [nicknameInput, setNicknameInput] = useState(user?.nickname || "")

    //회원탈퇴 함수
    const withdraw = async() =>{
        if (!window.confirm("정말로 회원탈퇴 하시겠습니까?")) return;

        try {
            await withdrawal();
            alert("회원탈퇴가 완료되었습니다.");
            clear();
            navigate("/");
        } catch (error) {
            console.error("회원탈퇴 실패:", error);
            alert("다시 시도해주세요.");
        }
    }

    //닉네임 변경 함수mySetting
    const changeNickname = async() =>{
        
        if (!isEditing) {

            setIsEditing(true);
        return;
        }

        try {
            const res = await mySetting(nicknameInput);
            if (user) {
                const updatedUser: UserInfo = {
                    ...user, 
                    nickname: res.nickname,
                };

            setUser(updatedUser);
            alert("닉네임이 변경되었습니다.");
            setIsEditing(false); 
            }
        } catch (error) {
            console.error("닉네임 변경 실패:", error);
        }
    }

return (
  <div className="container mb-4">
    <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
      <GoMypage />
      <b>설정</b>
    </h3>

    <h4 className="mt-4 mb-3">회원정보</h4>

    <table className="table" style={{ maxWidth: '600px' }}>
      <tbody>
        {/* ID 행 */}
        <tr>
          <th style={{ width: '120px', verticalAlign: 'middle' }}>이메일</th>
          <td>{user?.email}</td>
          <td style={{ width: '80px' }}></td>
        </tr>

        {/* 닉네임 */}
        <tr>
          <th style={{ verticalAlign: 'middle' }}>닉네임</th>

          <td>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
            ) : (
              user?.nickname
            )}
          </td>
          {/* 변경/저장 버튼 */}
          <td className="text-center">
            <button onClick={changeNickname} className="btn btn-primary btn-sm">
              {isEditing ? "저장" : "변경"}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    {/* 회원 탈퇴*/}
    <p onClick={withdraw} className="text-muted mt-4" style={{ cursor: "pointer" }}>
      회원 탈퇴
    </p>
  </div>
);
};

export default SetiingPage;