import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { connect } from '../modules/socket';
import BoardPage from '../pages/BoardPage';
import BulletinPage from '../pages/BulletinPage';
import NoPage from '../pages/NoPage';

function SocketContainer() {
  const { loggedIn, username } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL);

    if (loggedIn) {
      dispatch(connect(socket));
      socket.on('connect', () => {
        socket.emit('newUser', username);
      });
    }

    return () => socket.disconnect();
  }, [dispatch, loggedIn, username]);

  return (
    <Switch>
      <Route component={BulletinPage} path="/" exact />
      <Route component={BoardPage} path="/board/:roomId" />
      <Route component={NoPage} />
    </Switch>
  );
}

export default React.memo(SocketContainer);
