import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { STATES } from 'src/app/core/interfaces/global.interface';
import { AssetsManagerService } from 'src/app/core/services/assets-manager.service';
import { FaceService } from 'src/app/core/services/face.service';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnInit, OnChanges {
  @Input() value: string | number = '';
  @Input() squareSize?: number;
  @Input() discovered: boolean = false;
  @Input() marked: boolean = false;
  @Input() hint: boolean = false;

  public hover: boolean = false;
  public debug: boolean = false;
  public imageFile: string | undefined = '';
  public selectedImageFile: string | undefined;

  constructor(
    public face: FaceService,
    public global: GlobalService,
    public _assets: AssetsManagerService
  ) {
    this.selectedImageFile = this._assets.getAssetsByName('selected')?.path;
    this.debug = this.global.debugMode;
  }

  @HostListener('mouseover')
  onMouseOver() {
    if(!this.discovered) this.hover = true;
  }

  @HostListener('mouseout')
  onMouseOut() {
    if(![STATES.LOSE, STATES.WIN, STATES.FINISHED].includes(this.global.gameState)) {
      this.hover = false;
      this.face.onFaceSmile();
    }
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.face.onFaceOoo();
  }

  @HostListener('mouseup')
  onMouseUp() {
    if(![STATES.LOSE, STATES.WIN, STATES.FINISHED].includes(this.global.gameState)) {
      this.face.onFaceSmile();
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.imageFile = '';
    if('marked' in changes) {
      if(!changes['marked'].firstChange) {
        if(changes['marked'].currentValue) {
          this.imageFile = this._assets.getAssetsByName('flag')?.path;
        } else {
          this.imageFile = this._assets.getAssetsByName('closed')?.path;
        }
      }
    }

    if('value' in changes) {
      if(changes['value'].firstChange) {
          if(!changes['discovered'].currentValue) {
            this.imageFile = this._assets.getAssetsByName('closed')?.path;
        }
      } else {
        if(!this.marked) {
          this.imageFile = this._assets.getAssetsByName('closed')?.path;
        } else {
          this.imageFile = this._assets.getAssetsByName('flag')?.path;
        }
      }
    }

    if('discovered' in changes) {
      if(!changes['discovered'].firstChange) {
        switch(this.value) {
          case 0: { this.imageFile = this._assets.getAssetsByName('empty')?.path; } break;
          case 1: { this.imageFile = this._assets.getAssetsByName('1')?.path; } break;
          case 2: { this.imageFile = this._assets.getAssetsByName('2')?.path; } break;
          case 3: { this.imageFile = this._assets.getAssetsByName('3')?.path; } break;
          case 4: { this.imageFile = this._assets.getAssetsByName('4')?.path; } break;
          case 5: { this.imageFile = this._assets.getAssetsByName('5')?.path; } break;
          case 6: { this.imageFile = this._assets.getAssetsByName('6')?.path; } break;
          case 7: { this.imageFile = this._assets.getAssetsByName('7')?.path; } break;
          case 8: { this.imageFile = this._assets.getAssetsByName('8')?.path; } break;
          case '*': { this.imageFile = this._assets.getAssetsByName('mine')?.path; } break;
          case '@': { this.imageFile = this._assets.getAssetsByName('minedestroyed')?.path; } break;
        }
      }
    }
  }
}
