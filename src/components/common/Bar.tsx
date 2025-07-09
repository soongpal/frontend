import type React from "react";

const Bar: React.FC = () =>{
    const barStyle ={
        width: "100px",
        height: "4px",
        borderRadius: "2px",
        backgroundColor: "#008EAA",
    }

    return(
        <div style={barStyle}></div>
    )
}

export default Bar;