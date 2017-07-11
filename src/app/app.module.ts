import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { YoutubePlayerModule } from './youtube-player/ng2-youtube-player';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShowsComponent } from './shows/shows.component';
import { MusicComponent } from './music/music.component';
import { MusicService } from './music/music.service';
import { VideosComponent } from './videos/videos.component';
import { VideoService } from './videos/video.service';
import { ShowsService } from './shows/shows.service';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { WindowService } from './player/window.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoTypePipe } from './videos/video-type.pipe';
import { MusicDetailComponent } from './music/music-detail/music-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowsComponent,
    MusicComponent,
    VideosComponent,
    PlayerComponent,
    VideoTypePipe,
    MusicDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    YoutubePlayerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'shows',
        component: ShowsComponent
      },
      {
        path: 'music',
        component: MusicComponent
      },
      {
        path: 'music/:id',
        component: MusicDetailComponent
      },
      {
        path: 'videos',
        component: VideosComponent
      }
    ])
  ],
  providers: [
    MusicService,
    ShowsService,
    PlayerService,
    VideoService,
    WindowService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
