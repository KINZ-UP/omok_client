import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../../components/board/Control/Chat';
import { changeMessage, sendMessage } from '../../modules/control';

function ChatContainer() {
  const { chatInput, chatLog } = useSelector(({ control }) => control);
  const dispatch = useDispatch();

  const onChangeText = useCallback(
    (e) => dispatch(changeMessage(e.target.value)),
    [dispatch]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!chatInput.trim()) return;
      dispatch(sendMessage());
    },
    [dispatch, chatInput]
  );

  return (
    <Chat
      chatInput={chatInput}
      chatLog={chatLog}
      onChangeText={onChangeText}
      onSubmit={onSubmit}
    />
  );
}

export default ChatContainer;
