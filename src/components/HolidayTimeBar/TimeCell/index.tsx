import React from 'react';

import { idxToTime, isLunch } from '../utils';

import { TimeCellMode } from '../types';

import { TimeCellContainer, TimeCellContent } from '../style';

interface ITimeCell {
  idx: number;
  mode: TimeCellMode;
  hoverMode: TimeCellMode;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
}

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

export default TimeCell;
