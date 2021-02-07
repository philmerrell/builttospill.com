import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicService } from '../music/music.service';
import { PlayerService } from '../player/player.service';
import { ShowsService } from '../shows/shows.service';
import { VideosService } from '../videos/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  videos: Observable<any[]>;
  shows: Observable<any[]>;
  album: Observable<any[]>;

  constructor(
    private videosService: VideosService,
    private showsService: ShowsService,
    private musicService: MusicService,
    private playerService: PlayerService) {}

  ngOnInit() {
    this.getAlbum();
    this.getShows();
    this.getVideos();
  }

  getVideos() {
    this.videos = this.videosService.getHomeVideos();
  }

  getShows() {
    this.shows = this.showsService.getShows();
  }

  getAlbum() {
    this.album = this.musicService.albums[0];
  }

  playVideo(event, video, videos) {
    event.preventDefault();
    this.playerService.playThis(video, videos);
  }

}
