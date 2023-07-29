import { Difficulty, LEVELS, Level } from "../interfaces/global.interface";

export class Global {
  /**
   * Level difficulty parameters.
   */
  private static _levels: Difficulty[] = [
    { name: LEVELS.LOW, row: 9, col: 9, difficultyInd: 12.5 },
    { name: LEVELS.MID, row: 16, col: 16, difficultyInd: 15.5 },
    { name: LEVELS.HARD, row: 16, col: 30, difficultyInd: 18 },
    { name: LEVELS.HARDCORE, row: 20, col: 42, difficultyInd: 20 },
    // { name: LEVELS.SUPERHARDCORE, row: 32, col: 54, difficultyInd: 25 },
  ];

  /**
   * Returns parameters of game level based on given level name.
   */
  public static getLevel(name: LEVELS | string): Level {
    const level = <Level>this._levels.find(i => i.name === name);
    return {...level, ...{mines: this._calcMines(level)}};
  }

  /**
   * Calculating mines based on difficilty parameters (row, col, percentage diff indicator) and returns number of mines.
   */
  private static _calcMines(diff: Difficulty): number {
    return Math.round(diff.difficultyInd * (diff.col * diff.row) / 100);
  }
}
