import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../../components/board/Control/Chat';
import { changeMessage, sendMessage } from '../../modules/control';

function ChatContainer() {
  const dispatch = useDispatch();
  const onChangeText = useCallback(
    (e) => dispatch(changeMessage(e.target.value)),
    [dispatch]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(sendMessage());
    },
    [dispatch]
  );

  return <Chat onChangeText={onChangeText} onSubmit={onSubmit} />;
}

export default ChatContainer;
