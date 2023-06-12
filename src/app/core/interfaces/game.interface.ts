import { Field } from "./field.interface";
import { GameScore, GameState, Level, STATES } from "./global.interface";

export interface Game {
  selectedLevel: Level;
  gameState: STATES;
  discovered: number;
  toDiscover: number;
  readonly matrix: Field[][];

  updateGameState(event: GameState): void;
  updateGameScore(event: Field[][]): void;
}
