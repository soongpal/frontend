import type React from "react";
import { Button } from "react-bootstrap";
import '../../styles/FloatingButton.css'
import { useNavigate } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";

const FloatingButton: React.FC = ()=>{
    const navigate = useNavigate();

    const floatingBtnClick = () =>{
         navigate('post/newpost');
    }

    return(
       <div className="floating-button-container">
      <Button
        variant="dark"
        className="rounded-circle"
        onClick={floatingBtnClick}
      >
        <PlusLg ></PlusLg>
      </Button>
    </div>
    )
}

export default FloatingButton;