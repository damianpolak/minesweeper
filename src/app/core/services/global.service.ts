import { Injectable } from '@angular/core';
import { LEVELS, STATES, StorageConfig } from '../interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _storageKey = 'minesweeper-config';

  public config!: StorageConfig;
  public gameState: STATES = STATES.NOT_STARTED;
  public orientation: OrientationType = 'landscape-primary';
  public flagMode: boolean = false;

  constructor() { }

  public initConfig(): void {
    const config = localStorage.getItem(this._storageKey);

    if(config) {
      this.config = JSON.parse(config);
    } else {
      this.config = {
        level: LEVELS.LOW,
        debugMode: false
      }
      localStorage.setItem(this._storageKey, JSON.stringify(this.config));
    }
  }

  get debugMode() {
    return this.config?.debugMode == 'YES PLEASE!' ? true : false;
  }

  get level(): LEVELS {
    return this.config !== null ? this.config.level : LEVELS.LOW
  }

  set level(value: LEVELS) {
    this.config.level = value;
    this._updateStorageConfig();
  }

  private _updateStorageConfig() {
    localStorage.setItem(this._storageKey, JSON.stringify(this.config));
  }

}
