import { px } from "./global.interface";

export interface FieldSize {
  width: px,
  height: px
}

export enum SYMBOLS {
  MINE = '*',
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

export type Field = {
  value: string | number,
  addr: Address
}

export type Address = {
  row: number,
  col: number
}
