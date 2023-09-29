import { Injectable } from '@angular/core';
import { Assets } from '../interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class AssetsManagerService {

  private _assetsDir: string = 'assets/';
  private readonly _assets: Assets[];

  constructor() {
    this._assets = [
      { name: '1', path: 'gfx/1.png' },
      { name: '2', path: 'gfx/2.png' },
      { name: '3', path: 'gfx/3.png' },
      { name: '4', path: 'gfx/4.png' },
      { name: '5', path: 'gfx/5.png' },
      { name: '6', path: 'gfx/6.png' },
      { name: '7', path: 'gfx/7.png' },
      { name: '8', path: 'gfx/8.png' },
      { name: 'closed', path: 'gfx/closed.png' },
      { name: 'empty', path: 'gfx/empty.png' },
      { name: 'mine', path: 'gfx/mine.png' },
      { name: 'minedestroyed', path: 'gfx/minedestroyed.png' },
      { name: 'face-loser', path: 'gfx/face-loser.png' },
      { name: 'face-ooo', path: 'gfx/face-ooo.png' },
      { name: 'face-smile', path: 'gfx/face-smile.png' },
      { name: 'face-smile-down', path: 'gfx/face-smile-down.png' },
      { name: 'face-winner', path: 'gfx/face-winner.png' },
      { name: 'flag', path: 'gfx/flag.png' },
      { name: 'selected', path: 'gfx/selected.png' },
      { name: 'flag-lg', path: 'gfx/flag-lg.png' },
      { name: 'flag-lg-down', path: 'gfx/flag-lg-down.png' },
      { name: 'tablescore', path: 'gfx/tablescore.png' },
      { name: 'score', path: 'gfx/score.png' },
      { name: 'score-down', path: 'gfx/score-down.png' },
      { name: 'noimage', path: 'gfx/noimage.png' },
    ].map(item => {
      item.path = this._assetsDir + item.path;
      return item;
    });
  }

  get assets(): Assets[] {
    return this._assets;
  }

  public getAssetsByName(name: string): Assets {
    const asset = this.assets.find(item => item.name === name);
    return { name: asset ? asset.name : 'noimage', path: (asset ? asset.path : this._assetsDir + 'gfx/noimage.png') } as Assets;
  }
}
