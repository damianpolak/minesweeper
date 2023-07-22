import { Field } from "./field.interface";
import { GameState, Level, STATES } from "./global.interface";

export interface Game {
  selectedLevel: Level;
  gameState: STATES;
  readonly matrix: Field[][];

  updateGameState(event: GameState): void;
}

export interface Menu {
  id: string
}
