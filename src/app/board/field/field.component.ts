import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { STATES } from 'src/app/core/interfaces/global.interface';
import { AssetsManagerService } from 'src/app/core/services/assets-manager.service';
import { FaceService } from 'src/app/core/services/face.service';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-field',
  template: `
    <div class="field">
      <extrabutton
        [imageName]="currentFileName"
        [squareSize]="squareSize + 'px'"
        (onMouseDown)="mouseDown()"
        (onMouseUp)="mouseUp()"
        (onMouseOut)="mouseOut()"
        >
      </extrabutton>
      <div *ngIf="global.debugMode" class="debug">{{ value }}</div>
    </div>
  `,
  styles: [`
    .field {
      display: flex;
      flex-direction: column;

      > .debug {
        position: absolute;
        font-size: 8px;
        padding: .3rem 0 0 .3rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnChanges {
  @Input() value: string | number = '';
  @Input() squareSize?: number;
  @Input() discovered: boolean = false;
  @Input() marked: boolean = false;

  public currentFileName: string = '';

  constructor(
    public face: FaceService,
    public global: GlobalService,
    public _assets: AssetsManagerService
  ) {}

  public mouseDown(): void {
    this.face.onFaceOoo();
  }

  public mouseUp(): void {
    if(![STATES.LOSE, STATES.WIN, STATES.FINISHED].includes(this.global.gameState)) {
      this.face.onFaceSmile();
    }
  }

  public mouseOut(): void {
    if(![STATES.LOSE, STATES.WIN, STATES.FINISHED].includes(this.global.gameState)) {
      this.face.onFaceSmile();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentFileName = '';
    if('marked' in changes) {
      if(!changes['marked'].firstChange) {
        if(changes['marked'].currentValue) {
          this.currentFileName = this._assets.getAssetsByName('flag')?.name;
        } else {
          this.currentFileName = this._assets.getAssetsByName('closed')?.name;
        }
      }
    }

    if('value' in changes) {
      if(changes['value'].firstChange) {
        if(!changes['discovered'].currentValue) this.currentFileName = this._assets.getAssetsByName('closed')?.name;
      } else {
        if(!this.marked) {
          this.currentFileName = this._assets.getAssetsByName('closed')?.name;
        } else {
          this.currentFileName = this._assets.getAssetsByName('flag')?.name;
        }
      }
    }

    if('discovered' in changes) {
      if(!changes['discovered'].firstChange) {
        switch(this.value) {
          case 0: { this.currentFileName = this._assets.getAssetsByName('empty')?.name; } break;
          case 1: { this.currentFileName = this._assets.getAssetsByName('1')?.name; } break;
          case 2: { this.currentFileName = this._assets.getAssetsByName('2')?.name; } break;
          case 3: { this.currentFileName = this._assets.getAssetsByName('3')?.name; } break;
          case 4: { this.currentFileName = this._assets.getAssetsByName('4')?.name; } break;
          case 5: { this.currentFileName = this._assets.getAssetsByName('5')?.name; } break;
          case 6: { this.currentFileName = this._assets.getAssetsByName('6')?.name; } break;
          case 7: { this.currentFileName = this._assets.getAssetsByName('7')?.name; } break;
          case 8: { this.currentFileName = this._assets.getAssetsByName('8')?.name; } break;
          case '*': { this.currentFileName = this._assets.getAssetsByName('mine')?.name; } break;
          case '@': { this.currentFileName = this._assets.getAssetsByName('minedestroyed')?.name; } break;
        }
      }
    }
  }
}
