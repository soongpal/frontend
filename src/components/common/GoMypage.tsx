import type React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import "../../styles/GoMypage.css";

const GoMypage:React.FC = () =>{

    //이전페이지
    const navigate = useNavigate();
    
    const gotoMypage = () => {
        navigate('/user/mypage');
    };
    
    return(
        <ChevronLeft size={20} className="goto-button" onClick={gotoMypage}/>
    )


}

export default GoMypage