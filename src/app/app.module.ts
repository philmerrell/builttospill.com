import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule,
  MatButtonModule, MatToolbarModule,
  MatIconModule, MatTabsModule, MatListModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YoutubePlayerModule } from './player/youtube-player/ng2-youtube-player';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowsComponent } from './shows/shows.component';
import { MusicComponent } from './music/music.component';
import { VideosComponent } from './videos/videos.component';
import { ShowsService } from './shows/shows.service';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { VideoService } from './videos/video.service';
import { WindowService } from './player/window.service';
import { VideoTypePipe } from './video-type.pipe';
import { MusicDetailComponent } from './music/music-detail/music-detail.component';
import { MusicService } from './music/music.service';
import { HttpModule } from '@angular/http';


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
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
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
    PlayerService,
    ShowsService,
    VideoService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
