import { Injectable } from '@angular/core';
import { Field, SYMBOLS } from '../interfaces/field.interface';

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

  get toDiscoverPerc(): number {
    return (100 * this._toDiscover) / this._discovered;
  }

  constructor() { }

  public init(inputMatrix: Field[][]): void {
    inputMatrix.forEach(row => {
      row.forEach(cell => {
        this._toDiscover = cell.value != SYMBOLS.MINE ? this._toDiscover++ : this._toDiscover;
      })
    });
  }

  public increment(): number {
    this._discovered++;
    return this._discovered;
  }
}
