import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { connect, disconnect } from '../modules/socket';
import BoardPage from '../pages/BoardPage';
import BulletinPage from '../pages/BulletinPage';

export default function SocketContainer() {
  const { loggedIn, username } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:8000');
    dispatch(connect(socket));

    if (loggedIn) {
      socket.on('connect', function () {
        socket.emit('newUser', username);
      });
    }

    return () => socket.disconnect();
  }, [dispatch, loggedIn, username]);

  return (
    <>
      <Route component={BulletinPage} path="/" exact />
      <Route component={BoardPage} path="/board/:roomId" />
    </>
  );
}
