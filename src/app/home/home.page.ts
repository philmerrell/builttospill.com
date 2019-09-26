import { Component, OnInit } from '@angular/core';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { VideosService } from '../videos/videos.service';
import { ShowsService } from '../shows/shows.service';
import { Observable } from 'rxjs';
import { MusicService } from '../music/music.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  faMap = faMap;
  faSpotify = faSpotify;
  videos: Observable<any[]>;
  shows: Observable<any[]>;
  album: Observable<any[]>;

  constructor(
    private videosService: VideosService,
    private showsService: ShowsService,
    private musicService: MusicService) {}

  ngOnInit() {
    this.getVideos();
    this.getShows();
    this.getAlbum();
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

}
