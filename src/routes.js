import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import GlobalFeed from "./pages/globalFeed";
import Authentication from "./pages/authentication";
import Article from "./pages/article";
import TagFeed from "./pages/tagFeed";
import YourFeed from "./pages/yourFeed";
import CreateArticle from "./pages/createArticle";
import EditArticle from "./pages/editArticle";
import Settings from "./pages/settings";
import UserProfile from "./pages/userProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/profiles/:slug" element={<UserProfile />} />
        <Route path="/profiles/:slug/favorites" element={<UserProfile />} />
        <Route path="/articles/new" element={<CreateArticle />} />
        <Route path="/feed" element={<YourFeed />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
      </Route>
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
    </Routes>
  );
};

export default AppRoutes;
