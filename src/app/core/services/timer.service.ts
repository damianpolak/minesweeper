import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private _count: number = 0;
  private _timer: any;

  get count(): number {
    return this._count;
  }

  constructor() { }

  public start(): void {
    this._timer = setInterval(() => {
      this._count++;
    }, 1000);
  }

  public stop(): void {
    clearInterval(this._timer);
  }

  public clear(): void {
    this._count = 0;
  }
}
