import { LEVELS, Level } from "../interfaces/global.interface";

export class Global {
  private static _levels: Level[] = [
    { name: LEVELS.TEST, row: 4, col: 4, mines: 1 },
    { name: LEVELS.LOW, row: 9, col: 9, mines: 10 },
    { name: LEVELS.MID, row: 16, col: 16, mines: 40 },
    { name: LEVELS.HARD, row: 16, col: 30, mines: 120 },
    { name: LEVELS.HARDCORE, row: 20, col: 42, mines: 15 },
    // { name: LEVELS.SUPERHARDCORE, row: 70, col: 70, mines: 80 }
    // { name: LEVELS.HARDCORE, row: 20, col: 42, mines: 180 }
  ];

  public static getLevel(name: LEVELS | string): Level {
    const level = this._levels.filter((i: Level) => {
      return i.name === name
    });

    return level.length > 0 ? level[0] : { name: LEVELS.LOW, row: 9, col: 9, mines: 10 };
  }
}
