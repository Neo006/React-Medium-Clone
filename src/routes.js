import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './hoc/protectedRoute';
import GlobalFeed from './pages/globalFeed';
import Authentication from './pages/authentication';
import Article from './pages/article';
import TagFeed from './pages/tagFeed';
import YourFeed from './pages/yourFeed';
import CreateArticle from './pages/createArticle';
import EditArticle from './pages/editArticle';
import Settings from './pages/settings';
import UserProfile from './pages/userProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />} />
      <Route
        path="/profiles/:slug"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profiles/:slug/favorites"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles/new"
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <YourFeed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles/:slug"
        element={
          <ProtectedRoute>
            <Article />
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles/:slug/edit"
        element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        }
      />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
    </Routes>
  );
};

export default AppRoutes;
