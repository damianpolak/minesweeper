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
  private _flagClicks: number = 0;
  private _discoverClicks: number = 0;

  constructor() { }

  get discovered(): number {
    return this._discovered;
  }

  get toDiscover(): number {
    return this._toDiscover;
  }

  get discoveredPerc(): number {
    return (100 * this._discovered) / this._toDiscover;
  }

  get mines(): string {
    return String(this._mines - this._flags).padStart(3, '0');
  }

  get flagClicks(): number {
    return this._flagClicks;
  }

  get discoverClicks(): number {
    return this._discoverClicks;
  }

  /**
   * Just inits score.
   */
  public init(level: Level): void {
    const selectedLevel = level;
    this._toDiscover = (selectedLevel.row * selectedLevel.col) - selectedLevel.mines;
    this._mines = level.mines;
  }

  /**
   * Increments score.
   */
  public increment(): number {
    this._discovered++;
    return this._discovered;
  }


  /**
   * Increments flag clicks counter.
   */
  public flagClickIncrement(): number {
    this._flagClicks++;
    return this._flagClicks;
  }

  /**
   * Increments discover clicks counter.
   */
  public discoverClickIncrement(): number {
    this._discoverClicks++;
    return this._discoverClicks;
  }

  /**
   * Increments flag counter.
   */
  public flagIncrement(): number {
    this._flags++;
    return this._flags;
  }

  /**
   * Decrements flag counter.
   */
  public flagDecrement(): number {
    this._flags--;
    return this._flags;
  }

  /**
   * Resets the result.
   */
  public reset(): void {
    this._discovered = 0;
    this._toDiscover = 0;
    this._mines = 0;
    this._flags = 0;
    this._discoverClicks = 0;
    this._flagClicks = 0;
  }
}
