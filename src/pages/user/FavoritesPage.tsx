//좋아요 목록 페이지

import type React from "react";
import Filter from "../../components/common/Filter";

const  FavoritesPage: React.FC = () =>{
    return(
        <div>
            <h3 className="text-center mt-3 mb-3"><b>관심 목록</b></h3>
            <Filter></Filter>
            

        </div>
    )
}

export default FavoritesPage;