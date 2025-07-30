import type React from "react";
import { useState } from "react";

import type { Status } from "../../types/product";

import "../../styles/Filter.css"
import { ChevronRight} from "react-bootstrap-icons";

const Filter: React.FC = () =>{
    
    const [filter, setfilter] = useState<Status | null>(null);

    const clickSale = () => {
        setfilter('ON_SALE');
    };

    const clickSoldout = () => {
        setfilter('SOLD_OUT');
    };


    return (
        <div className="filter-container">


        {/* 거래중 버튼 */}
        <div>
            <button onClick={()=>{clickSale}} className="filter-button">
                {filter ?? (<>거래중<ChevronRight size={13} className="ms-2"/></>)}
            </button>
        </div>

        {/* 거래완료 버튼 */}
        <div>
            <button onClick={()=>{clickSoldout}} className="filter-button">
                {filter??(<>거래완료<ChevronRight size={13} className="ms-2"/></>)}
            </button>
        </div>

        </div>
    );
    }



export default Filter;