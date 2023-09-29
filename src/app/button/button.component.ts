import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AssetsManagerService } from '../core/services/assets-manager.service';

@Component({
  selector: 'extrabutton',
  template: `
    <img (click)="userClick($event)" [src]="currentImagePath" [style.width]="squareSize" [style.height]="squareSize">
  `,
})
export class ButtonComponent implements OnChanges {

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseDown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseUp: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseOut: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input() imageName!: string;
  @Input() imageHoverName!: string;
  @Input() squareSize: string = '3rem';
  @Input() toggleMode: boolean = false;

  public currentImagePath: string = '';
  public imagePath: string = '';
  public imageHoverPath: string = '';
  private _hoverEnabled: boolean = false;
  private _toggled: boolean = false;

  constructor(
    public assets: AssetsManagerService
  ) {}

  @HostListener('mousedown', ['$event'])
  _onMouseDown(event: MouseEvent) {
    if(this._hoverEnabled) {
      this.currentImagePath = this.imageHoverPath;
      this.onMouseDown.emit(event);
    }
  }

  @HostListener('mouseup', ['$event'])
  _onMouseUp(event: MouseEvent) {
    if(this._hoverEnabled) {
      if(!this.toggleMode) {
        this.currentImagePath = this.imagePath;
        this.onMouseUp.emit(event);
      } else {
        if(this._toggled) {
          this.currentImagePath = this.imagePath;
        } else {
          this.currentImagePath = this.imageHoverPath;
        }
      }
    }
  }

  @HostListener('mouseout', ['$event'])
  _onMouseOut(event: MouseEvent) {
    if(!this._toggled) {
      this.currentImagePath = this.imagePath;
      this.onMouseOut.emit(event);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('imageName' in changes) {
      this.imagePath = this.assets.getAssetsByName(this.imageName).path;
      this.currentImagePath = this.imagePath;
    }

    if('imageHoverName' in changes) {
      this._hoverEnabled = true;
      this.imageHoverPath = this.assets.getAssetsByName(this.imageHoverName).path;
    }
  }

  public userClick(event: MouseEvent): void {
    this.onClick.emit();
    if(this.toggleMode) {
      this._toggled = !this._toggled;
    }
  }
}
