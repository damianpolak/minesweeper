import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { AssetsManagerService } from '../core/services/assets-manager.service';
import { Assets } from '../core/interfaces/global.interface';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements AfterViewInit {

  @Output() onLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  public assets!: Assets[];
  public progress: number = 0;
  public currentImagePath: string = '';

  constructor(private _assets: AssetsManagerService) {
    this.assets = this._assets.assets;
  }

  ngAfterViewInit(): void {
    let index = 0;
    const step = (100 / this.assets.length);

    let intervalHook = setInterval(() => {
      if(index !== (this.assets.length)) {
        this.progress = this.progress + step;
        this.currentImagePath = this.assets[index].path;
        index++;
      } else {
        clearInterval(intervalHook);
        this.onLoaded.emit(true);
      }
    }, 20);
  }
}
