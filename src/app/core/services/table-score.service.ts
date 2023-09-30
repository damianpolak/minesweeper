import { Injectable } from '@angular/core';
import { Score } from '../interfaces/score.interface';

@Injectable({
  providedIn: 'root'
})
export class TableScoreService {

  private _storageKey = 'minesweeper-tablescore';

  constructor(){ }

  public add(data: Score): void {
    const score = this.get();

    if(score.length > 0) {
      localStorage.setItem(this._storageKey, JSON.stringify([...score, ...[data]]));
    } else {
      localStorage.setItem(this._storageKey, JSON.stringify([data]));
    }
  }

  public get(): Score[] {
    const local = localStorage.getItem(this._storageKey);

    if(local == null) {
      return [];
    } else {
      return JSON.parse(local) as Score[];
    }
  }
}
