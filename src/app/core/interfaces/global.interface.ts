export type px = number;

export enum STATES {
  NOT_STARTED = 'NOT_STARTED',
  FIRST_CLICK = 'FIRST_CLICK',
  RUNNING = 'RUNNING',
  WIN = 'WIN',
  LOSE = 'LOSE',
  FINISHED = 'FINISHED'
}

export enum LEVELS {
  TEST = 'test',
  LOW = 'low',
  MID = 'mid',
  HARD = 'hard',
  HARDCORE = 'hardcore'
}

export type Level = {
  name: LEVELS,
  row: number,
  col: number,
  mines: number
}
