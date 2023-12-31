export type px = number;

export enum STATES {
  NOT_STARTED = 'NOT_STARTED',
  FIRST_CLICK = 'FIRST_CLICK',
  RUNNING = 'RUNNING',
  WIN = 'WIN',
  LOSE = 'LOSE',
  FINISHED = 'FINISHED'
}

export interface GameState {
  before: STATES,
  current: STATES
}

export interface GameScore {
  discovered: number,
  toDiscover: number
}

export enum LEVELS {
  LOW = 'LOW',
  MID = 'MID',
  HARD = 'HARD',
  HARDCORE = 'HARDCORE',
}

export type Difficulty = {
  name: LEVELS,
  row: number,
  col: number,
  difficultyInd: number,
}

export interface Level extends Difficulty {
  mines: number
}

export interface StorageConfig {
  level: LEVELS,
  questionMarkEnabled: false,
  debugMode: boolean | 'YES PLEASE!'
}

export interface Assets {
  name: string,
  path: string
}

export namespace Modal {
  export type EventType = 'onClose' | 'onAction';
  export interface EventMessage {
    event: EventType,
    data?: unknown
  }
}
