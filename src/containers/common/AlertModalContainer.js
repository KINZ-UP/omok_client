import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../../components/common/AlertModal';
import { resetMessage } from '../../modules/common';

function AlertModalContainer() {
  const dispatch = useDispatch();
  const { message } = useSelector(({ common }) => common.alert);
  const onClose = useCallback(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  return (
    <AlertModal message={message} isOpen={message !== null} onClose={onClose} />
  );
}

export default AlertModalContainer;
