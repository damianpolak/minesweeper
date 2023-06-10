export type px = number;

export enum STATES {
  NOT_STARTED,
  FIRST_CLICK,
  RUNNING,
  WIN,
  LOSE,
  FINISHED
}

export const levels = {
  low: {
    x: 9,
    y: 9,
    m: 10,
  },
  mid: {
    x: 16,
    y: 16,
    m: 40,
  },
  hard: {
    x: 16,
    y: 30,
    m: 120,
  },
  hardcore: {
    x: 20,
    y: 42,
    m: 180,
  },
};
