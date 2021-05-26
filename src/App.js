import React from 'react';
import { Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import BulletinPage from './pages/BulletinPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Route component={BulletinPage} path="/" exact />
      <Route component={BoardPage} path="/board/:id" />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
    </>
  );
}

export default App;
