import { Injectable } from '@angular/core';
import { Level } from '../interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _discovered: number = 0;
  private _toDiscover: number = 0;
  private _mines: number = 0;
  private _flags: number = 0;

  get discovered(): number {
    return this._discovered;
  }

  get toDiscover(): number {
    return this._toDiscover;
  }

  get discoveredPerc(): number {
    return Math.round((100 * this._discovered) / this._toDiscover);
  }

  get mines(): number {
    return this._mines - this._flags;
  }

  constructor() { }

  public init(level: Level): void {
    const selectedLevel = level;
    this._toDiscover = (selectedLevel.row * selectedLevel.col) - selectedLevel.mines;
    this._mines = level.mines;
  }

  public increment(): number {
    this._discovered++;
    return this._discovered;
  }

  public flagIncrement(): number {
    this._flags++;
    return this._flags;
  }

  public flagDecrement(): number {
    this._flags--;
    return this._flags;
  }
}
