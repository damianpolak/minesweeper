import { Address, Field } from "./field.interface";
import { GameScore, GameState, Level, STATES } from "./global.interface";

export interface Game {
  selectedLevel: Level;
  gameState: STATES;
  finished: boolean;
  readonly matrix: Field[][];

  updateGameState(event: GameState): void;
  updateGameScore(event: Address): void;
}
