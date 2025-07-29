//사용자 관련 라우트 정의

import { Route, Routes } from "react-router-dom";
import FavoritesPage from "../pages/user/FavoritesPage";
import MyPage from "../pages/user/MyPage";
import MyPostPage from "../pages/user/MyPostPage";
import SettingPage from "../pages/user/SettingPage";

const UserRouter : React.FC = () => {
    return(
        <Routes>
            <Route path="favorites" element={<FavoritesPage />}/>
            <Route path="mypage" element={<MyPage />}/>
            <Route path="mypost" element={<MyPostPage />}/>
            <Route path="setting" element={<SettingPage />}/>
        </Routes>
    )
}

export default UserRouter;