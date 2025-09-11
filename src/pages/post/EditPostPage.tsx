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
        const updated = await eidtProduct(postId, {
            title, content, price, url, location, category: category!, status,
            newImages, deleteImageIds: deleteImages
        });
        alert("수정 완료");
        //수정완료 후 상세페이지로 이동
        navigate(`/productdetail/${updated.id}`);
        } catch(err) {
        console.error(err);
        alert("수정 실패");
        }
    };

    return (
         <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>기존 이미지</label>
                    <div>
                        {existingImages.map((img) => (
                        <div key={img.id}>
                            <img src={img.imageUrl} alt="기존 이미지" width={100} />
                            <button type="button" onClick={() => handleDeleteExistingImage(img.id)}>
                            X
                            </button>
                        </div>
                        ))}
                    </div>
                </div>

        {/* 새 이미지 업로드 */}
        <div>
            <label htmlFor="image-uploader">새로운 이미지 추가</label>
            <MultiImageUploader uploadFiles={newImages}
                                setUploadFiles={setNewImages}
                                onFilesChange={handleImagesChange} 
            />
            <p style={{ color: 'var(--soongpal-color)' }}>*JPG, JEPG, PNG 형식</p>
        </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title">제목</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="글 제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="content">설명</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="상태, 용량, 크기 등 자세히 적어주세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="price">가격</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="가격을 적어주세요"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>상태</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="IN_PROGRESS"
                                checked={status === "IN_PROGRESS"}
                                onChange={handleStatusChange}
                            />{' '}
                            거래중
                        </label>
                        <label>
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

                <div style={{ marginBottom: '1rem' }}>
                    <label>카테고리</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="GROUP"
                                checked={category === "GROUP"}
                                onChange={handleCategoryChange}
                            />{' '}
                            공동구매
                        </label>
                        <label>
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

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="url">URL</label>
                    <input
                        id="url"
                        type="text"
                        name="url"
                        placeholder="관련 링크가 있다면 첨부해주세요"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="location">거래 장소</label>
                    <input
                        id="location"
                        type="text"
                        name="location"
                        placeholder="희망 거래 장소를 입력해주세요"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#343a40', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        수정완료
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPostPage;