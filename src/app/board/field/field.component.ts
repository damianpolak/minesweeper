import { Component, Input } from '@angular/core';
import { FieldSize } from 'src/app/core/interfaces/field.interface';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Input() values: string = '';
  @Input() squareSize?: number;
}
