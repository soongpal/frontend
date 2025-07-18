import type React from "react";
import { Button, Container } from "react-bootstrap";



const Filter: React.FC = () =>{
    return(
        <div className="justify-content-start d-flex gap-2 mb-3">
            <Button variant="outline-secondary " className="rounded-pill">
                전체보기
            </Button>
            <Button variant="outline-secondary" className="rounded-pill">
                거래가능
            </Button>
            <Button variant="outline-secondary" className="rounded-pill">
                거래완료
            </Button>
        </div>
    )
}

export default Filter;