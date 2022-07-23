import React, { useEffect, useState } from 'react';

import TimeCell from './TimeCell';

import { TimeCellValue } from './types';
import { idxToTime, isFast, isLunch, LENGTH, LUNCH_END_TIME, LUNCH_START_TIME } from './utils';

import { TimeBarContainer, TimeBarWrapper, TimeTextContainer } from './style';

const initArr = Array.from(Array(LENGTH * 4), () => ({ mode: 'none', hoverMode: 'none' } as TimeCellValue));
const initHoverArr = (arr: TimeCellValue[]) => arr.map((cell) => ({ mode: cell.mode, hoverMode: 'none' } as TimeCellValue)); 

const TimeBar = ({ duration }: { duration: number }) => {
  const [timeCellList, setTimeCellList] = useState<TimeCellValue[]>(initArr);
  const [hoverIdx, setHoverIdx] = useState<number>(-1);
  const [isHover, setIsHover] = useState<boolean>(false);
  const reverseTimeCellList = [...timeCellList].reverse();

  const startWorkIdx = timeCellList.findIndex((elem) => elem.mode === 'work');
  const endWorkIdx = 52 - reverseTimeCellList.findIndex((elem) => elem.mode === 'work');
  const startHoliIdx = timeCellList.findIndex((elem) => elem.mode === 'holi');
  const endHoliIdx = 52 - reverseTimeCellList.findIndex((elem) => elem.mode === 'holi');

  const startWorkTime = idxToTime(startWorkIdx);
  const endWorkTime = idxToTime(endWorkIdx);
  const startHoliTime = idxToTime(startHoliIdx);
  const endHoliTime = idxToTime(endHoliIdx);

  const handleClickCell = () => {
    const arr = [...timeCellList].map((cell) => ({ mode: cell.hoverMode, hoverMode: cell.hoverMode })) as TimeCellValue[];
    setTimeCellList(arr);
  };

  useEffect(() => {
    if (hoverIdx !== -1) {
      const arr = [...initHoverArr(timeCellList)];
      const time = idxToTime(hoverIdx);
      const startAM = Math.min((LENGTH - 1 - 9) * 4, hoverIdx);
      const startPM = Math.max((9 - duration) * 4,  Math.min((LENGTH - 1 - duration) * 4, hoverIdx));
      let i;
      
      if (isFast(time, LUNCH_START_TIME)) {
        const start = startAM;

        let flag = 0;
        for (i = 0; i < duration * 4; i++) {
          const idx = start + i;
          if (isLunch(idxToTime(idx))) {
            flag = 6;
          }
          arr[idx + flag] = { mode: arr[idx + flag].mode, hoverMode: 'holi' };
        }

        const startWork = start + i + flag;
        const workLength = (flag > 0) ? (9 - duration) * 4 - flag : (9 - duration) * 4;
        for (i = 0; i < workLength; i++) {
          const idx = startWork + i;
          arr[idx] = { mode: arr[idx].mode, hoverMode: 'work' };
        }
      }

      if (isFast(LUNCH_END_TIME, time, true)) {
        const start = startPM;
        for (i = 0; i < duration * 4; i++) {
          const idx = start + i;
          arr[idx] = { mode: arr[idx].mode, hoverMode: 'holi' };
        }

        const startWork = start - 1;
        for (i = 0; i < (9 - duration) * 4; i++) {
          const idx = startWork - i;
          if (!isLunch(idxToTime(idx))) {
            arr[idx] = { mode: arr[idx].mode, hoverMode: 'work' };
          }
        }
      }
      setTimeCellList(arr);
    }
  }, [hoverIdx]);

  useEffect(() => {
    if (!isHover) {
      setTimeCellList((prev) => initHoverArr(prev));
    }
  }, [isHover]);

  return (
    <TimeBarContainer>
      <TimeBarWrapper onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {timeCellList.map((cell: TimeCellValue, idx: number) => 
          <TimeCell key={idx} idx={idx} mode={cell.mode} hoverMode={cell.hoverMode} setHoverIdx={setHoverIdx} onClick={handleClickCell} />
        )}
      </TimeBarWrapper>
      <TimeTextContainer>
        <span>출근 시간: {startWorkTime.hour}시 {startWorkTime.minute}분</span>
        <span>휴가 시작 시간: {startHoliTime.hour}시 {startHoliTime.minute}분</span>
      </TimeTextContainer>
      <TimeTextContainer>
        <span>퇴근 시간: {endWorkTime.hour}시 {endWorkTime.minute}분</span>
        <span>휴가 종료 시간: {endHoliTime.hour}시 {endHoliTime.minute}분</span>
      </TimeTextContainer>
    </TimeBarContainer>
  )
};

export default TimeBar;
