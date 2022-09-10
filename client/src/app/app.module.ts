import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './player/player.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [AppComponent, PlayerComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PlayerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
