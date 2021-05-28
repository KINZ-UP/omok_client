import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import Responsive from '../components/common/Responsive';
import CreateModal from '../components/main/CreateModal';
import GameList from '../components/main/GameList';
import { openModal } from '../modules/create';

function BulletinPage() {
  const dispatch = useDispatch();
  const onOpenCreateModal = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  return (
    <BulletinPageBlock>
      <Header />
      <MainBlock>
        <StyledButton onClick={onOpenCreateModal}>새게임 +</StyledButton>
        <GameList />
      </MainBlock>
      <CreateModal />
    </BulletinPageBlock>
  );
}

const MainBlock = styled(Responsive)`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
`;

const BulletinPageBlock = styled.div``;

export default BulletinPage;
