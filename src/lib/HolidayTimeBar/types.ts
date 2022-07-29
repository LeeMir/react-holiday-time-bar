export interface TimeValue {
  hour: number;
  minute: number;
}

export type TimeCellMode = 'none' | 'lunch' | 'holi' | 'work';

export interface TimeCellValue {
  mode: TimeCellMode;
  hoverMode: TimeCellMode;
}
