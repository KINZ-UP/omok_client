import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';
import ChatHistory from './ChatHistory';

const chatHistory = [
  {
    username: 'hello',
    isSelf: true,
    message: '안녕하세요',
  },
  {
    username: '떨이',
    isSelf: false,
    message: '안녕하세요',
  },
  {
    username: 'hello',
    isSelf: true,
    message: '안녕하세요',
  },
  {
    username: '떨이',
    isSelf: false,
    message: '안녕하세요',
  },
  {
    username: 'hello',
    isSelf: true,
    message: '안녕하세요',
  },
  {
    username: '떨이',
    isSelf: false,
    message: '안녕하세요',
  },
  {
    username: 'hello',
    isSelf: true,
    message: '안녕하세요',
  },
  {
    username: '떨이',
    isSelf: false,
    message: '안녕하세요',
  },
];

function Chat() {
  return (
    <ChatBlock>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInputBlock>
        <input />
        <button>+</button>
      </ChatInputBlock>
    </ChatBlock>
  );
}

const ChatBlock = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  background: ${palette.darkwoodThree[4]};
  display: grid;
  grid-template-rows: minmax(0, 1fr) max-content;
`;

const ChatInputBlock = styled.form`
  width: 100%;
  height: 2.2rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2.2rem;
  input {
    font-size: 1rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
    padding: 0 0.5rem;
    min-width: 0;
  }
  button {
    background: ${palette.darkwoodThree[3]};
    font-size: 1.3rem;
    color: #fff;
  }
`;

export default Chat;
