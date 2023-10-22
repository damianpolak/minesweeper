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
import { AssetsManagerService } from '../core/services/assets-manager.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements Game {
  selectedLevel: Level;

  public readonly matrix: Field[][];
  public onNewGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  public modalMessageVisible: boolean = false;
  public modalLevelMenuVisible: boolean = false;
  public endGameMessage: string = '';
  public displayMenu: boolean = false;

  constructor(
    public score: ScoreService,
    public timer: TimerService,
    public face: FaceService,
    public global: GlobalService,
    public assets: AssetsManagerService,
    private _tableScore: TableScoreService
  ) {
    this.global.initConfig();
    this.selectedLevel = Global.getLevel(this.global.level);
    this.score.init(this.selectedLevel);
    this.global.gameState = STATES.NOT_STARTED;
    this.matrix = [];
    this.face.onFaceSmile();
  }

  /**
   * Update game state, reset score and timer.
   */
  public updateGameState(state: GameState): void {
    this.global.gameState = state.current;

    const scoreTable = {
      level: this.selectedLevel.name,
      time: Number(this.timer.count),
      flagClicks: this.score.flagClicks,
      discoverClicks: this.score.discoverClicks,
      scorePerc: this.score.discoveredPerc,
      timestamp: new Date()
    };

    switch(this.global.gameState) {
      case STATES.NOT_STARTED: {
        this.modalMessageVisible = false;
        this.timer.restart();
        this.score.reset();
        this.score.init(this.selectedLevel);
      } break;
      case STATES.FIRST_CLICK: {
        this.timer.start();
      } break;
      case STATES.WIN: {
        this.endGameMessage = 'You win!';
        this.modalMessageVisible = true;
        this.timer.stop();
        this.face.onFaceWinner();
        this._tableScore.add({...{ type: 'WIN'}, ...scoreTable});
      } break;
      case STATES.LOSE: {
        this.modalMessageVisible = true;
        this.endGameMessage = 'You lose!';
        this.timer.stop();
        this.face.onFaceLoser();
        this._tableScore.add({...{ type: 'LOSE'}, ...scoreTable});
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
      this.modalLevelMenuVisible = false;
      this.onNewGame.emit(true);
      // this.displayMenu = false;
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

  public toggleMenuLevel(): void {
    // this.displayMenu = !this.displayMenu;
    this.modalLevelMenuVisible = !this.modalLevelMenuVisible;
  }

  public toggleFlagMode(): void {
    this.global.flagMode = !this.global.flagMode;
    console.log(`=== toggleFlagMode is `, this.global.flagMode);
  }

  public toggleTableScore(): void {
    throw ('Not yet implemented!');
  }

  public onMenuLevelClose(): void {
    this.modalLevelMenuVisible = false;
  }
}
