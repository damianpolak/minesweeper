import { Component } from '@angular/core';
import { Game } from '../core/interfaces/game.interface';
import { GameScore, GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Global } from '../core/classes/global.class';
import { Field } from '../core/interfaces/field.interface';
import { ScoreService } from '../core/services/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements Game {
  selectedLevel: Level;
  gameState: STATES;

  constructor(public score: ScoreService) {
    this.selectedLevel = Global.getLevel(LEVELS.LOW);
    this.gameState = STATES.NOT_STARTED;
    this.discovered = 0;
    this.toDiscover = 0;
    this.matrix = [];
  }

  public readonly matrix: Field[][];

  public discovered: number;
  public toDiscover: number;

  public updateGameState(state: GameState): void {
    this.gameState = state.current;
    console.log(`=== updateGameState`, state);
  }

  public updateGameScore(event: Field[][]): void {
    console.log(`=== updateGameScore`, event);
  }

}
