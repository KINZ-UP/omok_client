import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PasswordModal from '../../components/main/PasswordModal';
import { closePasswordModal, inputPassword } from '../../modules/passwordModal';
import { requestJoin } from '../../modules/room';

function PasswordModalContainer({ roomId }) {
  const dispatch = useDispatch();
  const { isOpen, input } = useSelector(({ passwordModal }) => passwordModal);
  const onChange = useCallback(() => dispatch(inputPassword()), [dispatch]);
  const onClose = useCallback(() => dispatch(closePasswordModal()), [dispatch]);
  const onConfirm = useCallback(() => {
    dispatch(requestJoin({ roomId, password: input }));
  }, [dispatch, input, roomId]);
  return (
    <PasswordModal
      password={input}
      onChange={onChange}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

export default PasswordModalContainer;
