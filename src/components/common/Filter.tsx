import "../../styles/Filter.css"
import { ChevronRight, X} from "react-bootstrap-icons";
import type { Status } from "../../types/product";
import { useState } from "react";

type FilterProps = {
  onFilterSelect: (filter: Status | null) => void;
};

function Filter({onFilterSelect}: FilterProps){
    //선택여부
    const [selected, setSelected] = useState<boolean>(false);
    //선택한 버튼
    const[option, setOption] = useState<string | null>();
    

    return (
        <div className="filter-container">
        {/* 선택 안했을떄     */}
        {!selected && (
        <>
            <div>
                <button 
                    onClick={()=> {
                        onFilterSelect('ON_SALE');
                        setSelected(true);
                        setOption('거래중');
                    }} 
                    className="filter-button">
                <>거래중<ChevronRight size={13} className="ms-2"/></>
                </button>
            </div>

            
            <div>
                <button 
                    onClick={()=>{
                        onFilterSelect('SOLD_OUT');
                        setSelected(true);
                        setOption('거래완료');
                    }} 
                    className="filter-button">
                    <>거래완료<ChevronRight size={13} className="ms-2"/></>
                </button>
            </div>
        </>
        )}

        {selected&&(
            <div>
                <button 
                    onClick={()=>{
                        onFilterSelect(null);
                        setSelected(false);
                    }} 
                    className="filter-selected">
                    <>{option}<X size={18} className="ms-2"/></>
                </button>
            </div>
        )}

        </div>
    );
    }



export default Filter;