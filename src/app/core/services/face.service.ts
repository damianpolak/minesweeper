import { Injectable } from '@angular/core';
import { Face } from '../interfaces/game.interface';
import { AssetsManagerService } from './assets-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  public currentFace: Face = 'smile';
  // public basePath: string = 'assets/gfx/';
  public currentFacePath: string | undefined;

  constructor(private _assets: AssetsManagerService) {
    this.currentFacePath = this._assets.getAssetsByName('face-smile')?.path;
  }

  public onFaceSmile(): string | undefined {
    this.currentFace = 'smile';
    return this.currentFacePath = this._assets.getAssetsByName('face-smile')?.path;
  }

  public onFaceOoo(): string | undefined {
    this.currentFace = 'ooo';
    return this.currentFacePath = this._assets.getAssetsByName('face-ooo')?.path;
  }

  public onFaceLoser(): string | undefined {
    this.currentFace = 'loser';
    return this.currentFacePath = this._assets.getAssetsByName('face-loser')?.path;
  }

  public onFaceWinner(): string | undefined {
    this.currentFace = 'winner';
    return this.currentFacePath = this._assets.getAssetsByName('face-winner')?.path;
  }
}
