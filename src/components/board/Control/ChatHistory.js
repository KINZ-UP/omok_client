import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function ChatItem({ chatItem }) {
  const { type, message } = chatItem;
  if (type === 'CHAT') {
    const { username, isSelf, content } = message;
    return (
      <ChatItemBlock isSelf={isSelf}>
        {!isSelf && <div className="username">{username}</div>}
        <div className="message">{content}</div>
      </ChatItemBlock>
    );
  }

  return <NoticeBlock className="notice">{message}</NoticeBlock>;
}

const NoticeBlock = styled.div`
  text-align: center;
  div + & {
    margin-top: 1rem;
  }
`;

const ChatItemBlock = styled.div`
  ${(props) =>
    props.isSelf
      ? css`
          margin-left: auto;
        `
      : css`
          margin-right: auto;
        `}

  .username {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-bottom: 0.3rem;
  }
  .message {
    background: ${(props) =>
      props.isSelf ? palette.darkwoodThree[0] : palette.darkwoodThree[1]};
    width: fit-content;
    padding: 0.3rem 0.4rem;
    border-radius: 0.2rem;
  }

  div + & {
    margin-top: 1rem;
  }
`;

function ChatHistory({ chatLog }) {
  const chatLogBlock = useRef(null);
  useEffect(() => {
    if (!chatLogBlock) return;
    chatLogBlock.current.scrollTop = chatLogBlock.current.scrollHeight;
  }, [chatLog, chatLogBlock]);

  return (
    <ChatHistoryBlock ref={chatLogBlock}>
      {chatLog.map((chatItem, idx) => (
        <ChatItem key={idx} chatItem={chatItem} />
      ))}
    </ChatHistoryBlock>
  );
}

const ChatHistoryBlock = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 1fr;
`;

export default ChatHistory;
