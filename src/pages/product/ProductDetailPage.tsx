//제품 상세보기 페이지(제품 클릭시 나오는 페이지)

//library
import type React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//style
import { ChevronRight, Heart, HeartFill, ChatDots } from "react-bootstrap-icons";
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
import type { ChatRoom } from "../../types/chat";

const ProductDetailPage: React.FC = () => {

    //로그인 여부 확인
    const navigate = useNavigate();
    const isLogin = useAuthStore((state) => state.isLogin);
    const { user } = useAuthStore();
    const [isIyPost, setIsMyPost] = useState<boolean>(false);

    
    // 상품 id값 받아오기
    const { ProductId } = useParams<{ ProductId: string }>();
    const productId = Number(ProductId);

    //상품 좋아요 store함수
    const likeProduct = useProductStore(state => state.likeProduct);
    const unLikeProduct = useProductStore(state => state.unLikeProduct);

    // 상품 id로 상품 불러오기
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
        setIsMyPost(false);
        
        if (!isNaN(productId)) {
            try {
                const productData = await getProductDetail(productId);
                setProduct(productData);

               //내글인지 확인
                if (user?.nickname === productData.authorNickname) {
                    setIsMyPost(true);
                }
            } catch (err) {
                console.error("상품 불러오기 실패:", err);
            }
        }
    };

    fetchProduct();
    }, [productId]);


    // 로딩 중
    if (!product) {
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <Loading></Loading>
            </div>
        );
    }
    
    //내글인지 확인
    const handleMyPost=()=>{
        navigate("/user/mypost");
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

    // 대화하기 버튼 함수
    const handleChatClick = async () => {
    // 로그인 안된 경우
        if (!isLogin) {
            alert("로그인 후 이용 가능합니다");
            navigate("/auth/login");
            return;
        }

    // 로그인 한 경우
    // 1. 중고거래 -> 일대일채팅 -> 생성할 때 알아서 조인
        if(product.category ==="USED"){
            try{
                const newRoom:ChatRoom = await createChatRoom(product.id);
                navigate(`/chat/${newRoom.id}`);
            }
            catch(error){
                console.error("채팅방 생성 실패");
            }
        
        };


    // 2. 공동구매 -> 다중접속채팅 -> 채팅방은 글 생성될 때 생성 -> 조인해줘야 함!
        
        if(product.category ==="GROUP"){
            try{
                const res = await joinChatRoom(product.id);
                navigate(`/chat/chatroom/${res.id}`);
                console.log(res);
            }
            catch(error: any){
                //이미 참여한 채팅방인경우
                if (error.response.status===409){
                    console.log("참여한 채팅방입니다")
                    navigate(`/chat`);
                }
                else {
                    console.log("채팅방 참여 실패:", error.message);
                }

            }
        }

    return;
    };

    //카테고리 클릭시
    const handleCategoryClick = ()=>{
        if(product.category==="GROUP"){
            navigate('/product/grouppurchase');
        }
        else
            navigate('/product/usedtrade');
    }

    // 로딩 성공
    return (
        <div className="container d-flex flex-column justify-content-center">
            {/* 이미지영역 */}
            <div className="d-flex justify-content-center">
                <img  key={product.images?.[0]?.id ?? product.id} src={product.images?.[0]?.imageUrl ?? "/images/empty.png"} alt={product.title} className="thumbnail-img"/>
            </div>

            <div className="d-flex justify-content-start align-items-center my-3">
                <p className="gray-row" onClick={handleCategoryClick}>{product.category === 'GROUP' ? '공동구매' : '중고거래'}<ChevronRight size={13} className="ms-2"/></p>
            </div>

            {/* 제목 */}
            <h1 className="mt-3 mb-0">{product.title}</h1>

            {/* 날짜 */}
            <p className="gray-row mb-3">{timeAgo(product.createdAt)}</p>

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
                    {isIyPost?
                    <button className="round-button" onClick={handleChatClick}>
                        <ChatDots className="me-2"/>대화하기
                    </button>:
                    <button className="round-button" onClick={handleMyPost}>
                        <ChatDots className="me-2"/>관리하기
                    </button>
                    }
                    
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