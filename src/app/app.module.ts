import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTabsModule, MatListModule } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YoutubePlayerModule } from './youtube-player/ng2-youtube-player';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowsComponent } from './shows/shows.component';
import { MusicComponent } from './music/music.component';
import { VideosComponent } from './videos/videos.component';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { VideoService } from './videos/video.service';
import { WindowService } from './player/window.service';
import { VideoTypePipe } from './video-type.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowsComponent,
    MusicComponent,
    VideosComponent,
    PlayerComponent,
    VideoTypePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
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
        path: 'videos',
        component: VideosComponent
      }
    ])
  ],
  providers: [
    PlayerService,
    VideoService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
