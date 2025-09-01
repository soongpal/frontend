import type React from "react";
import { useNavigate } from "react-router-dom";
//style
import { Button } from "react-bootstrap";
import '../../styles/FloatingButton.css'
import { PencilFill } from "react-bootstrap-icons";
//store
import { useAuthStore } from "../../stores/UserStore";

const FloatingButton: React.FC = ()=>{

    const navigate = useNavigate();
    const isLogin = useAuthStore((state) => state.isLogin);

    const floatingBtnClick = () =>{
      if(isLogin){
        navigate('post/newpost');
      }
      else{
        alert("로그인 후 이용 가능합니다");
        navigate('/auth/login');
      }
    }

    return(
      <div className="floating-button-container">
        <Button
          className="rounded-circle"
          onClick={floatingBtnClick}
        >
          <PencilFill size={35}></PencilFill>
        </Button>
    </div>
    )
}

export default FloatingButton;