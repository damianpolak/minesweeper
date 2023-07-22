import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FieldSize } from 'src/app/core/interfaces/field.interface';

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

  public imagePath: string = '/assets/gfx/';
  public imageFile: string = '';

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.imageFile = '';
    if('marked' in changes) {
      if(!changes['marked'].firstChange) {
        if(changes['marked'].currentValue) {
          this.imageFile = this.imagePath + 'flag.png';
        } else {
          this.imageFile = this.imagePath + 'block.png';
        }
      }
    }

    if('value' in changes) {
      if(changes['value'].firstChange) {
          if(!changes['discovered'].currentValue) {
            this.imageFile = this.imagePath + 'block.png';
        }
      } else {
        if(!this.marked) {
          this.imageFile = this.imagePath + 'block.png';
        } else {
          this.imageFile = this.imagePath + 'flag.png';
        }
      }
    }

    if('discovered' in changes) {
      if(!changes['discovered'].firstChange) {
        switch(this.value) {
          case 0: { this.imageFile = this.imagePath + 'background.png'; } break;
          case 1: { this.imageFile = this.imagePath + '1.png'; } break;
          case 2: { this.imageFile = this.imagePath + '2.png'; } break;
          case 3: { this.imageFile = this.imagePath + '3.png'; } break;
          case 4: { this.imageFile = this.imagePath + '4.png'; } break;
          case 5: { this.imageFile = this.imagePath + '5.png'; } break;
          case 6: { this.imageFile = this.imagePath + '6.png'; } break;
          case 7: { this.imageFile = this.imagePath + '7.png'; } break;
          case 8: { this.imageFile = this.imagePath + '8.png'; } break;
          case '*': { this.imageFile = this.imagePath + 'bomb.png'; } break;
          case '@': { this.imageFile = this.imagePath + 'bombred.png'; } break;
        }
      }
    }
  }
}
