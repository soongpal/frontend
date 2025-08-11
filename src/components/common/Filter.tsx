//거래 상태 필터
import "../../styles/Filter.css"
import { ChevronRight, X} from "react-bootstrap-icons";
import { useState } from "react";import useProductStore from "../../stores/ProductStore";
''

function Filter(){
    //선택여부
    const [selected, setSelected] = useState<boolean>(false);
    //선택한 버튼
    const[option, setOption] = useState<string | null>();

    const {setFilter} = useProductStore();
    

    return (
        <div className="filter-container">
        {/* 선택 안했을떄     */}
        {!selected && (
        <>
            <div>
                <button 
                    onClick={()=> {
                        setFilter({status: 'IN_PROGRESS'})
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
                        setFilter({status: 'COMPLETED'})
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
                        setFilter({status: undefined})
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