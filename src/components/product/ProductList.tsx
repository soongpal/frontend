//library
import React, { useState } from "react"; // ✨ useState import 추가
import { type Product, type Status } from "../../types/product"; // ✨ Status 타입 import 추가
import { useNavigate } from "react-router-dom";

//style
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import "../../styles/ProductList.css"
//api
import { deleteProduct } from "../../api/productAPI"; 
import { patchStatus } from "../../api/userAPI";


interface ProductGridProps{
    products: Product[];
};

const ProductList : React.FC<ProductGridProps> = ({products}) =>{
    const navigate = useNavigate(); 
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    //수정하기
    const gotoEditpage = (id: number) => {
        navigate(`/post/edit/${id}`);
    };

    //삭제하기
    const handleDelete = async (id: number) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteProduct(id)
                alert('상품이 삭제되었습니다.');
                window.location.reload(); // 삭제 후 페이지 새로고침
            } catch (err) {
                console.error('상품 삭제 실패:', err);
                alert('상품 삭제에 실패했습니다.');
            }
        } 
    }

    //상품 상태 변경 함수
    const handleStatusChange = async(id: number, status: Status) => {
        try {
           await patchStatus({ id, status }); 
            setOpenDropdownId(null); 
            window.location.reload();
        } catch(err) {
            console.error('상태 변경 실패:', err);
            alert('상태 변경에 실패했습니다.');
        }
    }

    //제품 상세 페이지로 이동 함수
    const gotoDatailPage = (id: number) =>{
        navigate(`/product/productdetail/${id}`);
    }

    return(
    <table className="table align-items-center justify-content-center">
        <thead>
            <tr>
                <th>사진</th>
                <th>제목</th>
                <th>가격</th>
                <th>관심수</th>
                <th>상태</th>
                <th>기능</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
            <tr key={product.id} onClick={()=>{gotoDatailPage(product.id)}}>
                <td>
                    <img key={product.images?.[0]?.id ?? product.id} src={product.images?.[0]?.imageUrl ?? "/images/empty.png"}  alt={product.title} className="product-img" />
                </td>
                <td>{product.title}</td>
                <td>{product.price}원</td>
                <td>{product.likeCount}</td>
                
                <td>
                    <div className="dropdown">
                        <button 
                            className="btn btn-light dropdown-toggle" 
                            type="button" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(openDropdownId === product.id ? null : product.id)}
                            }
                        >
                            {product.status === "IN_PROGRESS" ? "거래중" : "거래완료"}
                        </button>
                        
                       
                        {openDropdownId === product.id && (
                            <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 10 }}>
                                <button 
                                    className="dropdown-item" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleStatusChange(product.id, 'IN_PROGRESS');
                                    }}
                                >
                                    거래중
                                </button>
                                <button 
                                    className="dropdown-item" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(product.id, 'COMPLETED');
                                    }}
                                >
                                    거래완료
                                </button>
                            </div>
                        )}
                    </div>
                </td>

                <td>
                    {/* 수정 버튼 */}
                    <button className="btn me-2"  
                            onClick={(e) => {
                                e.stopPropagation(); 
                                gotoEditpage(product.id);
                            }}>
                        <PencilSquare />
                    </button>
                    {/* 삭제버튼 */}
                    <button className="btn" 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(product.id);
                            }}>
                        <Trash3 />
                    </button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    )
}

export default ProductList;