import { TimeValue } from './types';

export const START_TIME = 7; // 07시부터
export const END_TIME = 19; // 19시까지 표시
export const LENGTH = END_TIME - START_TIME + 1;

export const CORE_TIME = 9; // 코어 타임 9시간

export const LUNCH_TIME = 1.5; // 점심 시간 1시간 30분

export const LUNCH_START_TIME = { hour: 11, minute: 30 } as TimeValue; // 점심시간은 11시 30분부터
export const LUNCH_END_TIME = { hour: 13, minute: 0 } as TimeValue; // 13시까지

/**
 * TimeCell의 idx를 TimeValue 형식으로 바꿔주는 함수
 * @param {number} idx
 * @returns {TimeValue}
 */
export const idxToTime = (idx: number) => idx === -1 || idx > 48 ? ({hour: -1, minute: -1}) : ({ hour: Math.floor(idx / 4) + START_TIME, minute: (idx % 4) * 15 } as TimeValue);

/**
 * TimeValue 형식을 TimeCell의 인덱스로 바꿔주는 함수
 * @param {TimeValue} time 
 * @returns {number}
 */
export const timeToIdx = (time: TimeValue) => (time.hour - START_TIME) * 4 + Math.round(time.minute / 15);

/**
 * a 시간이 b 시간보다 빠른지 비교하는 함수, 빠르면 true
 * flag가 true면 a 시간과 b 시간이 같을 경우에도 true를 반환함 (기본값 false)
 * @param {TimeValue} a
 * @param {TimeValue} b 
 * @param {boolean} flag 
 * @returns {boolean}
 */
export const isFast = (a: TimeValue, b: TimeValue, flag = false) => (a.hour * 60 + a.minute < b.hour * 60 + b.minute) || (flag && isSame(a, b));

/**
 * a 시간과 b 시간이 같은지 비교하는 함수
 * @param {TimeValue} a
 * @param {TimeValue} b 
 * @returns {boolean}
 */
export const isSame = (a: TimeValue, b: TimeValue) => a.hour * 60 + a.minute === b.hour * 60 + b.minute;

/**
 * 이 시간이 점심시간에 해당되는지 판단하는 함수
 * @param {TimeValue} time 
 * @returns {boolean}
 */
export const isLunch = (time: TimeValue) => isFast(LUNCH_START_TIME, time, true) && isFast(time, LUNCH_END_TIME);
