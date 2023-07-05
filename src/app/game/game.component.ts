import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, OnChanges, OnInit, ViewChild } from '@angular/core';
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
export class GameComponent implements Game, OnInit {
  selectedLevel: Level;
  gameState: STATES;
  // finished: boolean;

  // private _boardResizeObserver?: ResizeObserver;
  public oneWidth: number = 0;

  constructor(
    public score: ScoreService,
    public timer: TimerService,
    private _globalService: GlobalService
  ) {
    this.selectedLevel = Global.getLevel(LEVELS.LOW);
    this.score.init(this.selectedLevel);
    this.gameState = STATES.NOT_STARTED;
    // this.finished = false;
    this.matrix = [];

    // screen.orientation.addEventListener('change', (event) => {
    //   this._screenOrientation = (<ScreenOrientation>event.target).type;
    //   this.selectedLevel = this._rotate(this._screenOrientation, this.selectedLevel);
    //   this._globalService.orientation = this._screenOrientation;
    // });

    // this._boardResizeObserver = new ResizeObserver(entries => {
    //   entries.forEach(entry => {
    //     this.oneWidth = entry.contentRect.width;
    //     console.log("width", entry.contentRect.width);
    //     console.log("width", entry.contentRect.width);
    //     console.log("height", entry.contentRect.height);
    //   });
    // });
  }

  ngOnInit(): void {
    // this._boardResizeObserver?.observe((<Element>(document.querySelector(".board"))));
  }

  public readonly matrix: Field[][];
  // private _screenOrientation: OrientationType = 'landscape-primary';

  public messageEnabled: boolean = false;
  public message: string = '';

  public updateGameState(state: GameState): void {
    console.log(`=== state`, state);
    this.gameState = state.current;

    switch(this.gameState) {
      case STATES.NOT_STARTED: {
        console.log(`=== NOT_STARTED`);
        this.messageEnabled = false;
        this.timer.restart();
        this.score.reset();
        // this.score.init(this.selectedLevel);
      } break;
      case STATES.FIRST_CLICK: {
        this.timer.start();
        console.log(`=== FIRST CLICK`);
        // this.score.init(this.selectedLevel);
      } break;
      case STATES.WIN: {
        console.log(`=== WIN`);
        this.message = 'You win!';
        this.messageEnabled = true;
        this.timer.stop();
        this.score.reset();
      } break;
      case STATES.LOSE: {
        console.log(`=== LOSE`);
        this.messageEnabled = true;
        this.message = 'You lose!';
        this.timer.restart();
        this.score.reset();
      }
    }
  }

  // public updateGameScore(addr: Address): void {
  //   // this.score.increment();

  //   // if(this.score.discoveredPerc == 100) {
  //   //   console.log(`=== updateGameScore`, this.score.discoveredPerc);
  //   //   this.finished = true;

  //   //   this.messageEnabled = true;
  //   // }
  // }

  public updateMinesFlagged(marked: boolean): void {
    // console.log(`=== updateMinesFlagged`, marked);
    // switch(marked) {
    //   case true: { this.score.flagIncrement(); } break;
    //   case false: { this.score.flagDecrement(); } break;
    // }
  }

  public onNewGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  public onClickNewGame(): void {
    console.log(`=== newGame()`);
    this.onNewGame.emit(true);

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

  public menuLevels(): Array<{ id: string }> {
    return Object.keys(LEVELS).map(item => {
      return {
        id: item
      }
    })
  }
}
