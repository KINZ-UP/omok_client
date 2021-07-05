import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingModal from '../../components/board/Control/SettingModal';
import { confirmSetting, closeSetting } from '../../modules/control';

function SettingModalContainer() {
  const dispatch = useDispatch();
  const { isOpen, totalTime, numOfSection } = useSelector(
    (state) => state.control.setting
  );
  const [tempTotalTime, setTempTotalTime] = useState(totalTime);
  const [tempNumOfSection, setTempNumOfSection] = useState(numOfSection);

  const onChangeTotalTime = useCallback(
    (e) => setTempTotalTime(parseInt(e.target.value)),
    []
  );

  const onChangeNumOfSection = useCallback(
    (e) => setTempNumOfSection(parseInt(e.target.value)),
    []
  );

  const onConfirm = useCallback(() => {
    dispatch(
      confirmSetting({
        totalTime: tempTotalTime,
        numOfSection: tempNumOfSection,
      })
    );
  }, [dispatch, tempTotalTime, tempNumOfSection]);

  const onClose = useCallback(() => {
    dispatch(closeSetting());
  }, [dispatch]);

  const settingItems = useMemo(
    () => [
      {
        name: '제한시간(초)',
        currVal: tempTotalTime,
        options: [10, 20, 30, 60, 300, 600],
        onChange: onChangeTotalTime,
      },
      {
        name: '칸수',
        currVal: tempNumOfSection,
        options: [10, 12, 14, 16, 18],
        onChange: onChangeNumOfSection,
      },
    ],
    [onChangeNumOfSection, onChangeTotalTime, tempNumOfSection, tempTotalTime]
  );

  return (
    <SettingModal
      isOpen={isOpen}
      onClose={onClose}
      settingItems={settingItems}
      onConfirm={onConfirm}
    />
  );
}

export default SettingModalContainer;
