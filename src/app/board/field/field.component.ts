import { Component, Input, OnInit } from '@angular/core';
import { FieldSize } from 'src/app/core/interfaces/field.interface';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  // Input - status hidden/visible
  @Input() value: string | number = '';
  @Input() squareSize?: number;
  @Input() discovered: boolean = false;
  @Input() marked: boolean = false;

  ngOnInit(): void {

  }
}
