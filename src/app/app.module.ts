import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './board/field/field.component';
import { GameComponent } from './game/game.component';
import { GlobalService } from './core/services/global.service';
import { LoaderComponent } from './loader/loader.component';
import { ExtraButtonComponent } from './button/extrabutton.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FieldComponent,
    GameComponent,
    LoaderComponent,
    ExtraButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
