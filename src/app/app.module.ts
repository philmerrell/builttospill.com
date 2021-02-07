import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { WindowService } from './player/window.service';
import {YouTubePlayerModule} from '@angular/youtube-player';


@NgModule({
  declarations: [AppComponent, PlayerComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PlayerService,
    WindowService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
