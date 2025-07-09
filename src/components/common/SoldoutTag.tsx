import type React from "react";

const soldoutStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "10px",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: "5px",
  padding: "5px 10px",
  zIndex: 1
};

const SoldoutTag: React.FC = () =>{
    return(
        <div style={soldoutStyle}>
            거래 완료
        </div>
    )
}

export default SoldoutTag;