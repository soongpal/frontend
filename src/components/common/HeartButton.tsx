import type React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { HeartFill, Heart } from "react-bootstrap-icons";

const HeartButton: React.FC = () =>{

    const [isClicked, setIsClicked] = useState(false);

    const heartClick = () =>{
        setIsClicked(!isClicked);
    };

    return(
        <div>
            <Button onClick={heartClick} variant="link" >
                {isClicked ? <HeartFill color="red"></HeartFill> : <Heart color="grey"></Heart>}
            </Button>
        </div>
    )
}

export default HeartButton;