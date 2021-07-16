import React from 'react';
import { Route } from 'react-router-dom';
import SocketContainer from './containers/SocketContainer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <SocketContainer />
    </>
  );
}

export default App;
