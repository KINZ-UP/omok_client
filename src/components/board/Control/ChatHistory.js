import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function ChatItem({ chatItem }) {
  const { username, isSelf, message } = chatItem;
  return (
    <ChatItemBlock isSelf={isSelf}>
      {!isSelf && <div className="username">{username}</div>}
      <div className="message">{message}</div>
    </ChatItemBlock>
  );
}

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
    padding: 0.3rem 0.4rem;
    border-radius: 0.2rem;
  }

  & + & {
    margin-top: 1rem;
  }
`;

function ChatHistory({ chatHistory }) {
  return (
    <ChatHistoryBlock>
      {chatHistory.map((chatItem) => ChatItem((chatItem = { chatItem })))}
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
