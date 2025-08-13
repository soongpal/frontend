//글쓰기 페이지
//제목, 글 내용, 가격, 거래 장소, 카테고리, url

import type React from "react";
import { useNavigate } from "react-router-dom";
import MultiImageUploader from "../../components/post/MultiImageUploader";
import { useState } from "react";
import { type Category } from "../../types/product";
import { createProduct } from "../../sevices/productService"



const NewPostPage:React.FC = () =>{

    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [category, setCategory] = useState<Category | null>(null);
    const [images, setImages] = useState<FileList | null>(null);

    //multy image uploader props전달용
    const handleImagesChange = (files: FileList | null) => {
        setImages(files); 
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

        //formData 객체를 생성
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('price', String(price)); // 숫자를 문자열로 변환
        formData.append('url', url);
        formData.append('location', location);
        formData.append('category', category); 
        
        for (const image of Array.from(images)) {
            formData.append('images', image);
        }

        //서버 전송
        try {
            const newProduct = await createProduct(formData); 
            console.log('상품 등록 성공:', newProduct);
            alert('상품이 성공적으로 등록되었습니다.');
            navigate(`/postdetail/${newProduct.id}`); 
        } catch (err) {
            console.error('상품 등록 실패:', err);
            alert('상품 등록에 실패했습니다.');
        }
    };


return(
    <div className="container">
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="image-uploader">사진</label>
                    <MultiImageUploader onFilesChange={handleImagesChange} />
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
                        업로드
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPostPage;
