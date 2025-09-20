//내가쓴글 수정 페이지
//library
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//type
import type { Category, Status } from "../../types/product";
//component
import MultiImageUploader from "../../components/post/MultiImageUploader";
//api
import { eidtProduct, getProductDetail } from "../../api/productAPI";
//style
import "../../styles/NewPost.css"


const EditPostPage: React.FC = () => {
    
    const navigate = useNavigate();
    //id가져오기
    const { PostId } = useParams<{ PostId: string }>();
    const postId = Number(PostId);

    //입력 항목
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [category, setCategory] = useState<Category | null>(null);
    const [status, setStatus] = useState<string>("IN_PROGRESS");

    //이미지 입력항목(기존 이미지, 삭제 이미지, 추가 이미지)
    const [existingImages, setExistingImages] = useState<{id:number,imageUrl:string}[]>([]);
    const [deleteImages, serDeleteImages] = useState<number[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    
    //상품 불러오기
    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getProductDetail(postId);

            // 기존 값 세팅
            setTitle(data.title);
            setContent(data.content);
            setPrice(data.price);
            setUrl(data.url);
            setLocation(data.location);
            setCategory(data.category);
            setExistingImages(data.images || []);
        } catch (err) {
            console.error("상품 불러오기 실패:", err);
        }
        };
        fetchData();
    }, [postId]);

    //새로운 이미지 추가시 함수
    const handleImagesChange = (files: FileList) => {
        const newFiles = Array.from(files);
        setNewImages(newFiles);
    };

    //카테고리 변경시
    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value as Category);
    };

     //상태 변경시
    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as Status);
    };

     // 기존 이미지 삭제 처리
    const handleDeleteExistingImage = (id: number) => {
        setExistingImages((prev) => prev.filter((img) => img.id !== id));
        serDeleteImages((prev) => [...prev, id]);
    };

    //수정값 제출
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        //새로고침 방지
        e.preventDefault();

        if (!category) {
        alert("카테고리를 선택해주세요.");
        return;
        }


        try {
            await eidtProduct(postId, {
                title, content, price, url, location, category: category!, status,
                newImages, deleteImageIds: deleteImages
            });
            alert("수정 완료");
-
            navigate(`/user/mypost`);
        } catch(err) {
            console.error(err);
            alert("수정 실패");
        }
    };

    return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            {/* 기존 이미지 */}
            <div className="form-group">
                <label className="post-label">기존 이미지</label>
                <div>
                    {existingImages.map((img) => (
                        <div key={img.id} className="d-inline-block position-relative m-1">
                            <img src={img.imageUrl} alt="기존 이미지" width={100} height={100} style={{ objectFit: 'cover' }} />
                            {/* 삭제 버튼에 Bootstrap 클래스 적용 */}
                            <button
                                type="button"
                                className="btn-close bg-white position-absolute top-0 end-0 m-1"
                                aria-label="Close"
                                onClick={() => handleDeleteExistingImage(img.id)}
                            ></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 새 이미지 업로드 */}
            <div className="form-group">
                <label htmlFor="image-uploader" className="post-label">새로운 이미지 추가</label>
                <MultiImageUploader 
                    uploadFiles={newImages}
                    setUploadFiles={setNewImages}
                    onFilesChange={handleImagesChange}
                />
                <p style={{ color: 'var(--soongpal-color)' }}>*JPG, JEPG, PNG 형식</p>
            </div>
            
            {/* 제목 */}
            <div className="form-group">
                <label htmlFor="title" className="post-label">*제목</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="글 제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input-continer"
                />
            </div>
            
            {/* 설명 */}
            <div className="form-group">
                <label htmlFor="content" className="post-label">*설명</label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="상태, 용량, 크기 등 자세히 적어주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="input-content"
                />
            </div>
            
            {/* 가격 */}
            <div className="form-group">
                <label htmlFor="price" className="post-label">*가격</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    placeholder="가격을 적어주세요"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="input-continer"
                />
            </div>

            {/* 상태 */}
            <div className="form-group">
                <label className="post-label">*상태</label>
                <div className="category-group">
                    <label className="post-label">
                        <input
                            type="radio"
                            name="status"
                            value="IN_PROGRESS"
                            checked={status === "IN_PROGRESS"}
                            onChange={handleStatusChange}
                        />{' '}
                        거래중
                    </label>
                    <label className="post-label">
                        <input
                            type="radio"
                            name="status"
                            value="COMPLETED"
                            checked={status === "COMPLETED"}
                            onChange={handleStatusChange}
                        />{' '}
                        거래완료
                    </label>
                </div>
            </div>

            {/* 카테고리 */}
            <div className="form-group">
                <label className="post-label">*카테고리</label>
                <div className="category-group">
                    <label className="post-label">
                        <input
                            type="radio"
                            name="category"
                            value="GROUP"
                            checked={category === "GROUP"}
                            onChange={handleCategoryChange}
                        />{' '}
                        공동구매
                    </label>
                    <label className="post-label">
                        <input
                            type="radio"
                            name="category"
                            value="USED"
                            checked={category === "USED"}
                            onChange={handleCategoryChange}
                        />{' '}
                        중고거래
                    </label>
                </div>
            </div>

            {/* URL */}
            <div className="form-group">
                <label htmlFor="url" className="post-label">URL</label>
                <input
                    id="url"
                    type="text"
                    name="url"
                    placeholder="관련 링크가 있다면 첨부해주세요"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input-continer"
                />
            </div>
            
            {/* 거래 장소 */}
            <div className="form-group">
                <label htmlFor="location" className="post-label">*거래 장소</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="희망 거래 장소를 입력해주세요"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="input-continer"
                />
            </div>

            {/* 수정 완료 버튼 */}
            <div className="button-container">
                <button type="submit" className="submit-button">
                    수정완료
                </button>
            </div>
        </form>
    </div>
);
};

export default EditPostPage;