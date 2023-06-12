import { Component, OnInit } from '@angular/core';
import { LEVELS, Level } from './core/interfaces/global.interface';
import { Global } from './core/classes/global.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public selectedLevel: Level;

  constructor() {
    // this.selectedLevel = Global.getLevel(LEVELS.LOW);
  }
}
