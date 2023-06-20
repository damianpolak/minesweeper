import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GameState, LEVELS, Level, STATES } from '../core/interfaces/global.interface';
import { Address, Field, SYMBOLS } from '../core/interfaces/field.interface';
import { Global } from '../core/classes/global.class';
import { GlobalService } from '../core/services/global.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() level: Level = { name: LEVELS.LOW, row: 10, col: 10, mines: 5 };
  @Input() finished: boolean = false;
  @Output() onGameStateChange = new EventEmitter<GameState>();
  @Output() onDiscoverCell = new EventEmitter<Address>();
  @Output() onMarkCell = new EventEmitter<boolean>();

  public boardReady: boolean = false;
  public matrix: Field[][] = [];
  private _gameState: STATES = STATES.NOT_STARTED;
  private _col: number = 0;
  private _row: number = 0;
  public addressClicked: Address = { row: 0, col: 0};

  constructor(private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this._initializeBoard();
  }

  ngOnChanges(simpleChange: SimpleChanges): void {
    if('finished' in simpleChange) {
      this.setGameState(STATES.WIN);
    }
  }

  private _initializeBoard(): void {
    if(this.level == undefined) {
      this.boardReady = false;
      throw new Error(`The board could not be initialized.`);
    }

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

    this.boardReady = true;
  }

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

  public setGameState(state: STATES): GameState {
    let result: GameState = { before: this._gameState, current: state };
    this._gameState = state;
    this.onGameStateChange.emit(result);
    return result;
  }

  public getGameState(): STATES {
    return this._gameState;
  }

  public onPlayerClick(event: any, field: Field): void {
  // public onPlayerClick(event: any, obj: Field,row: number, col: number): void {
    if(!this.finished && this.getGameState() != STATES.LOSE) {
      if(!field.discovered && !field.marked) {
        this.addressClicked = { row: field.addr.row, col: field.addr.col };
        this.playerClick(this.addressClicked);
      }
    }
  }

  private playerClick(addr: Address): any {
    if (this.getGameState() === STATES.NOT_STARTED) {
      this.firstClick(addr);
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
        this.discoverEmptyFields(addr.row, addr.col);
      }

      if (this._isFieldNumbered(addr.row, addr.col)) {
        this.discoverNumberedFields(addr.row, addr.col);
      }
    }
  }

  public onPlayerRightClick(event: any, field: Field): void {
    event.preventDefault();
    if(this.getGameState() != STATES.LOSE && !field.discovered) {
      this._toggleFieldAsMarked(field);
    }
  }

  public firstClick(addr: Address): boolean {
    if (this.matrix[addr.row][addr.col].value !== SYMBOLS.MINE) {
      this.calcMinesAround({ row: this.level.row, col: this.level.col });
      this.setGameState(STATES.FIRST_CLICK);
      return true;
    } else {
      this.moveMine(addr.row, addr.col);
      this.calcMinesAround({ row: this.level.row, col: this.level.col });
      this.setGameState(STATES.FIRST_CLICK);
      return false;
    }
  };

  public moveMine(sourceRow: number, sourceCol: number): Address {
    let destRow = Math.floor(Math.random() * this.level.row);
    let destCol = Math.floor(Math.random() * this.level.col);
    if (this.matrix[destRow][destCol].value === SYMBOLS.NONE) {
      this.matrix[sourceRow][sourceCol].value = SYMBOLS.NONE;
      this.matrix[destRow][destCol].value = SYMBOLS.MINE;
    } else {
      return this.moveMine(sourceRow, sourceCol);
    }

    return { row: destRow, col: destCol };
  };

  public calcMinesAround(addr: Address) {
    const x = addr.row;
    const y = addr.col;


    for (let i = 0; i <= x - 1; i++) {
      for (let j = 0; j <= y - 1; j++) {
        if (this.matrix[i][j].value === SYMBOLS.MINE) {
          let cases: any = this.testCases(i, j);

          for (const c in cases) {
            let testCase = this.testMatrixEdges(cases[c].x, cases[c].y);

            if (testCase) {
              this.increaseNumber(cases[c].x, cases[c].y);
            }
          }
        }
      }
    }
  };

  public testCases (row: number, col: number) {
    return {
      case_a: { x: row - 1, y: col - 1 },
      case_b: { x: row, y: col - 1 },
      case_c: { x: row + 1, y: col - 1 },
      case_d: { x: row - 1, y: col },
      case_e: { x: row, y: col },
      case_f: { x: row + 1, y: col },
      case_g: { x: row - 1, y: col + 1 },
      case_h: { x: row, y: col + 1 },
      case_i: { x: row + 1, y: col + 1 },
    };
  };

  public testMatrixEdges(row: number, col: number): boolean {
    return row != -1 && col != -1 && row < this.level.row && col < this.level.col ? true : false;
  };

  public increaseNumber(x: number, y: number): void {
    if (this.matrix[x][y].value !== SYMBOLS.MINE) {
      (<number>this.matrix[x][y].value)++;
    }
  }

  private _isFieldMined(x: number, y: number): boolean {
    return this.matrix[x][y].value === SYMBOLS.MINE ? true : false;
  };

  private _isFieldEmpty(x: number, y: number): boolean {
    return this.matrix[x][y].value == SYMBOLS.NONE ? true : false;
  };

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

  private _isFieldDiscovered(x: number, y: number): boolean {
    // return this.matrix[x][y].value.toString().includes('d') ? true : false;
    return this.matrix[x][y].discovered ? true : false;
  };

  private _isFieldMarked(x: number, y: number): boolean {
    return this.matrix[x][y].marked;
  }

  public discoverNumberedFields(x: number, y: number) {
    this.matrix[x][y].discovered = true;

    if(this._isFieldMarked(x, y)) {
      this.matrix[x][y].marked = false;
      this.onMarkCell.emit(this.matrix[x][y].marked);
    }

    this.onDiscoverCell.emit({ row: x, col: y });

    return [x, y];
  };

  private _toggleFieldAsMarked(field: Field): void {
    this.matrix.forEach(row => {
      row.forEach(cell => {
        if(cell.addr === field.addr) {
          cell.marked = cell.marked ? false : true;
          this.onMarkCell.emit(cell.marked);
        }
      })
    })
  }

  public discoverEmptyFields(x: number, y: number): void {
    if (this.testMatrixEdges(x, y)) {
      if (this.matrix[x][y].value == 0 && this._isFieldDiscovered(x, y) == false) {
        this.matrix[x][y].discovered = true;

        if(this._isFieldMarked(x, y)) {
          this.matrix[x][y].marked = false;
          this.onMarkCell.emit(this.matrix[x][y].marked);
        }

        this.onDiscoverCell.emit({ row: x, col: y });

        /*
          case_a: { x: x - 1, y: y - 1 },
          case_b: { x: x, y: y - 1 },
          case_c: { x: x + 1, y: y - 1 },
          case_d: { x: x - 1, y: y },
          case_e: { x: x, y: y },
          case_f: { x: x + 1, y: y },
          case_g: { x: x - 1, y: y + 1 },
          case_h: { x: x, y: y + 1 },
          case_i: { x: x + 1, y: y + 1 },
        */
        this.discoverEmptyFields(x - 1, y); // case_d: { x: x - 1, y: y },
        this.discoverEmptyFields(x + 1, y); // case_f: { x: x + 1, y: y },
        this.discoverEmptyFields(x, y + 1); // case_h: { x: x, y: y + 1 },

        this.discoverEmptyFields(x, y - 1); // case_b: { x: x, y: y - 1 },
        this.discoverEmptyFields(x - 1, y + 1); // case_g: { x: x - 1, y: y + 1 },
        this.discoverEmptyFields(x + 1, y + 1); // case_i: { x: x + 1, y: y + 1 },

        this.discoverEmptyFields(x - 1, y - 1); //       case_a: { x: x - 1, y: y - 1 },
        this.discoverEmptyFields(x + 1, y - 1); // case_c: { x: x + 1, y: y - 1 },
      } else if (
        this.matrix[x][y].value != SYMBOLS.NONE &&
        this._isFieldNumbered(x, y) == true &&
        this._isFieldDiscovered(x, y) == false
      ) {
        this.discoverNumberedFields(x, y);
      }
    }
  };

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
