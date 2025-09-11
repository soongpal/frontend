//제품 상세보기 페이지(제품 클릭시 나오는 페이지)

//library
import type React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//style
import { ChevronRight, Heart, HeartFill, Share, ChatDots } from "react-bootstrap-icons";
import "../../styles/ProductDetailPage.css"
//store
import  useProductStore from "../../stores/productStore";
//api
import { getProductDetail } from "../../api/productAPI"
//util
import { timeAgo } from "../../utils/time";
//type
import type { Product } from "../../types/product";
import { useAuthStore } from "../../stores/UserStore";
import Loading from "../../components/common/Loading";
import { createChatRoom, joinChatRoom } from "../../api/chatAPI";

const ProductDetailPage: React.FC = () => {

    //로그인 여부 확인
    const navigate = useNavigate();
    const isLogin = useAuthStore((state) => state.isLogin);
    
    // 상품 id값 받아오기
    const { ProductId } = useParams<{ ProductId: string }>();
    const productId = Number(ProductId);

    //상품 좋아요 store함수
    const likeProduct = useProductStore(state => state.likeProduct);
    const unLikeProduct = useProductStore(state => state.unLikeProduct);

    // 상품 id로 상품 불러오기
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!isNaN(productId)) {
            getProductDetail(productId)
                .then(setProduct)
                .catch(err => console.error("상품 불러오기 실패:", err));
        }
    }, [productId]);

    // 로딩 중
    if (!product) {
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <Loading></Loading>
            </div>
        );
    }

    //좋아요 버튼 함수
    const handleHeartClick = () =>{

        if (!product) return;
        if(isLogin){
            if(product.liked===true){
                unLikeProduct(product.id);
                }
            else{
                likeProduct(product.id);
                }

            setProduct(prevProduct => {
                if (!prevProduct) return null;
                return {
                    ...prevProduct,
                    liked: !prevProduct.liked 
                };
            });
        }

        else{
            alert("로그인 후 이용 가능합니다");
            navigate('/auth/login');
      }
      };

    //대화하기 버튼 함수
    const handleChatClick = async () =>{

        //로그인 안된경우
        if (!isLogin) {
            alert("로그인 후 이용 가능합니다");
            navigate('/auth/login');
            return;
        }

        //로그인 한 경우
        try {
        // 1. 참가 시도
            const joinRes = await joinChatRoom(product.id); 
            // 참가 성공
            navigate(`/chatroom/${joinRes.roomId}`);
        } catch (err: any) {
            const status = err.response?.status;
            const serverMessage = err.response?.data || "알 수 없는 오류가 발생했습니다.";

            if (status === 404) {
                // 2. 404: 채팅방 없음 → 생성 후 참가
                try {
                const newRoom = await createChatRoom({ boardId: product.id });
                await joinChatRoom(newRoom.id);
                navigate(`/chatroom/${newRoom.id}`);
                } catch (createErr: any) {
                console.error("채팅방 생성/참가 실패:", createErr.response?.data || createErr);
                alert(createErr.response?.data || "채팅방을 생성할 수 없습니다.");
                }
            } else if (status === 409) {
                // 3. 이미 존재 → 그냥 참가
                try {
                const joinRes = await joinChatRoom(product.id);
                navigate(`/chatroom/${joinRes.roomId}`);
                } catch (joinErr: any) {
                console.error("채팅방 참가 실패:", joinErr.response?.data || joinErr);
                alert(joinErr.response?.data || "채팅방에 참가할 수 없습니다.");
                }
            } else {
                // 그 외
                console.error("채팅방 참가 실패:", serverMessage, err);
                alert(serverMessage);
            }
            }
    }

    // 로딩 성공
    return (
        <div className="container d-flex flex-column justify-content-center">
            {/* 이미지영역 */}
            <div className="d-flex justify-content-center">
                <img  key={product.images[0].id} src={product.images[0].imageUrl} alt={product.title} className="thumbnail-img"/>
            </div>

            <div className="d-flex justify-content-between align-items-center my-3">
                <p className="gray-row">{product.category === 'GROUP' ? '공동구매' : '중고거래'}<ChevronRight size={13} className="ms-2"/></p>
                <div className="d-flex align-items-center">
                    <button>
                        <Share color="gray" size={13}/>
                    </button>
                </div>
            </div>

            {/* 제목 */}
            <h1 className="mt-3 mb-0">{product.title}</h1>

            {/* 날짜 */}
            <p className="gray-row mb-3">{timeAgo(product)}</p>

            {/* 설명란 */}
            <p className="my-3">{product.content}</p>

            {/* 버튼들 */}
            <div className="d-flex justify-content-between my-3">
                <h1>{product.price}원</h1>
                <div className="d-flex">
                    <button 
                        className="round-button justify-content-center" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleHeartClick();
                            }
                        }
                    >
                        {product.liked ? <HeartFill color="red"></HeartFill> : <Heart color="gray"></Heart>}
                    </button>
                    <button className="round-button" onClick={handleChatClick}>
                        <ChatDots className="me-2"/>대화하기
                    </button>
                </div>
            </div>

            {/* 부가 설명 */}
            <div className="table-container">
                <table>
                    <tbody>
                        <tr>
                            <th>상품 링크</th>
                            <td><a href={product.url} target="_blank" className="product-link">{product.url}</a></td>
                        </tr>
                        <tr>
                            <th>희망 거래 장소</th>
                            <td>{product.location}</td>
                        </tr>
                        <tr>
                            <th>판매자</th>
                            <td>{product.authorNickname}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetailPage;