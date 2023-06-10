import { Component, Input, OnInit } from '@angular/core';
import { Grid } from '../core/interfaces/board.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() col?: number;
  @Input() row?: number;
  @Input() mines?: number;

  public ready: boolean = false;
  public matrix: string[][] = [];
  public val: string = 'x';
  ngOnInit(): void {
    if(this.row == undefined || this.col == undefined) {
      this.ready = false;
    } else {
      this.ready = true;
      for(let row = 0; row <= this.row - 1; row++) {
        this.matrix.push([]);
        for(let col = 0; col <= this.col - 1; col++) {
          this.matrix[row][col] = `${row}|${col}`
        }
      }
    }


  }
}
