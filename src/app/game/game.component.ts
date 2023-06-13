import { Component } from '@angular/core';
import { Game } from '../core/interfaces/game.interface';
import { GameScore, GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Global } from '../core/classes/global.class';
import { Address, Field } from '../core/interfaces/field.interface';
import { ScoreService } from '../core/services/score.service';
import { TimerService } from '../core/services/timer.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements Game {
  selectedLevel: Level;
  gameState: STATES;
  finished: boolean;

  constructor(
    public score: ScoreService,
    public timer: TimerService
  ) {
    this.selectedLevel = Global.getLevel(LEVELS.TEST);
    this.score.init(this.selectedLevel);
    this.gameState = STATES.NOT_STARTED;
    this.finished = false;
    this.matrix = [];

    // this._timer.start();
  }

  public readonly matrix: Field[][];

  public updateGameState(state: GameState): void {
    this.gameState = state.current;

    switch(this.gameState) {
      case STATES.FIRST_CLICK: {
        this.timer.start();
      } break;
      case STATES.WIN: {
        this.timer.stop();
      } break;
    }
  }

  public updateGameScore(addr: Address): void {
    this.score.increment();

    if(this.score.discoveredPerc == 100) {
      this.finished = true;
    }
  }

  onStartTimer(): void {
    this.timer.start();
  }

  onStopTimer(): void {
    this.timer.stop();

  }

}
