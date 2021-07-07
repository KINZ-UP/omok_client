import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PasswordModal from '../../components/main/PasswordModal';
import { closePasswordModal, inputPassword } from '../../modules/room';
import { requestJoin } from '../../modules/room';

function PasswordModalContainer() {
  const dispatch = useDispatch();
  const { isOpen, roomId, password } = useSelector(
    ({ room }) => room.passwordModal
  );
  const onChange = useCallback(
    (e) => dispatch(inputPassword(e.target.value)),
    [dispatch]
  );
  const onClose = useCallback(() => dispatch(closePasswordModal()), [dispatch]);
  const onConfirm = useCallback(() => {
    dispatch(requestJoin({ roomId, password }));
    dispatch(closePasswordModal());
  }, [dispatch, password, roomId]);
  return (
    <PasswordModal
      password={password}
      onChange={onChange}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

export default PasswordModalContainer;
