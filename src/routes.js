import React from 'react';
import {Routes, Route} from 'react-router-dom';
import GlobalFeed from './pages/globalFeed'
import Authentication from './pages/authentication';
import Article from './pages/article';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed/>} />
      <Route path="/login" element={<Authentication/>} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/articles/:slug" element={<Article/>} />
    </Routes>
  )
}

export default AppRoutes;