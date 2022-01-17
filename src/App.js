import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import TopBar from './components/topBar';
import { CurrentUserProvider } from './contexts/currentUser';
import CurrentUserChecker from './components/currentUserChecker';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <AppRoutes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
