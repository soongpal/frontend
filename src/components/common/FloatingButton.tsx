import type React from "react";
import { Button } from "react-bootstrap";
import '../../styles/FloatingButton.css'
import { useNavigate } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";

const FloatingButton: React.FC = ()=>{
    const navigate = useNavigate();

    const floatingBtnClick = () =>{
         navigate('post/newpost');
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