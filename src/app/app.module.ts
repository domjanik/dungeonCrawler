import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameAreaComponent } from './game-area/game-area.component';
import { MapComponent } from './game-area/components/map/map.component';
import { MenuComponent } from './game-area/components/menu/menu.component';
import { KeylistenerDirective } from './game-area/components/map/keylistener.directive';

@NgModule({
  declarations: [
    AppComponent,
    GameAreaComponent,
    MapComponent,
    MenuComponent,
    KeylistenerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
