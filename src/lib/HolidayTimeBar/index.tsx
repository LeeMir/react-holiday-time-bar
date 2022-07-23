import React, { useEffect, useState } from 'react';

import TimeCell from './TimeCell';

import { CORE_TIME, idxToTime, isFast, isLunch, LENGTH, LUNCH_END_TIME, LUNCH_START_TIME, LUNCH_TIME } from './utils';

import { TimeCellValue } from './types';

import { TimeBarContainer, TimeBarWrapper, TimeTextContainer } from './style';

interface IHolidayTimeBar {
  duration: 2 | 4 | 8;
  holiColor?: string;
  holiHoverColor?: string;
  workColor?: string;
  workHoverColor?: string;
  lunchColor?: string;
  viewText?: boolean;
  times?: any;
  setTimes?: React.Dispatch<React.SetStateAction<any>>;
}

const initArr = Array.from(Array(LENGTH * 4), () => ({ mode: 'none', hoverMode: 'none' } as TimeCellValue));
const initHoverArr = (arr: TimeCellValue[]) => arr.map((cell) => ({ mode: cell.mode, hoverMode: 'none' } as TimeCellValue)); 

const HolidayTimeBar = ({
  duration,
  holiColor,
  holiHoverColor,
  workColor,
  workHoverColor,
  lunchColor,
  times,
  setTimes,
  viewText = false
}: IHolidayTimeBar) => {

  const [timeCellList, setTimeCellList] = useState<TimeCellValue[]>(initArr);
  const [hoverIdx, setHoverIdx] = useState<number>(-1);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { startWorkTime, endWorkTime, startHoliTime, endHoliTime } = times ?? {};

  const handleClickCell = () => {
    const arr = [...timeCellList].map((cell) => ({ mode: cell.hoverMode, hoverMode: cell.hoverMode })) as TimeCellValue[];
    setTimeCellList(arr);

    if (times && setTimes) {
      const reverseTimeCellList = [...arr].reverse();

      const startWorkIdx = arr.findIndex((elem) => elem.mode === 'work');
      const endWorkIdx = 52 - reverseTimeCellList.findIndex((elem) => elem.mode === 'work');
      const startHoliIdx = arr.findIndex((elem) => elem.mode === 'holi');
      const endHoliIdx = 52 - reverseTimeCellList.findIndex((elem) => elem.mode === 'holi');

      const startWorkTime = idxToTime(startWorkIdx);
      const endWorkTime = idxToTime(endWorkIdx);
      const startHoliTime = idxToTime(startHoliIdx);
      const endHoliTime = idxToTime(endHoliIdx);

      setTimes({ startWorkTime, endWorkTime, startHoliTime, endHoliTime });
    }
  };

  useEffect(() => {
    if (hoverIdx !== -1) {
      const arr = [...initHoverArr(timeCellList)];
      const time = idxToTime(hoverIdx);
      const startAM = Math.min((LENGTH - 1 - CORE_TIME) * 4, hoverIdx);
      const startPM = Math.max((CORE_TIME - duration) * 4,  Math.min((LENGTH - 1 - duration) * 4, hoverIdx));
      let i;
      
      if (isFast(time, LUNCH_START_TIME)) {
        const start = startAM;

        let flag = 0;
        for (i = 0; i < duration * 4; i++) {
          const idx = start + i;
          if (isLunch(idxToTime(idx))) {
            flag = LUNCH_TIME * 4;
          }
          arr[idx + flag] = { mode: arr[idx + flag].mode, hoverMode: 'holi' };
        }

        const startWork = start + i + flag;
        const workLength = (flag > 0) ? (CORE_TIME - duration) * 4 - flag : (CORE_TIME - duration) * 4;
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
        for (i = 0; i < (CORE_TIME - duration) * 4; i++) {
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
          <TimeCell
            key={idx}
            idx={idx}
            mode={cell.mode}
            hoverMode={cell.hoverMode}
            holiColor={holiColor}
            holiHoverColor={holiHoverColor}
            workColor={workColor}
            workHoverColor={workHoverColor}
            lunchColor={lunchColor}
            setHoverIdx={setHoverIdx}
            onClick={handleClickCell}
          />
        )}
      </TimeBarWrapper>
      { viewText &&
        <>
          <TimeTextContainer>
            <span>출근 시간: {startWorkTime?.hour ?? ''}시 {startWorkTime?.minute ?? ''}분</span>
            <span>휴가 시작 시간: {startHoliTime?.hour ?? ''}시 {startHoliTime?.minute ?? ''}분</span>
          </TimeTextContainer>
          <TimeTextContainer>
            <span>퇴근 시간: {endWorkTime?.hour ?? ''}시 {endWorkTime?.minute ?? ''}분</span>
            <span>휴가 종료 시간: {endHoliTime?.hour ?? ''}시 {endHoliTime?.minute ?? ''}분</span>
          </TimeTextContainer>
        </>
      }
    </TimeBarContainer>
  )
};

export default HolidayTimeBar;
