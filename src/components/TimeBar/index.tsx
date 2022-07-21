import React, { useEffect, useState } from 'react'
import { start } from 'repl';
import { TimeCellContainer, TimeCellContent, TimeBarContainer, TimeBarWrapper } from './style';

interface TimeValue {
  hour: number;
  minute: number;
}

export type TimeCellMode = 'none' | 'holi' | 'lunch' | 'work';

interface ITimeCell {
  mode: TimeCellMode;
  idx: number;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
}

interface TimeCellValue {
  mode: TimeCellMode;
}

const START_TIME = 7;
const END_TIME = 19;
const LENGTH = END_TIME - START_TIME + 1;

const LUNCH_START_TIME = { hour: 11, minute: 30 } as TimeValue;
const LUNCH_END_TIME = { hour: 13, minute: 0 } as TimeValue;

const initArr = Array.from(Array(LENGTH * 4), () => ({ mode: 'none' } as TimeCellValue));

const idxToTime = (idx: number) => ({ hour: Math.floor(idx / 4) + START_TIME, minute: (idx % 4) * 15 } as TimeValue);
const timeToIdx = (time: TimeValue) => (time.hour - START_TIME) * 4 + Math.round(time.minute / 15);

const isFast = (a: TimeValue, b: TimeValue, flag = false) => (a.hour * 60 + a.minute < b.hour * 60 + b.minute) || (flag && isSame(a, b));
const isSame = (a: TimeValue, b: TimeValue) => a.hour * 60 + a.minute === b.hour * 60 + b.minute;
const isLunch = (time: TimeValue) => isFast(LUNCH_START_TIME, time, true) && isFast(time, LUNCH_END_TIME) && !isSame(time, LUNCH_END_TIME);

const TimeCell = ({ mode, idx, setHoverIdx }: ITimeCell) => {
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

  useEffect(() => {
    if (hoverIdx !== -1) {
      const arr = [...initArr];
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
          arr[idx + flag] = { mode: 'holi' };
        }

        const startWork = start + i + flag;
        const workLength = (flag > 0) ? (9 - duration) * 4 - flag : (9 - duration) * 4
        for (i = 0; i < workLength; i++) {
          const idx = startWork + i;
          arr[idx] = { mode: 'work' };
        }
      }

      if (isFast(LUNCH_END_TIME, time, true)) {
        const start = startPM;
        for (i = 0; i < duration * 4; i++) {
          const idx = start + i;
          arr[idx] = { mode: 'holi' };
        }

        const startWork = start - 1;
        for (i = 0; i < (9 - duration) * 4; i++) {
          const idx = startWork - i;
          if (!isLunch(idxToTime(idx))) {
            arr[idx] = { mode: 'work' };
          }
        }
      }

      setTimeCellList([...arr]);
    }
  }, [hoverIdx]);

  return (
    <TimeBarContainer>
      <TimeBarWrapper>
        {timeCellList.map((val: TimeCellValue, idx: number) => 
          <TimeCell key={idx} idx={idx} mode={val.mode} setHoverIdx={setHoverIdx} />
        )}
      </TimeBarWrapper>
    </TimeBarContainer>
  )
};

export default TimeBar;
