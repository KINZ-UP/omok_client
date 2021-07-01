import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';
import ChatHistory from './ChatHistory';

function Chat({ chatInput, chatLog, onChangeText, onSubmit }) {
  return (
    <ChatBlock>
      <ChatHistory chatLog={chatLog} />
      <ChatInputBlock onSubmit={onSubmit}>
        <input value={chatInput} onChange={onChangeText} />
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
