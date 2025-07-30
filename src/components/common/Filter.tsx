import "../../styles/Filter.css"
import { ChevronRight} from "react-bootstrap-icons";
import type { Status } from "../../types/product";

type FilterProps = {
  onFilterSelect: (filter: Status) => void;
};

function Filter({onFilterSelect}: FilterProps){

    return (
        <div className="filter-container">


        {/* 거래중 버튼 */}
        <div>
            <button onClick={()=> onFilterSelect('ON_SALE')} className="filter-button">
               <>거래중<ChevronRight size={13} className="ms-2"/></>
            </button>
        </div>

        {/* 거래완료 버튼 */}
        <div>
            <button onClick={()=>onFilterSelect('SOLD_OUT')} className="filter-button">
                <>거래완료<ChevronRight size={13} className="ms-2"/></>
            </button>
        </div>

        </div>
    );
    }



export default Filter;