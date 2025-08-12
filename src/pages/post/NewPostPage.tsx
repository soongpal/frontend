//글쓰기 페이지
//제목, 글 내용, 가격, 거래 장소, 카테고리, url

import type React from "react";
import { Button, Form } from "react-bootstrap";
import MultiImageUploader from "../../components/post/MultiImageUploader";
import { useState } from "react";
import { type Status } from "../../types/product";
import type { BASE_URL } from "../../sevices/api";
import { createProduct } from "../../sevices/productService"



const NewPostPage: React.FC = () =>{

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [url, setUrl] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [category, setCategory] = useState<Status>();
    const [images, setImages] = useState<FileList | null>(null);

    //multy image uploader props전달용
    const handleImagesChange = (files: FileList | null) => {
        setImages(files); 
    };


    //formData객체
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('url', url);
    formData.append('location', location);
    formData.append('category', category);
    for (const image of Array.from(images)) {
      formData.append('images', image);
    }

    // createProduct에 데이터 전달
    try {
      const newProduct = await createProduct(formData); 
      console.log('상품 등록 성공:', newProduct);
      alert('상품이 성공적으로 등록되었습니다.');
      //내가 쓴글 페이지 상세보기 화면으로 넘어갈것
    } catch (err) {
      console.error('상품 등록 실패:', err);
      alert('상품 등록에 실패했습니다.');
    }
  };


    return(
        <div className="container" action="{BASE_URL} +" method="post" enctype="multipart/form-data">
            <form >
                <div className="mb-2">사진</div>
                <MultiImageUploader onFilesChange={handleImagesChange}></MultiImageUploader>

                <input 
                    label="제목"
                    name="title"
                    placeholder="글 제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    error="제목 입력 오류"
                >
                </input>
                <input 
                    label="설명"
                    name="content"
                    placeholder="상태, 용량, 크기 등 자세히 적어주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    error="내용 입력 오류"
                    as="textarea"
                >
                </input>
                <input 
                    label="가격"
                    name="price"
                    placeholder="가격을 적어주세요"
                    value={ price }
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                    required
                    error="내용 입력 오류"
                    as="textarea"
                >
                </input>                
                <div className="mb-2">카테고리</div>
                <Form.Group className="d-flex gap-3">
                    <Form.Check
                        type="radio"
                        label="공동구매"
                        name="category"
                        value="GROUP"
                        className="mb-5"
                    ></Form.Check>

                    <Form.Check
                        type="radio"
                        label="중고거래"
                        name="category"
                        value="USED"
                        className="mb-5"
                    ></Form.Check>
                </Form.Group>
                <input 
                    label="url"
                    name="url"
                    placeholder="관련 링크가 있다면 첨부해주세요"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    error="제목 입력 오류"
                >
                </input>
                <input 
                    label="거래 장소"
                    name="location"
                    placeholder="희망 거래 장소를 입력해주세요"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    error="제목 입력 오류"
                >
                </input>

                 <div className="d-flex justify-content-end">
                    <Button type="submit"  variant="dark" className="mb-5">업로드</Button>
                </div>
            </form>
        </div>
    )

}
export default NewPostPage;