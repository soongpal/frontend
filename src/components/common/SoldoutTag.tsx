import type React from "react";

const soldoutStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "10px",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: "2px",
  padding: "5px 7px",
  zIndex: 1,
  fontWeight: "600",
  fontSize: "12px"
};

const SoldoutTag: React.FC = () =>{
    return(
        <div style={soldoutStyle}>
            거래완료
        </div>
    )
}

export default SoldoutTag;