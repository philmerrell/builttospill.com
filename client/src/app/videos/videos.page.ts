import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { VideoService } from './video.service';

@Component({
  selector: 'app-videos-page',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  videos$: Observable<any[]>;

  constructor(
    private videoService: VideoService,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.getMusicVideos();
  }

  getMusicVideos() {
    this.videos$ = this.videoService.getMusicVideos();
  }

  playVideo(event, video, videos, expanded) {
    event.preventDefault();
    this.playerService.playThis(video, videos, expanded);
  }
}
