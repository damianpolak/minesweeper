import { Component, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../core/interfaces/game.interface';
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
export class GameComponent implements Game, OnInit {
  selectedLevel: Level;
  gameState: STATES;

  constructor(
    public score: ScoreService,
    public timer: TimerService
  ) {
    this.selectedLevel = Global.getLevel(LEVELS.LOW);
    this.score.init(this.selectedLevel);
    this.gameState = STATES.NOT_STARTED;
    this.matrix = [];
  }

  ngOnInit(): void {
  }

  public readonly matrix: Field[][];

  public messageEnabled: boolean = false;
  public message: string = '';

  public updateGameState(state: GameState): void {
    this.gameState = state.current;

    switch(this.gameState) {
      case STATES.NOT_STARTED: {
        console.log(`=== NOT_STARTED`);
        this.messageEnabled = false;
        this.timer.restart();
        this.score.reset();
        this.score.init(this.selectedLevel);
      } break;
      case STATES.FIRST_CLICK: {
        this.timer.start();
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
        this.timer.stop();
      }
    }
  }

  public onNewGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  public onClickNewGame(): void {
    console.log(`=== newGame()`);
    this.onNewGame.emit(true);
  }

  public onClickSelectLevel(level: string): void {
    console.log(`=== selectLevel`, level);
    this.selectedLevel = Global.getLevel(level);
  }

  public menuLevels(): Array<{ id: string }> {
    return Object.keys(LEVELS).map(item => {
      return {
        id: item
      }
    })
  }
}
