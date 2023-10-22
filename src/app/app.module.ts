import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './board/field/field.component';
import { GameComponent } from './game/game.component';
import { GlobalService } from './core/services/global.service';
import { MsButtonComponent } from './shared/ms-button.component';
import { MsModalComponent } from './shared/ms-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FieldComponent,
    GameComponent,
    MsButtonComponent,
    MsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
