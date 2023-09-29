import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Address, Field, SYMBOLS } from '../core/interfaces/field.interface';
import { Global } from '../core/classes/global.class';
import { ScoreService } from '../core/services/score.service';
import { TestCase } from '../core/interfaces/board.interface';
import { GlobalService } from '../core/services/global.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  @Input() level: Level = Global.getLevel(LEVELS.LOW);
  @Input() newGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onGameStateChange = new EventEmitter<GameState>();

  public boardReady: boolean = false;
  public matrix: Field[][] = [];
  private _gameState: STATES = STATES.NOT_STARTED;
  private _col: number = 0;
  private _row: number = 0;
  public addressClicked: Address = { row: 0, col: 0};

  constructor(
    public global: GlobalService,
    private _score: ScoreService
  ) {}

  ngOnInit(): void {
    this._initializeBoard();

    this.newGame.subscribe(result => {
      this.startNewGame();
    })
  }

  /**
   * Fires when user launch new game.
   */
  public startNewGame(): void {
    this._initializeBoard();
    this.setGameState(STATES.NOT_STARTED);
  }

  /**
   * Initialize new board. Created matrix, sets mines and game state.
   */
  private _initializeBoard(): void {
    if(this.level == undefined) {
      this.boardReady = false;
      throw new Error(`The board could not be initialized.`);
    }

    this.matrix = [];
    this._col = this.level.col;
    this._row = this.level.row;

    for(let row = 0; row <= this._row - 1; row++) {
      this.matrix.push([]);
      for(let col = 0; col <= this._col - 1; col++) {
        this.matrix[row][col] = {
          value: SYMBOLS.NONE,
          discovered: false,
          marked: false,
          addr: { row: row, col: col },
          hint: false
        }
      }
    }

    this._setMines(this.level.mines);
    this.setGameState(STATES.NOT_STARTED);
    this._score.init(this.level);
    this.boardReady = true;
  }

  /**
   * Set and emit to output game state.
   */
  public setGameState(state: STATES): GameState {
    let result: GameState = { before: this._gameState, current: state };
    this._gameState = state;
    this.onGameStateChange.emit(result);
    return result;
  }

  /**
   * Get game state.
   */
  public getGameState(): STATES {
    return this._gameState;
  }

  /**
   * Recursively sets mines to randomized localization of matrix fields.
   * Returns addresses of mined fields.
   */
  private _setMines(mines: number, addresses: Address[] = []): Address[] {
    if (mines != 0) {
      const randomRow = Math.floor(Math.random() * this.level?.row);
      const randomCol = Math.floor(Math.random() * this.level?.col);
      if (this.matrix[randomRow][randomCol].value != SYMBOLS.MINE) {
        this.matrix[randomRow][randomCol].value = SYMBOLS.MINE;
        this.matrix[randomRow][randomCol].discovered = false;
        return this._setMines(--mines, [...addresses, ...[{row: randomRow, col: randomCol}]]);
      } else {
        return this._setMines(mines, addresses);
      }
    }
    return addresses;
  }

  /**
   * Fires when player click left button mouse on field.
   */
  public onPlayerClick(event: any, field: Field): void {
    if(![STATES.LOSE, STATES.WIN].includes(this.getGameState())) {
      if(!this.global.flagMode) {
        if(!field.discovered && !field.marked) {
          this.addressClicked = { row: field.addr.row, col: field.addr.col };
          this.playerClick(this.addressClicked);
        }
      } else {
        this.onPlayerRightClick(event, field);
      }
    }
  }

  /**
   * Fires when player click right button mouse on field (flag marking).
   */
  public onPlayerRightClick(event: any, field: Field): void {
    event.preventDefault();
    if(this.getGameState() != STATES.LOSE && !field.discovered) {
      this._toggleFieldAsMarked(field);
    }
  }

  /**
   * Group of methods when player click on field.
   * Recognizing states and launch other methods to calculate or discover fields.
   */
  private playerClick(addr: Address): any {
    if (this.getGameState() === STATES.NOT_STARTED) {
      this._firstClick(addr);
      return this.playerClick(addr);
    }

    if (this.getGameState() === STATES.FIRST_CLICK) {
      this.setGameState(STATES.RUNNING);
    }

    if (this.getGameState() === STATES.RUNNING) {
      if (this._isFieldMined(addr.row, addr.col)) {
        this.matrix[addr.row][addr.col].value = SYMBOLS.MINERED;
        this._discoverMinedFields();
        this.setGameState(STATES.LOSE);
      }

      if (this._isFieldEmpty(addr.row, addr.col)) {
        this._discoverEmptyFields(addr.row, addr.col);
      }

      if (this._isFieldNumbered(addr.row, addr.col)) {
        this._discoverNumberedFields(addr.row, addr.col);
      }

      if(this._score.discoveredPerc >= 100) {
        this.setGameState(STATES.WIN);
      }
    }
  }

  /**
   * Action when user first click on matrix field.
   * Calculating mines and moving mine when is on first click addr.
   */
  private _firstClick(addr: Address): boolean {
    if (this.matrix[addr.row][addr.col].value !== SYMBOLS.MINE) {
      this._calcMinesAround({ row: this.level.row, col: this.level.col });
      this.setGameState(STATES.FIRST_CLICK);
      return true;
    } else {
      this._moveMine(addr.row, addr.col);
      this._calcMinesAround({ row: this.level.row, col: this.level.col });
      this.setGameState(STATES.FIRST_CLICK);
      return false;
    }
  };

  /**
   * Move mine to other address when user first click at mine field.
   * This action prevents the player from losing on the first click
   */
  private _moveMine(sourceRow: number, sourceCol: number): Address {
    let destRow = Math.floor(Math.random() * this.level.row);
    let destCol = Math.floor(Math.random() * this.level.col);
    if (this.matrix[destRow][destCol].value === SYMBOLS.NONE) {
      this.matrix[sourceRow][sourceCol].value = SYMBOLS.NONE;
      this.matrix[destRow][destCol].value = SYMBOLS.MINE;
    } else {
      return this._moveMine(sourceRow, sourceCol);
    }

    return { row: destRow, col: destCol };
  };

  /**
   * Recursive calculate mines number around numbered field.
   */
  private _calcMinesAround(addr: Address): void {
    const x = addr.row;
    const y = addr.col;

    for (let i = 0; i <= x - 1; i++) {
      for (let j = 0; j <= y - 1; j++) {
        if (this.matrix[i][j].value === SYMBOLS.MINE) {
          const cases: TestCase = this._testCases(i, j);

          for (const c in cases) {
            const testCase = this._examineMatrixEdges(cases[c].row, cases[c].col);

            if (testCase) {
              this._increaseNumber(cases[c].row, cases[c].col);
            }
          }
        }
      }
    }
  };

  /**
   * Examine matrix edges and return boolean if the given values are not within the calculated range.
   * Returns boolean.
   */
  private _examineMatrixEdges(row: number, col: number): boolean {
    return row != -1 && col != -1 && row < this.level.row && col < this.level.col ? true : false;
  };

  /**
   * Increase number of numbered field.
   */
  private _increaseNumber(x: number, y: number): void {
    if (this.matrix[x][y].value !== SYMBOLS.MINE) {
      (<number>this.matrix[x][y].value)++;
    }
  }

  /**
   * Checks whether a field is mined and returns a boolean.
   */
  private _isFieldMined(x: number, y: number): boolean {
    return this.matrix[x][y].value === SYMBOLS.MINE ? true : false;
  };

  /**
   * Checks whether a field is empty and returns a boolean.
   */
  private _isFieldEmpty(x: number, y: number): boolean {
    return this.matrix[x][y].value == SYMBOLS.NONE ? true : false;
  };

  /**
   * Checks whether a field is numbered and returns a boolean.
   */
  private _isFieldNumbered(x: number, y: number): boolean {
    if (
      this.matrix[x][y].value != SYMBOLS.NONE &&
      this.matrix[x][y].value != SYMBOLS.MINE &&
      this._isFieldDiscovered(x, y) == false
    ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Checks whether a field is discovered and returns a boolean.
   */
  private _isFieldDiscovered(x: number, y: number): boolean {
    return this.matrix[x][y].discovered ? true : false;
  };

  /**
   * Checks whether a field is flag marked and returns a boolean.
   */
  private _isFieldMarked(x: number, y: number): boolean {
    return this.matrix[x][y].marked;
  }

  /**
   * Discovers numbered fields connected to other fields.
   */
  private _discoverNumberedFields(x: number, y: number): number[] {
    this.matrix[x][y].discovered = true;

    if(this._isFieldMarked(x, y)) {
      this.matrix[x][y].marked = false;
      this._score.flagDecrement();
    }

    this._score.increment();
    return [x, y];
  };

  /**
   * Red flag toggling on field.
   */
  private _toggleFieldAsMarked(field: Field): void {
    this.matrix.forEach(row => {
      row.forEach(cell => {
        if(cell.addr === field.addr) {
          cell.marked = cell.marked ? false : true;

          if(cell.marked) {
            this._score.flagIncrement();
          } else {
            this._score.flagDecrement();
          }
        }
      })
    })
  }

  /**
   * Cases of mine location around clicked field.
   */
  private _testCases (row: number, col: number): TestCase {
    return {
      case_a: { row: row - 1, col: col - 1 },
      case_b: { row: row, col: col - 1 },
      case_c: { row: row + 1, col: col - 1 },
      case_d: { row: row - 1, col: col },
      case_e: { row: row, col: col },
      case_f: { row: row + 1, col: col },
      case_g: { row: row - 1, col: col + 1 },
      case_h: { row: row, col: col + 1 },
      case_i: { row: row + 1, col: col + 1 },
    };
  };

  /**
   * Clicked on empty field recursively discovers other empty fields.
   */
  private _discoverEmptyFields(x: number, y: number): void {
    if (this._examineMatrixEdges(x, y)) {
      if (this.matrix[x][y].value == 0 && this._isFieldDiscovered(x, y) == false) {
        this.matrix[x][y].discovered = true;

        if(this._isFieldMarked(x, y)) {
          this.matrix[x][y].marked = false;
          this._score.flagDecrement();
        }

        this._score.increment();
        Object.values(this._testCases(x, y)).forEach(item => this._discoverEmptyFields(item.row, item.col));
      } else if (
        this.matrix[x][y].value != SYMBOLS.NONE &&
        this._isFieldNumbered(x, y) == true &&
        this._isFieldDiscovered(x, y) == false
      ) {
        this._discoverNumberedFields(x, y);
      }
    }
  };

  /**
   * Just discovers mined files (when game finished).
   */
  private _discoverMinedFields(): void {
    this.matrix.forEach(row => {
      row.forEach(cell => {
        if(!cell.marked && cell.value == SYMBOLS.MINE) {
          cell.discovered = true;
        }
      })
    })
  }
}
