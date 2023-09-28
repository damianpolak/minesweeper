import { Injectable } from '@angular/core';
import { Face } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  public currentFace: Face = 'smile';
  public basePath: string = 'assets/gfx/';
  public currentFacePath: string = this.basePath + 'face-smile.png';

  constructor() { }

  public onFaceSmile(): string {
    this.currentFace = 'smile';
    return this.currentFacePath = this.basePath + 'face-smile.png';
  }

  public onFaceOoo(): string {
    this.currentFace = 'ooo';
    return this.currentFacePath = this.basePath + 'face-ooo.png';
  }

  public onFaceLoser(): string {
    this.currentFace = 'loser';
    return this.currentFacePath = this.basePath + 'face-loser.png';
  }

  public onFaceWinner(): string {
    this.currentFace = 'winner';
    return this.currentFacePath = this.basePath + 'face-winner.png';
  }
}
