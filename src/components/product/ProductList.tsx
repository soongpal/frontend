import type React from "react";
import { type Product } from "../../types/product";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import "../../styles/ProductList.css"

interface ProductGridProps{
    products: Product[];
};

const ProductList : React.FC<ProductGridProps> = ({products}) =>{
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
                    <img src={product.images[0]} alt={product.title} className="product-img" />
                </td>
                <td>{product.title}</td>
                <td>{product.price}원</td>
                <td>{product.likeCount}</td>
                <td>{product.status === "IN_PROGRESS" ? "거래중" : "거래완료"}</td>
                <td>
                <button className="btn me-2">
                    <PencilSquare />
                </button>
                <button className="btn">
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