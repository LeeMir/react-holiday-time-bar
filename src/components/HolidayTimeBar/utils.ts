import { TimeValue } from './types';

export const START_TIME = 7;
export const END_TIME = 19;
export const LENGTH = END_TIME - START_TIME + 1;

export const CORE_TIME = 9;

export const LUNCH_START_TIME = { hour: 11, minute: 30 } as TimeValue;
export const LUNCH_END_TIME = { hour: 13, minute: 0 } as TimeValue;

export const idxToTime = (idx: number) => idx === -1 || idx > 48 ? ({hour: -1, minute: -1}) : ({ hour: Math.floor(idx / 4) + START_TIME, minute: (idx % 4) * 15 } as TimeValue);
export const timeToIdx = (time: TimeValue) => (time.hour - START_TIME) * 4 + Math.round(time.minute / 15);

export const isFast = (a: TimeValue, b: TimeValue, flag = false) => (a.hour * 60 + a.minute < b.hour * 60 + b.minute) || (flag && isSame(a, b));
export const isSame = (a: TimeValue, b: TimeValue) => a.hour * 60 + a.minute === b.hour * 60 + b.minute;
export const isLunch = (time: TimeValue) => isFast(LUNCH_START_TIME, time, true) && isFast(time, LUNCH_END_TIME) && !isSame(time, LUNCH_END_TIME);
