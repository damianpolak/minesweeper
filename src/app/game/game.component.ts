import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Game } from '../core/interfaces/game.interface';
import { GameScore, GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Global } from '../core/classes/global.class';
import { Address, Field } from '../core/interfaces/field.interface';
import { ScoreService } from '../core/services/score.service';
import { TimerService } from '../core/services/timer.service';
import { GlobalService } from '../core/services/global.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements Game {
  selectedLevel: Level;
  gameState: STATES;
  finished: boolean;

  constructor(
    public score: ScoreService,
    public timer: TimerService,
    private _globalService: GlobalService
  ) {
    this.selectedLevel = Global.getLevel(LEVELS.LOW);
    this.score.init(this.selectedLevel);
    this.gameState = STATES.NOT_STARTED;
    this.finished = false;
    this.matrix = [];

    screen.orientation.addEventListener('change', (event) => {
      this._screenOrientation = (<ScreenOrientation>event.target).type;
      this.selectedLevel = this._rotate(this._screenOrientation, this.selectedLevel);
      this._globalService.orientation = this._screenOrientation;
    });
  }


  public readonly matrix: Field[][];
  private _screenOrientation: OrientationType = 'landscape-primary';

  public updateGameState(state: GameState): void {
    this.gameState = state.current;

    switch(this.gameState) {
      case STATES.FIRST_CLICK: {
        this.timer.start();
      } break;
      case STATES.WIN: {
        this.timer.stop();
      } break;
      case STATES.LOSE: {
        this.timer.stop();
      }
    }
  }

  public updateGameScore(addr: Address): void {
    this.score.increment();

    if(this.score.discoveredPerc == 100) {
      this.finished = true;
    }
  }

  public updateMinesFlagged(marked: boolean): void {
    console.log(`=== updateMinesFlagged`, marked);
    switch(marked) {
      case true: { this.score.flagIncrement(); } break;
      case false: { this.score.flagDecrement(); } break;
    }
  }

  private _rotate(type: OrientationType, level: Level): Level {
    console.log(`=== rotate`, type, level);
    const portrait = {
      row: Global.getLevel(level.name).col,
      col: Global.getLevel(level.name).row,
      mines: Global.getLevel(level.name).mines,
      name: level.name
    };

    const landscape = {
      row: Global.getLevel(level.name).row,
      col: Global.getLevel(level.name).col,
      mines: Global.getLevel(level.name).mines,
      name: level.name
    };

    switch(type.split('-')[0]) {
      case 'portrait': return portrait;
      case 'landscape': return landscape;
      default: return landscape;
    }
  }
}
