//library
import type React from "react";
import { type Product } from "../../types/product";
import { useNavigate } from "react-router-dom";

//style
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import "../../styles/ProductList.css"
import { deleteProduct } from "../../sevices/productService";

interface ProductGridProps{
    products: Product[];
};

const ProductList : React.FC<ProductGridProps> = ({products}) =>{

    //상품 수정 함수
    const navigate = useNavigate(); 
    const gotoEditpage = (id: number) => {
        navigate(`/post/edit/${id}`);
    };

    //상품 삭제함수
    const handleDelete= async (id: number) => {
        const result = confirm("정말 삭제하시겠습니까?");
        if (result) {
             try {
                const deletedProduct = await deleteProduct(id)
                console.log('상품 삭제 성공: ', deletedProduct)
                alert("상품 삭제를 성공하였습니다.");
            } catch (err) {
                console.error('상품 삭제 실패:', err);
                alert("상품 삭제를 실패하였습니다.");
            }
        } 
        else {
            alert("취소되었습니다.");
        }
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
            <tr key={product.id}>
                <td>
                    <img key={product.imageUrls[0].id} src={product.imageUrls[0].url}  alt={product.title} className="product-img" />
                </td>
                <td>{product.title}</td>
                <td>{product.price}원</td>
                <td>{product.likeCount}</td>
                <td>{product.status === "IN_PROGRESS" ? "거래중" : "거래완료"}</td>
                <td>
                <button className="btn me-2" onClick={() => gotoEditpage(product.id)}>
                    <PencilSquare />
                </button>
                <button className="btn" onClick={ () => handleDelete(product.id)}>
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