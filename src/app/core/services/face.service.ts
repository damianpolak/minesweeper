import { Injectable } from '@angular/core';
import { Face } from '../interfaces/game.interface';
import { AssetsManagerService } from './assets-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  public currentFace: Face = 'smile';
  public currentFaceFilename: string = '';
  public currentFacePath: string | undefined;

  constructor(private _assets: AssetsManagerService) {
    this.currentFacePath = this._assets.getAssetsByName('face-smile')?.path;
  }

  public onFaceSmile(): string | undefined {
    this.currentFace = 'smile';
    this.currentFaceFilename = this._assets.getAssetsByName('face-smile').name;
    return this.currentFacePath = this._assets.getAssetsByName('face-smile').path;
  }

  public onFaceOoo(): string | undefined {
    this.currentFace = 'ooo';
    this.currentFaceFilename = this._assets.getAssetsByName('face-ooo').name;
    return this.currentFacePath = this._assets.getAssetsByName('face-ooo').path;
  }

  public onFaceLoser(): string | undefined {
    this.currentFace = 'loser';
    this.currentFaceFilename = this._assets.getAssetsByName('face-loser').name;
    return this.currentFacePath = this._assets.getAssetsByName('face-loser').path;
  }

  public onFaceWinner(): string | undefined {
    this.currentFace = 'winner';
    this.currentFaceFilename = this._assets.getAssetsByName('face-winner').name;
    return this.currentFacePath = this._assets.getAssetsByName('face-winner').path;
  }
}
