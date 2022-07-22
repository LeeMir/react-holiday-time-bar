import React, { useEffect, useState } from 'react';
import { TimeCellContainer, TimeCellContent, TimeBarContainer, TimeBarWrapper, TimeTextContainer } from './style';

interface TimeValue {
  hour: number;
  minute: number;
}

export type TimeCellMode = 'none' | 'lunch' | 'holi' | 'work';

interface ITimeCell {
  idx: number;
  mode: TimeCellMode;
  hoverMode: TimeCellMode;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
}

export interface TimeCellValue {
  mode: TimeCellMode;
  hoverMode: TimeCellMode;
}

const START_TIME = 7;
const END_TIME = 19;
const LENGTH = END_TIME - START_TIME + 1;

const LUNCH_START_TIME = { hour: 11, minute: 30 } as TimeValue;
const LUNCH_END_TIME = { hour: 13, minute: 0 } as TimeValue;

const initArr = Array.from(Array(LENGTH * 4), () => ({ mode: 'none', hoverMode: 'none' } as TimeCellValue));
const initHoverArr = (arr: TimeCellValue[]) => arr.map((cell) => ({ mode: cell.mode, hoverMode: 'none' } as TimeCellValue)); 

const idxToTime = (idx: number) => idx === -1 || idx > 48 ? ({hour: -1, minute: -1}) : ({ hour: Math.floor(idx / 4) + START_TIME, minute: (idx % 4) * 15 } as TimeValue);
const timeToIdx = (time: TimeValue) => (time.hour - START_TIME) * 4 + Math.round(time.minute / 15);

const isFast = (a: TimeValue, b: TimeValue, flag = false) => (a.hour * 60 + a.minute < b.hour * 60 + b.minute) || (flag && isSame(a, b));
const isSame = (a: TimeValue, b: TimeValue) => a.hour * 60 + a.minute === b.hour * 60 + b.minute;
const isLunch = (time: TimeValue) => isFast(LUNCH_START_TIME, time, true) && isFast(time, LUNCH_END_TIME) && !isSame(time, LUNCH_END_TIME);

const TimeCell = ({ idx, mode, hoverMode, setHoverIdx, onClick }: ITimeCell) => {
  const time = idxToTime(idx);
  if (isLunch(time)) {
    mode = 'lunch';
  }
  const handleMouseEnter = () => {
    setHoverIdx(idx);
  };
  const handleMouseLeave = () => {
    setHoverIdx(-1);
  };
  return (
    <TimeCellContainer>
      <TimeCellContent
        mode={mode}
        hoverMode={hoverMode}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {time.minute === 0 && <span>{time.hour}</span>}
    </TimeCellContainer>
  )
};

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
