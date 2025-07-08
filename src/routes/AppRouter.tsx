//전체 라우터 모음

import type React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ChatListPage from "../pages/chat/ChatListPage";
import ChatRoomPage from "../pages/chat/ChatRoomPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import NewPostPage from "../pages/post/NewPostPage";
import PostDetailPage from "../pages/post/PostDetailPage";
import GroupPurchasePage from "../pages/product/category/GroupPurchasePage";
import UsedTradePage from "../pages/product/category/UsedTradePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import FavoritesPage from "../pages/user/FavoritesPage";
import MyPage from "../pages/user/MyPage";
import MyPostPage from "../pages/user/MyPostPage";
import ProfilePage from "../pages/user/ProfilePage";

const AppRouter: React.FC = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/chatlist" element={<ChatListPage />}/>
            <Route path="/chatroom/:id" element={<ChatRoomPage />}/>
            <Route path="/newpost" element={<NewPostPage />}/>
            <Route path="/postdetail/:id" element={<PostDetailPage />}/>
            <Route path="/grouppurchase" element={<GroupPurchasePage />}/>
            <Route path="/usedtrade" element={<UsedTradePage />}/>
            <Route path="/productdetail/:id" element={<ProductDetailPage />}/>
            <Route path="/favorites" element={<FavoritesPage />}/>
            <Route path="/mypage" element={<MyPage />}/>
            <Route path="/mypost" element={<MyPostPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    )
}

export default AppRouter;