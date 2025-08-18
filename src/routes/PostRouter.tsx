//게시글 관련 라우트
import { Route, Routes } from "react-router-dom";
import NewPostPage from "../pages/post/NewPostPage";
import PostDetailPage from "../pages/post/EditPostPage";
import EditPostPage from "../pages/post/EditPostPage";

const PostRouter : React.FC = () => {
    return(
        <Routes>
             <Route path="newpost" element={<NewPostPage />}/>
            <Route path="edit/:PostId" element={<EditPostPage />}/>
        </Routes>
    )
}

export default PostRouter;