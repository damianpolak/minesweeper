import { Component, EventEmitter } from '@angular/core';
import { Game, Menu } from '../core/interfaces/game.interface';
import { GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Global } from '../core/classes/global.class';
import { Field } from '../core/interfaces/field.interface';
import { ScoreService } from '../core/services/score.service';
import { TimerService } from '../core/services/timer.service';
import { TableScoreService } from '../core/services/table-score.service';
import { FaceService } from '../core/services/face.service';
import { GlobalService } from '../core/services/global.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements Game {
  selectedLevel: Level;
  // gameState: STATES;

  public readonly matrix: Field[][];
  public onNewGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  public messageEnabled: boolean = false;
  public message: string = '';
  // public message2: string = 'Play again?';
  public displayMenu: boolean = false;
  public loaded: boolean = false;

  constructor(
    public score: ScoreService,
    public timer: TimerService,
    public face: FaceService,
    public global: GlobalService,
    private _tableScore: TableScoreService
  ) {
    this.global.initConfig();
    this.selectedLevel = Global.getLevel(this.global.level);
    this.score.init(this.selectedLevel);
    this.global.gameState = STATES.NOT_STARTED;
    this.matrix = [];
    console.log(`=== constructor`);
  }

  /**
   * Update game state, reset score and timer.
   */
  public updateGameState(state: GameState): void {
    this.global.gameState = state.current;

    switch(this.global.gameState) {
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
        this.face.onFaceWinner();

        this._tableScore.add({
          type: 'LOSE',
          level: this.selectedLevel.name,
          time: Number(this.timer.count),
          scorePerc: this.score.discoveredPerc,
          timestamp: new Date()
        });
      } break;
      case STATES.LOSE: {
        this.messageEnabled = true;
        this.message = 'You lose!';
        this.timer.stop();
        this.face.onFaceLoser();

        this._tableScore.add({
          type: 'LOSE',
          level: this.selectedLevel.name,
          time: Number(this.timer.count),
          scorePerc: this.score.discoveredPerc,
          timestamp: new Date()
        });
      }
    }
  }

  /**
   * Fires when user click new game and emit new game to board component.
   */
  public onClickNewGame(): void {
    this.face.onFaceSmile();
    this.onNewGame.emit(true);
  }

  /**
   * Fires when user select level.
   */
  public onClickSelectLevel(level: string): void {
    this.global.level = level as LEVELS;
    this.selectedLevel = Global.getLevel(this.global.config.level);
    setTimeout(() => {
      this.onNewGame.emit(true);
      this.displayMenu = false;
    });
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

  public toggleMenu(): void {
    this.displayMenu = !this.displayMenu;
  }

  public assetsLoaded(value: boolean): void {
    this.loaded = value;
  }
}
