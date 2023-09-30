import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AssetsManagerService } from '../core/services/assets-manager.service';

@Component({
  selector: 'extrabutton',
  template: `
    <img (click)="userClick($event)" [src]="currentImagePath" [style.width]="squareSize" [style.height]="squareSize">
    <img *ngIf="onOverEnabled" [src]="imageOnOverPath" [style.width]="squareSize" [style.height]="squareSize" [ngStyle]="{'display': mouseIsOver ? 'block' : 'none'}" style="position: absolute;">
  `,
  styles: [`
    :host {
      display: flex;
    }
  `]
})
export class ExtraButtonComponent implements OnChanges {

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseDown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseUp: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseOut: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseOver: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input() imageName!: string;
  @Input() imageOnDownName!: string;
  @Input() imageOnOverName!: string;
  @Input() squareSize: string = '3rem';
  @Input() toggleMode: boolean = false;

  public currentImagePath: string = '';
  public imagePath: string = '';
  public imageOnDownPath: string = '';
  public imageOnOverPath: string = '';
  public mouseIsOver: boolean = false;
  private _onDownEnabled: boolean = false;
  public onOverEnabled: boolean = false;
  private _toggled: boolean = false;

  constructor(
    public assets: AssetsManagerService
  ) {}

  @HostListener('mousedown', ['$event'])
  _onMouseDown(event: MouseEvent) {
    console.log(`=== m down`);
    if(this._onDownEnabled) {
      this.currentImagePath = this.imageOnDownPath;
    }
    this.onMouseDown.emit(event);
  }

  @HostListener('mouseup', ['$event'])
  _onMouseUp(event: MouseEvent) {
    if(this._onDownEnabled) {
      if(!this.toggleMode) {
        this.currentImagePath = this.imagePath;
      } else {
        if(this._toggled) {
          this.currentImagePath = this.imagePath;
        } else {
          this.currentImagePath = this.imageOnDownPath;
        }
      }
    }
    this.onMouseUp.emit(event);
  }

  @HostListener('mouseout', ['$event'])
  _onMouseOut(event: MouseEvent) {
    if(!this._toggled) {
      this.currentImagePath = this.imagePath;
      this.mouseIsOver = false;
    }
    this.onMouseOut.emit(event);
  }

  @HostListener('mouseover', ['$event'])
  _onMouseOver(event: MouseEvent) {
    if(this.onOverEnabled) {
      // console.log(`=== over`, this.mouseIsOver);
      // this.onMouseOver.emit(event);
      // this.mouseIsOver = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('imageName' in changes) {
      this.imagePath = this.assets.getAssetsByName(this.imageName).path;
      this.currentImagePath = this.imagePath;
    }

    if('imageOnDownName' in changes) {
      this._onDownEnabled = true;
      this.imageOnDownPath = this.assets.getAssetsByName(this.imageOnDownName).path;
    }

    if('imageOnOverName' in changes) {
      this.onOverEnabled = true;
      this.imageOnOverPath = this.assets.getAssetsByName(this.imageOnOverName).path;
    }
  }

  public userClick(event: MouseEvent): void {
    this.onClick.emit();
    if(this.toggleMode) {
      this._toggled = !this._toggled;
    }
  }
}
