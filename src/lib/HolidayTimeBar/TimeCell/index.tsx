import React from 'react';

import { idxToTime, isLunch } from '../utils';

import { TimeCellMode } from '../types';

import { TimeCellContainer, TimeCellContent } from '../style';

interface ITimeCell {
  idx: number;
  mode: TimeCellMode;
  hoverMode: TimeCellMode;
  className?: string;
  holiColor?: string;
  holiHoverColor?: string;
  workColor?: string;
  workHoverColor?: string;
  lunchColor?: string;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
}

const TimeCell = ({
  idx,
  mode,
  hoverMode,
  className,
  holiColor = '#FDB0B3',
  holiHoverColor = '#F15B6D',
  workColor = '#C0FCF8',
  workHoverColor = '#5ABAB6',
  lunchColor = '#E7FBBE',
  setHoverIdx,
  onClick
}: ITimeCell) => {

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
        className={className}
        holiColor={holiColor}
        holiHoverColor={holiHoverColor}
        workColor={workColor}
        workHoverColor={workHoverColor}
        lunchColor={lunchColor}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {time.minute === 0 && <span>{time.hour}</span>}
    </TimeCellContainer>
  )
};

export default TimeCell;
