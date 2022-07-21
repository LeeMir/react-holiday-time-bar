import styled from 'styled-components';

import { TimeCellMode } from '.';

interface TimeCellValue {
  mode: TimeCellMode;
}

export const TimeBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TimeBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

export const TimeCellContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;

  span {
    position: absolute;
    transform: translateX(-50%);
    top: 35px;
  }

  &:nth-last-child(1),
  &:nth-last-child(2),
  &:nth-last-child(3),
  &:nth-last-child(4) {
    div {
      display: none;
    }
  }
`;

export const TimeCellContent = styled.div<TimeCellValue>`
  display: block;
  width: 10px;
  height: 30px;
  border: 1px solid #777;
  background-color: ${props => {
    switch (props.mode) {
      case 'lunch':
        return '#C4DFAA';
      case 'holi':
        return '#F5F0BB';
      case 'work':
        return '#90C8AC';
      case 'none':
        return '#fff';
      default:
        return '#fff';
    }
  }}
`;
