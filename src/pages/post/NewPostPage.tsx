//글쓰기 페이지

//library
import type React from "react";
import { useState } from "react";
//component
import MultiImageUploader from "../../components/post/MultiImageUploader";
import { type Category } from "../../types/product";
//api
import { createProduct } from "../../api/productAPI"
//style
import '../../styles/NewPost.css'
import Loading from "../../components/common/Loading";



const NewPostPage:React.FC = () =>{

    //로딩
    const [isLoading, setIsLoading] = useState(false);

    //전송 목록
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [category, setCategory] = useState<Category | null>(null);
    const [images, setImages] = useState<File[]>([]);

    //multy image uploader props전달용
    const handleImagesChange = (files: FileList) => {
        const newFiles = Array.from(files);
        setImages(newFiles);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // enum 타입과 string 형변환
      setCategory(e.target.value as Category);
    }

    // createProduct에 데이터 전달
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 페이지 새로고침 방지

        if (!images || images.length === 0) {
            alert('이미지를 선택해 주세요.');
            return;
        }

        if (!category) {
            alert('카테고리를 선택해 주세요.');
            return;
        }

        //board생성
        const board = {
            title: title,
            content: content,
            price: Number(price), 
            url: url,
            location: location,
            category: category,
        };

        //formData 객체 생성
        const formData = new FormData();

        //board 추가
        const boardBlob = new Blob([JSON.stringify(board)], { type: 'application/json' });
        formData.append('board', boardBlob);
        //이미지 추가
        for (const image of Array.from(images)) {
            formData.append('images', image);
        }

        //서버 전송
        try {
            setIsLoading(true);
            const newProduct = await createProduct(formData); 
            console.log('상품 등록 성공:', newProduct);
            alert('상품이 성공적으로 등록되었습니다.');
            window.location.href = "/";
        } 
        catch (err) {
            console.error('상품 등록 실패:', err);
            alert('올바르지 않은 이미지 형식입니다.');
            window.location.href = "/";
        }
        finally {
            setIsLoading(false);
        }
    };

if(isLoading){
    return(<Loading/>);
}


return(
    <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image-uploader" className="post-label">*사진</label>
                    <MultiImageUploader uploadFiles={images}
                                        setUploadFiles={setImages}
                                        onFilesChange={handleImagesChange} 
                    />
                    <p style={{ color: 'var(--soongpal-color)' }}>*JPG, JEPG, PNG 형식</p>
                </div>
                
                <div>
                    <label htmlFor="title" className="post-label">*제목</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="글 제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        className="input-continer"
                    />
                </div>
                
                <div>
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
                
                <div>
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

                <div>
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

                <div>
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
                
                <div>
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

                <div className="button-container">
                    <button type="submit" className="submit-button">
                        업로드
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPostPage;
