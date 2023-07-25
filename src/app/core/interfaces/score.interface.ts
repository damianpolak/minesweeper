import { LEVELS } from "./global.interface";

export interface Score {
  type: 'WIN' | 'LOSE',
  level: LEVELS;
  time: number;
  scorePerc: number;
  timestamp: Date
}
