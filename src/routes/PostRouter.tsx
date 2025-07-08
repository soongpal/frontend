//게시글 관련 라우트
import { Route, Routes } from "react-router-dom";
import NewPostPage from "../pages/post/NewPostPage";
import PostDetailPage from "../pages/post/PostDetailPage";

const PostRouter : React.FC = () => {
    return(
        <Routes>
             <Route path="newpost" element={<NewPostPage />}/>
            <Route path="postdetail/:PostId" element={<PostDetailPage />}/>
        </Routes>
    )
}

export default PostRouter;