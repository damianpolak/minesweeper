import { Field } from "./field.interface";
import { GameState, Level, STATES } from "./global.interface";

export interface Game {
  selectedLevel: Level;
  readonly matrix: Field[][];

  updateGameState(event: GameState): void;
}

export interface Menu {
  id: string
}

export type Face = 'smile' | 'ooo' | 'winner' | 'loser';
