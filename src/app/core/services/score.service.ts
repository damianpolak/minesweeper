import { Injectable } from '@angular/core';
import { Field, SYMBOLS } from '../interfaces/field.interface';
import { LEVELS, Level } from '../interfaces/global.interface';
import { Global } from '../classes/global.class';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _discovered: number = 0;
  private _toDiscover: number = 0;

  get discovered(): number {
    return this._discovered;
  }

  get toDiscover(): number {
    return this._toDiscover;
  }

  get discoveredPerc(): number {
    return Math.round((100 * this._discovered) / this._toDiscover);
  }

  constructor() { }

  public init(level: Level): void {
    const selectedLevel = level;
    this._toDiscover = (selectedLevel.row * selectedLevel.col) - selectedLevel.mines;
  }

  public increment(): number {
    this._discovered++;
    return this._discovered;
  }
}