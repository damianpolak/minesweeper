import { Component, EventEmitter } from '@angular/core';
import { Game, Menu } from '../core/interfaces/game.interface';
import { GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Global } from '../core/classes/global.class';
import { Field } from '../core/interfaces/field.interface';
import { ScoreService } from '../core/services/score.service';
import { TimerService } from '../core/services/timer.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements Game {
  selectedLevel: Level;
  gameState: STATES;

  public readonly matrix: Field[][];
  public onNewGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  public messageEnabled: boolean = false;
  public message: string = '';

  constructor(
    public score: ScoreService,
    public timer: TimerService
  ) {
    this.selectedLevel = Global.getLevel(LEVELS.LOW);
    this.score.init(this.selectedLevel);
    this.gameState = STATES.NOT_STARTED;
    this.matrix = [];
  }

  /**
   * Update game state, reset score and timer.
   */
  public updateGameState(state: GameState): void {
    this.gameState = state.current;

    switch(this.gameState) {
      case STATES.NOT_STARTED: {
        this.messageEnabled = false;
        this.timer.restart();
        this.score.reset();
        this.score.init(this.selectedLevel);
      } break;
      case STATES.FIRST_CLICK: {
        this.timer.start();
      } break;
      case STATES.WIN: {
        this.message = 'You win!';
        this.messageEnabled = true;
        this.timer.stop();
        this.score.reset();
      } break;
      case STATES.LOSE: {
        this.messageEnabled = true;
        this.message = 'You lose!';
        this.timer.stop();
      }
    }
  }

  /**
   * Fires when user click new game and emit new game to board component.
   */
  public onClickNewGame(): void {
    this.onNewGame.emit(true);
  }

  /**
   * Fires when user select level.
   */
  public onClickSelectLevel(level: string): void {
    this.selectedLevel = Global.getLevel(level);
  }

  /**
   * Returns builded menu levels.
   */
  public menuLevels(): Menu[] {
    return Object.keys(LEVELS).map(item => {
      return {
        id: item
      }
    })
  }
}
