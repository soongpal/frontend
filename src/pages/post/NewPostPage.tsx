//글쓰기 페이지
//제목, 글 내용, 가격, 거래 장소, 카테고리, url

import type React from "react";
import { Button, Container,Form } from "react-bootstrap";
import Input from "../../components/common/Input";
import MultiImageUploader from "../../components/post/MultiImageUploader";

const NewPostPage: React.FC = () =>{
    return(
        <Container>
            <Form>
                <div className="mb-2">사진</div>
                <MultiImageUploader></MultiImageUploader>

                <Input 
                    label="제목"
                    name="title"
                    placeholder="글 제목을 입력해주세요"
                    // value={form.username}
                    // onChange={handleChange}
                    error="제목 입력 오류"
                >
                </Input>
                <Input 
                    label="설명"
                    name="content"
                    placeholder="상태, 용량, 크기 등 자세히 적어주세요"
                    // value={form.username}
                    // onChange={handleChange}
                    error="내용 입력 오류"
                    as="textarea"
                >
                </Input>
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
                <Input 
                    label="url"
                    name="url"
                    placeholder="관련 링크가 있다면 첨부해주세요"
                    // value={form.username}
                    // onChange={handleChange}
                    error="제목 입력 오류"
                >
                </Input>
                <Input 
                    label="거래 장소"
                    name="location"
                    placeholder="희망 거래 장소를 입력해주세요"
                    // value={form.username}
                    // onChange={handleChange}
                    error="제목 입력 오류"
                >
                </Input>

                 <div className="d-flex justify-content-end">
                    <Button type="submit"  variant="dark" className="mb-5">업로드</Button>
                </div>
            </Form>
        </Container>
    )
}

export default NewPostPage;