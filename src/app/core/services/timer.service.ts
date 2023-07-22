import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private _count: number = 0;
  private _timer: any;

  constructor() { }

  /**
   * Gets timer count.
   */
  get count(): number {
    return this._count;
  }

  /**
   * Starts the timer based on setInterval.
   * For this game example it's enough solution.
   */
  public start(): void {
    this._timer = setInterval(() => {
      this._count++;
    }, 1000);
  }

  /**
   * Stops the timer.
   */
  public stop(): void {
    clearInterval(this._timer);
  }

  /**
   * Clears timer.
   */
  public clear(): void {
    this._count = 0;
  }

  /**
   * Resets and stops the timer.
   */
  public restart(): void {
    this.stop();
    this.clear();
  }
}
