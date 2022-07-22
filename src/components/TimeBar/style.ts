import styled from 'styled-components';

import { TimeCellValue } from '.';

export const TimeBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TimeBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
  gap: 2px;
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
  width: 13px;
  height: 30px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${props => {
    switch (props.mode) {
      case 'lunch':
        return '#E7FBBE';
      case 'holi':
        return '#FDB0B3';
      case 'work':
        return '#C0FCF8';
      case 'none':
        return '#fff';
      default:
        return '#fff';
    }
  }};
  border: ${props => {
    if (props.mode === 'lunch') return '1px solid #ababab';
    switch (props.hoverMode) {
      case 'holi':
        return '2px solid #F15B6D';
      case 'work':
        return '2px solid #5ABAB6';
      default:
        return '1px solid #ababab';
    }
  }};
`;

export const TimeTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;