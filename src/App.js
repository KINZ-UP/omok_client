import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import SocketContainer from './containers/SocketContainer';
import BoardPage from './pages/BoardPage';
import BulletinPage from './pages/BulletinPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { loggedIn } = useSelector(({ user }) => user);
  return (
    <>
      <SocketContainer />
      <Route path="/login">
        {loggedIn ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route path="/register">
        {loggedIn ? <Redirect to="/" /> : <RegisterPage />}
      </Route>
    </>
  );
}

export default App;
